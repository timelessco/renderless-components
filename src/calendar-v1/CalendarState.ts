/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useCalendarState](https://github.com/adobe/react-spectrum/tree/main/packages/%40react-stately/calendar)
 * to work with Reakit System
 */
import { useState } from "react";
import { unstable_useId as useId } from "reakit";
import { useControllableState } from "@chakra-ui/hooks";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfDay,
  endOfMonth,
  getDaysInMonth,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";

import { useWeekStart } from "./useWeekStart";

export type DateValue = string | number | Date;
export interface IUseCalendarProps {
  minValue?: DateValue;
  maxValue?: DateValue;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  autoFocus?: boolean;
  /** The current value (controlled). */
  value?: DateValue;
  /** The default value (uncontrolled). */
  defaultValue?: DateValue;
  /** Handler that is called when the value changes. */
  onChange?: (value: DateValue) => void;
}

export function useCalendarState(props: IUseCalendarProps = {}) {
  const { id: calendarId } = useId({ baseId: "calendar" });
  const {
    minValue: initialMinValue,
    maxValue: initialMaxValue,
    isDisabled = false,
    isReadOnly = false,
    autoFocus = false,
    value: initialValue,
    defaultValue,
    onChange,
  } = props;

  const [value, setControllableValue] = useControllableState({
    value: initialValue,
    defaultValue,
    onChange,
    shouldUpdate: (prev, next) => prev !== next,
  });

  const dateValue = value ? new Date(value) : null;
  const minValue = initialMinValue ? new Date(initialMinValue) : null;
  const maxValue = initialMaxValue ? new Date(initialMaxValue) : null;
  const minDate = minValue ? startOfDay(minValue) : null;
  const maxDate = maxValue ? endOfDay(maxValue) : null;

  const [isFocused, setFocused] = useState(autoFocus);

  const initialMonth = dateValue ?? new Date();
  const [currentMonth, setCurrentMonth] = useState(initialMonth); // TODO: does this need to be in state at all??
  const [focusedDate, setFocusedDate] = useState(initialMonth);

  const weekStart = useWeekStart();
  let monthStartsAt = (startOfMonth(currentMonth).getDay() - weekStart) % 7;
  if (monthStartsAt < 0) {
    monthStartsAt += 7;
  }

  const days = getDaysInMonth(currentMonth);
  const weeksInMonth = Math.ceil((monthStartsAt + days) / 7);
  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();

  // Sets focus to a specific cell date
  function focusCell(date: Date) {
    if (isInvalid(date, minDate, maxDate)) {
      return;
    }

    if (!isSameMonth(date, currentMonth)) {
      setCurrentMonth(startOfMonth(date));
    }

    setFocusedDate(date);
  }

  function setValue(value: Date) {
    if (!isDisabled && !isReadOnly) {
      setControllableValue(value);
    }
  }

  return {
    calendarId,
    dateValue,
    setDateValue: setValue,
    currentMonth,
    setCurrentMonth,
    focusedDate,
    setFocusedDate,
    focusNextDay() {
      focusCell(addDays(focusedDate, 1));
    },
    focusPreviousDay() {
      focusCell(subDays(focusedDate, 1));
    },
    focusNextWeek() {
      focusCell(addWeeks(focusedDate, 1));
    },
    focusPreviousWeek() {
      focusCell(subWeeks(focusedDate, 1));
    },
    focusNextMonth() {
      focusCell(addMonths(focusedDate, 1));
    },
    focusPreviousMonth() {
      focusCell(subMonths(focusedDate, 1));
    },
    focusStartOfMonth() {
      focusCell(startOfMonth(focusedDate));
    },
    focusEndOfMonth() {
      focusCell(endOfMonth(startOfDay(focusedDate)));
    },
    focusNextYear() {
      focusCell(addYears(focusedDate, 1));
    },
    focusPreviousYear() {
      focusCell(subYears(focusedDate, 1));
    },
    selectFocusedDate() {
      setValue(focusedDate);
    },
    selectDate(date: Date) {
      setValue(date);
    },
    isDisabled,
    isFocused,
    isReadOnly,
    setFocused,
    weeksInMonth,
    weekStart,
    getCellOptions(weekIndex: number, dayIndex: number) {
      const day = weekIndex * 7 + dayIndex - monthStartsAt + 1;
      const cellDate = new Date(year, month, day);
      const isCurrentMonth = cellDate.getMonth() === month;

      return {
        cellDate,
        isToday: isSameDay(cellDate, new Date()),
        isCurrentMonth,
        isDisabled:
          isDisabled ||
          !isCurrentMonth ||
          isInvalid(cellDate, minDate, maxDate),
        isSelected: dateValue ? isSameDay(cellDate, dateValue) : false,
        isFocused: isFocused && focusedDate && isSameDay(cellDate, focusedDate),
      };
    },
  };
}

function isInvalid(date: Date, minDate: Date | null, maxDate: Date | null) {
  return (
    (minDate != null && date < minDate) || (maxDate != null && date > maxDate)
  );
}

export type CalendarStateReturn = ReturnType<typeof useCalendarState>;