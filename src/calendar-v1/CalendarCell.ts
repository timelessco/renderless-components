import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { CALENDAR_CELL_KEYS } from "./__keys";
import { CalendarState } from "./CalendarState";
import { ariaAttr } from "@chakra-ui/utils";

export type CalendarCellOptions = BoxOptions &
  CalendarState & {
    weekIndex: number;
    dayIndex: number;
  };

export type CalendarCellHTMLProps = BoxHTMLProps;

export type CalendarCellProps = CalendarCellOptions & CalendarCellHTMLProps;

export const useCalendarCell = createHook<
  CalendarCellOptions,
  CalendarCellHTMLProps
>({
  name: "CalendarCell",
  compose: useBox,
  keys: CALENDAR_CELL_KEYS,

  useProps({ weekIndex, dayIndex, getCellOptions }, htmlProps) {
    const { isSelected } = getCellOptions(weekIndex, dayIndex);

    return {
      role: "gridcell",
      "aria-selected": ariaAttr(isSelected),
      ...htmlProps,
    };
  },
});

export const CalendarCell = createComponent({
  as: "div",
  memo: true,
  useHook: useCalendarCell,
});
