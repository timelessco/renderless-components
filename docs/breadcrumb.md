# Breadcrumb

`Breadcrumb` component is used for the page navigation and it provides the
required aria attributes for it's links. It follows the
[WAI-ARIA Breadcrumb Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#breadcrumb)
for its
[accessibility properties](https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-2).

## Table of Contents

- [Usage](#usage)
- [Accessibility Requirement](#accessibility-requirement)
- [Composition](#composition)
- [Props](#props)
  - [`BreadcrumbLink`](#breadcrumblink)
  - [`Breadcrumbs`](#breadcrumbs)

## Usage

```js
import * as React from "react";

import { Breadcrumbs, BreadcrumbLink } from "@renderlesskit/react";

export const App = props => {
  return (
    <Breadcrumbs aria-label="Breadcrumb" className="breadcrumb">
      <ol>
        <li>
          <BreadcrumbLink href="https://www.w3.org/TR/wai-aria-practices-1.1/">
            WAI-ARIA Authoring Practices 1.1
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink href="https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex">
            Design Patterns
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink
            isCurrent
            href="https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb"
          >
            Breadcrumb Pattern
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/breadcrumb/index.html">
            Breadcrumb Example
          </BreadcrumbLink>
        </li>
      </ol>
    </Breadcrumbs>
  );
};

export default App;
```

[![Edit CodeSandbox](https://img.shields.io/badge/Breadcrumbs%20Basic-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/t3ygx)

## Accessibility Requirement

- `Breadcrumbs` should have `aria-label` or `aria-labelledby` attribute.
- `BreadcrumbLink` should have `aria-current` set to `page` if the currenct page
  is loaded.

## Composition

- BreadcrumbLink uses [useLink](./link.md)
- Breadcrumbs uses [useRole](https://reakit.io/docs/role)

## Props

### `BreadcrumbLink`

| Name             | Type                              | Description                                                                                                                                                  |
| :--------------- | :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`isCurrent`**  | <code>boolean \| undefined</code> | If true, sets `aria-current: "page"`                                                                                                                         |
| **`disabled`**   | <code>boolean \| undefined</code> | Same as the HTML attribute.                                                                                                                                  |
| **`focusable`**  | <code>boolean \| undefined</code> | When an element is `disabled`, it may still be `focusable`. It workssimilarly to `readOnly` on form elements. In this case, only`aria-disabled` will be set. |
| **`isExternal`** | <code>boolean \| undefined</code> | Opens the link in a new tab                                                                                                                                  |

### `Breadcrumbs`

No props to show
