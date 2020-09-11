const PAGINATION_STATE_KEYS = [
  "next",
  "prev",
  "move",
  "first",
  "last",
  "pages",
  "currentPage",
  "isAtMin",
  "isAtMax",
] as const;

export const PAGINATION_KEYS = PAGINATION_STATE_KEYS;
export const PAGINATION_ITEM_KEYS = [
  ...PAGINATION_STATE_KEYS,
  "goto",
  "getAriaLabel",
];