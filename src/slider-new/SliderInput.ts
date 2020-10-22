import { createComponent, createHook } from "reakit-system";
import { InputHTMLProps, InputOptions, useInput } from "reakit";

import { SLIDER_INPUT_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";

export type SliderInputOptions = InputOptions &
  SliderStateReturn & {
    index: number;
  };

export type SliderInputHTMLProps = InputHTMLProps;

export type SliderInputProps = SliderInputOptions & SliderInputHTMLProps;

export const useSliderInput = createHook<
  SliderInputOptions,
  SliderInputHTMLProps
>({
  name: "SliderInput",
  compose: useInput,
  keys: SLIDER_INPUT_KEYS,

  useProps(options, htmlProps) {
    const { index } = options;
    const value = options.values[index];

    return {
      ...htmlProps,
      type: "range",
      tabIndex: !options.isDisabled ? 0 : undefined,
      min: options.getThumbMinValue(index),
      max: options.getThumbMaxValue(index),
      step: options.step,
      value: options.getThumbValueLabel(index),
      disabled: options.isDisabled,
      "aria-orientation": options.orientation,
      "aria-valuetext": `${value}`,
      onFocus: () => options.setFocusedThumb(index),
      onBlur: () => options.setFocusedThumb(undefined),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        options.setThumbValue(index, parseFloat(e.target.value));
      },
    };
  },
});

export const SliderInput = createComponent({
  as: "input",
  memo: true,
  useHook: useSliderInput,
});