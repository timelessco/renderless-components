import { useState } from "react";
import { DOMProps } from "@react-types/shared";
import { mergeProps } from "@react-aria/utils";
import { callAllHandlers } from "@chakra-ui/utils";
import { useDateFormatter } from "@react-aria/i18n";
import { createComponent, createHook } from "reakit-system";
import {
  BoxHTMLProps,
  useCompositeItem,
  CompositeItemOptions,
  CompositeItemHTMLProps,
  unstable_useId as useId,
} from "reakit";

import { DATE_SEGMENT_KEYS } from "./__keys";
import { isNumeric, parseNumber } from "./__utils";
import { useSpinButton } from "../utils/useSpinButton";
import { DatePickerStateReturn } from "./DatePickerState";
import {
  DatePickerFieldStateReturn,
  IDateSegment,
} from "./DatePickerFieldState";

export type DateSegmentOptions = CompositeItemOptions &
  Pick<
    DatePickerFieldStateReturn,
    | "fieldValue"
    | "increment"
    | "incrementPage"
    | "setSegment"
    | "decrement"
    | "decrementPage"
    | "confirmPlaceholder"
  > &
  Pick<
    DatePickerStateReturn,
    | "pickerId"
    | "next"
    | "dateFormatter"
    | "isDisabled"
    | "isRequired"
    | "isReadOnly"
  > & {
    segment: IDateSegment;
  };

export type DateSegmentHTMLProps = CompositeItemHTMLProps &
  BoxHTMLProps &
  DOMProps;

export type DateSegmentProps = DateSegmentOptions & DateSegmentHTMLProps;

export const useDateSegment = createHook<
  DateSegmentOptions,
  DateSegmentHTMLProps
>({
  name: "DateSegment",
  compose: [useCompositeItem],
  keys: DATE_SEGMENT_KEYS,

  useOptions(options, htmlProps) {
    return {
      disabled: options.segment.type === "literal",
      ...options,
    };
  },

  useProps(
    { segment, next, ...options },
    {
      onKeyDown: htmlOnKeyDown,
      onFocus: htmlOnFocus,
      onMouseDown: htmlOnMouseDown,
      ...htmlProps
    },
  ) {
    const [enteredKeys, setEnteredKeys] = useState("");

    let textValue = segment.text;
    const monthDateFormatter = useDateFormatter({ month: "long" });
    const hourDateFormatter = useDateFormatter({
      hour: "numeric",
      hour12: options.dateFormatter.resolvedOptions().hour12,
    });

    if (segment.type === "month") {
      textValue = monthDateFormatter.format(options.fieldValue);
    } else if (segment.type === "hour" || segment.type === "dayPeriod") {
      textValue = hourDateFormatter.format(options.fieldValue);
    }

    const { spinButtonProps } = useSpinButton({
      value: segment.value,
      textValue,
      minValue: segment.minValue,
      maxValue: segment.maxValue,
      isDisabled: options.isDisabled,
      isReadOnly: options.isReadOnly,
      isRequired: options.isRequired,
      onIncrement: () => options.increment(segment.type),
      onDecrement: () => options.decrement(segment.type),
      onIncrementPage: () => options.incrementPage(segment.type),
      onDecrementPage: () => options.decrementPage(segment.type),
      onIncrementToMax: () =>
        options.setSegment(segment.type, segment.maxValue as number),
      onDecrementToMin: () =>
        options.setSegment(segment.type, segment.minValue as number),
    });

    const onInput = (key: string) => {
      const newValue = enteredKeys + key;

      switch (segment.type) {
        case "dayPeriod":
          if (key === "a") {
            options.setSegment("dayPeriod", 0);
          } else if (key === "p") {
            options.setSegment("dayPeriod", 12);
          }
          next();
          break;
        case "day":
        case "hour":
        case "minute":
        case "second":
        case "month":
        case "year": {
          if (!isNumeric(newValue)) {
            return;
          }

          const numberValue = parseNumber(newValue);
          let segmentValue = numberValue;
          if (
            segment.type === "hour" &&
            options.dateFormatter.resolvedOptions().hour12 &&
            numberValue === 12
          ) {
            segmentValue = 0;
          } else if (numberValue > (segment.maxValue as number)) {
            segmentValue = parseNumber(key);
          }

          options.setSegment(segment.type, segmentValue);

          if (Number(numberValue + "0") > (segment.maxValue as number)) {
            setEnteredKeys("");
            next();
          } else {
            setEnteredKeys(newValue);
          }
          break;
        }
      }
    };

    const onKeyDown = (e: any) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
        return;
      }

      switch (e.key) {
        case "Enter":
          e.preventDefault();
          if (segment.isPlaceholder && !options.isReadOnly) {
            options.confirmPlaceholder(segment.type);
          }
          next();
          break;
        case "Tab":
          break;
        case "Backspace": {
          e.preventDefault();
          if (isNumeric(segment.text) && !options.isReadOnly) {
            const newValue = segment.text.slice(0, -1);
            options.setSegment(
              segment.type,
              newValue.length === 0
                ? (segment.minValue as number)
                : parseNumber(newValue),
            );
            setEnteredKeys(newValue);
          }
          break;
        }
        default:
          e.preventDefault();
          e.stopPropagation();
          if (
            (isNumeric(e.key) || /^[ap]$/.test(e.key)) &&
            !options.isReadOnly
          ) {
            onInput(e.key);
          }
      }
    };

    const onFocus = () => {
      setEnteredKeys("");
    };

    const onMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    const { id } = useId({ baseId: "spin-button" });

    switch (segment.type) {
      // A separator, e.g. punctuation
      case "literal":
        return {
          role: "presentation",
          "data-placeholder": false,
          children: segment.text,
          ...htmlProps,
        };

      // These segments cannot be directly edited by the user.
      case "weekday":
      case "timeZoneName":
      case "era":
        return {
          role: "presentation",
          "data-placeholder": true,
          children: segment.text,
          ...htmlProps,
        };

      // Editable segment
      default:
        return mergeProps(spinButtonProps, {
          id,
          "aria-label": segment.type,
          "aria-labelledby": `${options.pickerId} ${id}`,
          onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
          onFocus: callAllHandlers(htmlOnFocus, onFocus),
          onMouseDown: callAllHandlers(htmlOnMouseDown, onMouseDown),
          children: segment.text,
          ...htmlProps,
        });
    }
  },

  useComposeProps(options, htmlProps) {
    const composite = useCompositeItem(options, htmlProps);

    /*
      Haz:
      Ensure tabIndex={0}
      Tab is not the only thing that can move focus in web pages
      For example, on iOS you can move between form elements using
      the arrows above the keyboard
    */
    return {
      ...composite,
      tabIndex: options.disabled ? -1 : 0,
    };
  },
});

export const DateSegment = createComponent({
  as: "div",
  memo: true,
  useHook: useDateSegment,
});