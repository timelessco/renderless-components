/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useDatePickerFieldState](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/datepicker/src/useDatePickerFieldState.ts)
 * to work with Reakit System
 */

import { useMemo, useState } from "react";
import { useDateFormatter } from "@react-aria/i18n";
import { useControllableState } from "@chakra-ui/hooks";

import { DatePickerStateInitialProps } from "./index.d";
import { add, setSegment, convertValue, getSegmentLimits } from "./__utils";

export interface IDateSegment {
  type: Intl.DateTimeFormatPartTypes;
  text: string;
  value?: number;
  minValue?: number;
  maxValue?: number;
  isPlaceholder: boolean;
}

const EDITABLE_SEGMENTS = {
  year: true,
  month: true,
  day: true,
  hour: true,
  minute: true,
  second: true,
  dayPeriod: true,
};

const PAGE_STEP = {
  year: 5,
  month: 2,
  day: 7,
  hour: 2,
  minute: 15,
  second: 15,
};

// Node seems to convert everything to lowercase...
const TYPE_MAPPING = {
  dayperiod: "dayPeriod",
};

export function useDatePickerFieldState(props: DatePickerStateInitialProps) {
  const [validSegments, setValidSegments] = useState(
    props.value || props.defaultValue ? { ...EDITABLE_SEGMENTS } : {},
  );

  const dateFormatter = useDateFormatter(props.formatOptions);
  const resolvedOptions = useMemo(() => dateFormatter.resolvedOptions(), [
    dateFormatter,
  ]);

  // Determine how many editable segments there are for validation purposes.
  // The result is cached for performance.
  const numSegments = useMemo(
    () =>
      dateFormatter
        .formatToParts(new Date())
        .filter(seg => EDITABLE_SEGMENTS[seg.type]).length,
    [dateFormatter],
  );

  // If there is a value prop, and some segments were previously placeholders, mark them all as valid.
  if (props.value && Object.keys(validSegments).length < numSegments) {
    setValidSegments({ ...EDITABLE_SEGMENTS });
  }

  // We keep track of the placeholder date separately in state so that onChange is not called
  // until all segments are set. If the value === null (not undefined), then assume the component
  // is controlled, so use the placeholder as the value until all segments are entered so it doesn't
  // change from uncontrolled to controlled and emit a warning.
  const [placeholderDate, setPlaceholderDate] = useState(
    convertValue(props.placeholderDate) ||
      new Date(new Date().getFullYear(), 0, 1),
  );
  const [date, setDate] = useControllableState<Date>({
    value:
      props.value == null
        ? convertValue(placeholderDate)
        : convertValue(props.value),
    defaultValue: convertValue(props.defaultValue),
    onChange: props.onChange,
    shouldUpdate: (prev, next) => prev !== next,
  });

  // If all segments are valid, use the date from state, otherwise use the placeholder date.
  const value =
    Object.keys(validSegments).length >= numSegments ? date : placeholderDate;
  const setValue = (value: Date) => {
    if (Object.keys(validSegments).length >= numSegments) {
      setDate(value);
    } else {
      setPlaceholderDate(value);
    }
  };

  const segments = dateFormatter.formatToParts(value).map(
    segment =>
      ({
        type: TYPE_MAPPING[segment.type] || segment.type,
        text: segment.value,
        ...getSegmentLimits(value, segment.type, resolvedOptions),
        isPlaceholder: !validSegments[segment.type],
      } as IDateSegment),
  );

  const adjustSegment = (
    type: Intl.DateTimeFormatPartTypes,
    amount: number,
  ) => {
    validSegments[type] = true;
    setValidSegments({ ...validSegments });
    setValue(add(value, type, amount, resolvedOptions));
  };

  return {
    fieldValue: value,
    setFieldValue: setValue,
    segments,
    dateFormatter,
    increment(part: Intl.DateTimeFormatPartTypes) {
      adjustSegment(part, 1);
    },
    decrement(part: Intl.DateTimeFormatPartTypes) {
      adjustSegment(part, -1);
    },
    incrementPage(part: Intl.DateTimeFormatPartTypes) {
      adjustSegment(part, PAGE_STEP[part] || 1);
    },
    decrementPage(part: Intl.DateTimeFormatPartTypes) {
      adjustSegment(part, -(PAGE_STEP[part] || 1));
    },
    setSegment(part: Intl.DateTimeFormatPartTypes, v: number) {
      validSegments[part] = true;
      setValidSegments({ ...validSegments });
      // @ts-ignore
      setValue(setSegment(value, part, v, resolvedOptions));
    },
    confirmPlaceholder(part: Intl.DateTimeFormatPartTypes) {
      validSegments[part] = true;
      setValidSegments({ ...validSegments });
      setValue(new Date(value));
    },
  };
}

export type DatePickerFieldStateReturn = ReturnType<
  typeof useDatePickerFieldState
>;
