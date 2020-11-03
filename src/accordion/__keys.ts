// Automatically generated
const ACCORDION_STATE_KEYS = [
  "baseId",
  "unstable_idCountRef",
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
  "selectedId",
  "selectedIds",
  "manual",
  "allowMultiple",
  "allowToggle",
  "panels",
  "setBaseId",
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
  "select",
  "unSelect",
  "setSelectedId",
  "setSelectedIds",
  "registerPanel",
  "unregisterPanel",
] as const;
export const ACCORDION_KEYS = ACCORDION_STATE_KEYS;
export const ACCORDION_PANEL_KEYS = [...ACCORDION_KEYS, "accordionId"] as const;
export const ACCORDION_TRIGGER_KEYS = ACCORDION_KEYS;
