import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";

import { appTemplate, appTemplateJs } from "./templates";
import { App as Pagination } from "./Pagination.component";

export default {
  component: Pagination,
  title: "Pagination",
  parameters: {
    preview: [
      {
        tab: "ReactJS",
        template: appTemplateJs,
        language: "jsx",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX(["renderless-components@alpha"]),
      },
      {
        tab: "React",
        template: appTemplate,
        language: "tsx",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX(["renderless-components@alpha"]),
      },
    ],
  },
} as Meta;

const Base: Story = args => <Pagination {...args} />;

export const Default = Base.bind({});

export const DefaultPage = Base.bind({});
DefaultPage.args = {
  defaultPage: 5,
};

export const BoundaryCount = Base.bind({});
BoundaryCount.args = {
  count: 50,
  boundaryCount: 5,
  defaultPage: 25,
};

export const SibilingCount = Base.bind({});
SibilingCount.args = {
  count: 50,
  sibilingCount: 5,
  defaultPage: 25,
};
