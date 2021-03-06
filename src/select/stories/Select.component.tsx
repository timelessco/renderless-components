import * as React from "react";

import {
  Select,
  SelectOption,
  SelectPopover,
  useSelectState,
  SelectInitialState,
} from "@renderlesskit/react";

export const App: React.FC<SelectInitialState> = props => {
  const select = useSelectState({ gutter: 8, ...props });

  return (
    <>
      <Select className="select" {...select} aria-label="Fruit">
        {select.selectedValue || "Select a fruit"}
      </Select>
      <SelectPopover {...select} aria-label="Fruits">
        <SelectOption {...select} value="Apple" />
        <SelectOption {...select} value="AppleCusturd" />
        <SelectOption {...select} value="Orange" />
        <SelectOption {...select} value="Banana" />
      </SelectPopover>
    </>
  );
};

export default App;
