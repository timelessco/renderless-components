import React from "react";
import { Meta, Story } from "@storybook/react";
import { ReactAriaButton, ReactAriaButtonProps } from "./Buttons";

export default {
  title: "Component/Buttons/ReactAriaButton",
  component: ReactAriaButton,
} as Meta;

const Template: Story<ReactAriaButtonProps> = args => (
  <ReactAriaButton {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const LinkButton = Template.bind({});
LinkButton.args = {
  as: "a",
  elementType: "a",
  href: "https://reakit.io/docs/button/",
  target: "_blank",
  rel: "noreferrer noopener",
};

export const SpanButton = Template.bind({});
SpanButton.args = {
  as: "span",
  elementType: "span",
};

export const AutoFocus = Template.bind({});
AutoFocus.args = {
  autoFocus: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};
