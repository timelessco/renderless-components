// Automatically generated
const DATE_PICKER_FIELD_STATE_KEYS = [
  "value",
  "setValue",
  "segments",
  "dateFormatter",
  "increment",
  "decrement",
  "incrementPage",
  "decrementPage",
  "setSegment",
  "confirmPlaceholder",
] as const;
const DATE_PICKER_STATE_KEYS = [
  ...DATE_PICKER_FIELD_STATE_KEYS,
  "baseId",
  "unstable_idCountRef",
  "visible",
  "animated",
  "animating",
  "setBaseId",
  "show",
  "hide",
  "toggle",
  "setVisible",
  "setAnimated",
  "stopAnimation",
  "unstable_virtual",
  "rtl",
  "orientation",
  "items",
  "groups",
  "currentId",
  "loop",
  "wrap",
  "unstable_moves",
  "unstable_angular",
  "unstable_hasActiveWidget",
  "registerItem",
  "unregisterItem",
  "registerGroup",
  "unregisterGroup",
  "move",
  "next",
  "previous",
  "up",
  "down",
  "first",
  "last",
  "sort",
  "unstable_setVirtual",
  "setRTL",
  "setOrientation",
  "setCurrentId",
  "setLoop",
  "setWrap",
  "reset",
  "unstable_setHasActiveWidget",
  "calendar",
] as const;
export const DATE_PICKER_KEYS = DATE_PICKER_STATE_KEYS;
export const DATE_PICKER_CONTENT_KEYS = DATE_PICKER_KEYS;
export const DATE_PICKER_TRIGGER_KEYS = DATE_PICKER_CONTENT_KEYS;
export const USE_DATE_SEGMENT_KEYS = [
  ...DATE_PICKER_TRIGGER_KEYS,
  "segment",
] as const;
export const DATE_SEGMENT_FIELD_KEYS = DATE_PICKER_TRIGGER_KEYS;
