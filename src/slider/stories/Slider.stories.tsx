import React from "react";
import { Button } from "reakit";
import { Meta } from "@storybook/react";
import { useForm, Controller } from "react-hook-form";

import {
  Slider,
  SliderTrack,
  SliderThumb,
  useSliderState,
  SliderFilledTrack,
} from "../index";
import {
  sliderHorizontalFilledTractStyle,
  sliderHorizontalStyle,
  sliderHorizontalThumbStyle,
  sliderHorizontalTrackStyle,
  sliderVerticalFilledTractStyle,
  sliderVerticalStyle,
  sliderVerticalThumbStyle,
  sliderVerticalTrackStyle,
} from "./styles";
import { StyledSlider } from "./SliderComponent";

export default {
  title: "Slider",
} as Meta;

export const New = () => <StyledSlider />;

const SliderComp: React.FC<any> = props => {
  const slider = useSliderState(props);

  return (
    <>
      <label htmlFor="slider">{slider.state.value}</label>

      <Slider {...slider} style={sliderHorizontalStyle}>
        <SliderTrack {...slider} style={sliderHorizontalTrackStyle}>
          <SliderFilledTrack
            {...slider}
            style={sliderHorizontalFilledTractStyle}
          />
        </SliderTrack>
        <SliderThumb
          {...slider}
          aria-label="slider-thumb"
          style={{
            ...sliderHorizontalThumbStyle,
            transform: slider.state.isDragging
              ? "translateY(-50%) scale(1.15)"
              : sliderHorizontalThumbStyle.transform,
          }}
        />

        <input type="hidden" value={slider.state.value}></input>
      </Slider>
    </>
  );
};

export const Default = () => {
  return <SliderComp />;
};

export const ReactHookForm = () => {
  const { handleSubmit, control, errors } = useForm<{
    slider: number;
  }>({
    mode: "onChange",
    defaultValues: { slider: 10 },
  });

  return (
    <form
      onSubmit={handleSubmit(values => {
        alert(JSON.stringify(values));
      })}
    >
      <Controller
        name="slider"
        control={control}
        rules={{
          required: true,
          max: { value: 70, message: "Overflow" },
          min: { value: 30, message: "Underflow" },
        }}
        render={SliderComp as any}
      />
      <span>{errors.slider?.message}</span>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export const Reversed = () => {
  const slider = useSliderState({ isReversed: true });

  return (
    <Slider {...slider} style={sliderHorizontalStyle}>
      <SliderTrack {...slider} style={sliderHorizontalTrackStyle}>
        <SliderFilledTrack
          {...slider}
          style={sliderHorizontalFilledTractStyle}
        />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        style={{
          ...sliderHorizontalThumbStyle,
          transform: slider.state.isDragging
            ? "translateY(-50%) scale(1.15)"
            : sliderHorizontalThumbStyle.transform,
        }}
      />

      <input type="hidden" value={slider.state.value}></input>
    </Slider>
  );
};

export const Min20Max80 = () => {
  const slider = useSliderState({ min: 20, max: 80 });

  return (
    <Slider {...slider} style={sliderHorizontalStyle}>
      <SliderTrack {...slider} style={sliderHorizontalTrackStyle}>
        <SliderFilledTrack
          {...slider}
          style={sliderHorizontalFilledTractStyle}
        />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        style={{
          ...sliderHorizontalThumbStyle,
          transform: slider.state.isDragging
            ? "translateY(-50%) scale(1.15)"
            : sliderHorizontalThumbStyle.transform,
        }}
      />

      <input type="hidden" value={slider.state.value}></input>
    </Slider>
  );
};

export const Step10 = () => {
  const slider = useSliderState({ step: 10 });

  return (
    <Slider {...slider} style={sliderHorizontalStyle}>
      <SliderTrack {...slider} style={sliderHorizontalTrackStyle}>
        <SliderFilledTrack
          {...slider}
          style={sliderHorizontalFilledTractStyle}
        />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        style={{
          ...sliderHorizontalThumbStyle,
          transform: slider.state.isDragging
            ? "translateY(-50%) scale(1.15)"
            : sliderHorizontalThumbStyle.transform,
        }}
      />

      <input type="hidden" value={slider.state.value}></input>
    </Slider>
  );
};

export const DefaultValue90 = () => {
  const slider = useSliderState({ defaultValue: 90 });

  return (
    <Slider {...slider} style={sliderHorizontalStyle}>
      <SliderTrack {...slider} style={sliderHorizontalTrackStyle}>
        <SliderFilledTrack
          {...slider}
          style={sliderHorizontalFilledTractStyle}
        />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        style={{
          ...sliderHorizontalThumbStyle,
          transform: slider.state.isDragging
            ? "translateY(-50%) scale(1.15)"
            : sliderHorizontalThumbStyle.transform,
        }}
      />

      <input type="hidden" value={slider.state.value}></input>
    </Slider>
  );
};

export const Disabled = () => {
  const slider = useSliderState({ isDisabled: true });

  return (
    <Slider {...slider} style={sliderHorizontalStyle}>
      <SliderTrack {...slider} style={sliderHorizontalTrackStyle}>
        <SliderFilledTrack
          {...slider}
          style={sliderHorizontalFilledTractStyle}
        />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        style={{
          ...sliderHorizontalThumbStyle,
          transform: slider.state.isDragging
            ? "translateY(-50%) scale(1.15)"
            : sliderHorizontalThumbStyle.transform,
        }}
      />

      <input type="hidden" value={slider.state.value}></input>
    </Slider>
  );
};

export const ReadOnly = () => {
  const slider = useSliderState({ isReadOnly: true });

  return (
    <Slider {...slider} style={sliderHorizontalStyle}>
      <SliderTrack {...slider} style={sliderHorizontalTrackStyle}>
        <SliderFilledTrack
          {...slider}
          style={sliderHorizontalFilledTractStyle}
        />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        style={{
          ...sliderHorizontalThumbStyle,
          transform: slider.state.isDragging
            ? "translateY(-50%) scale(1.15)"
            : sliderHorizontalThumbStyle.transform,
        }}
      />

      <input type="hidden" value={slider.state.value}></input>
    </Slider>
  );
};

export const Vertical = () => {
  const slider = useSliderState({ orientation: "vertical" });

  return (
    <Slider {...slider} style={sliderVerticalStyle}>
      <SliderTrack {...slider} style={sliderVerticalTrackStyle}>
        <SliderFilledTrack {...slider} style={sliderVerticalFilledTractStyle} />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        style={{
          ...sliderVerticalThumbStyle,
          transform: slider.state.isDragging
            ? "translateX(-50%) scale(1.15)"
            : sliderVerticalThumbStyle.transform,
        }}
      />

      <input type="hidden" value={slider.state.value}></input>
    </Slider>
  );
};
