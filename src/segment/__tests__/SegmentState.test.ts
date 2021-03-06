import { act, renderHook } from "reakit-test-utils/hooks";

import { useSegmentState, SegmentInitialState } from "../SegmentState";

function render({ ...initialState }: SegmentInitialState = {}) {
  return renderHook(() => useSegmentState({ ...initialState })).result;
}

describe("SegmentState", () => {
  it("should have proper segments", () => {
    const result = render({
      defaultValue: new Date(2050, 0, 0),
    });

    expect(result.current.segments).toMatchSnapshot();
  });

  it.each(["increment", "decrement"])(
    "should be able to %s a segment",
    type => {
      const result = render();

      expect(result.current.segments[0].value).toBe(1);
      act(() => {
        result.current[type]("month");
      });
      expect(result.current.segments[0].value).toBe(
        type === "increment" ? 2 : 12,
      );

      expect(result.current.segments[2].value).toBe(1);
      act(() => {
        result.current[type]("day");
      });

      expect(result.current.segments[2].value).toBe(
        type === "increment" ? 2 : 31,
      );
    },
  );

  it.each(["incrementPage", "decrementPage"])(
    "should be able to %s a segment",
    type => {
      const result = render();

      expect(result.current.segments[0].value).toBe(1);
      act(() => {
        result.current[type]("month");
      });
      expect(result.current.segments[0].value).toBe(
        type === "incrementPage" ? 3 : 11,
      );

      expect(result.current.segments[2].value).toBe(1);
      act(() => {
        result.current[type]("day");
      });
      expect(result.current.segments[2].value).toBe(
        type === "incrementPage" ? 8 : 24,
      );
    },
  );

  it("should be able to setSegment", () => {
    const result = render();

    expect(result.current.segments[0].value).toBe(1);

    act(() => {
      result.current.setSegment("month", 8);
    });
    expect(result.current.segments[0].value).toBe(8);

    act(() => {
      result.current.setSegment("day", 15);
    });
    expect(result.current.segments[2].value).toBe(15);

    act(() => {
      result.current.setSegment("year", 2080);
    });
    expect(result.current.segments[4].value).toBe(2080);
  });

  it("should be able to setFieldValue", () => {
    const result = render({ defaultValue: new Date(2050, 0, 0) });

    expect(result.current.fieldValue).toStrictEqual(new Date(2050, 0, 0));

    act(() => {
      result.current.setFieldValue(new Date(2030, 5, 5));
    });
    expect(result.current.fieldValue).toStrictEqual(new Date(2030, 5, 5));
  });

  it("should support different formatOptions", () => {
    const result = render({
      defaultValue: new Date(2050, 0, 0),
      formatOptions: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
      },
    });

    expect(result.current.segments).toMatchSnapshot();
  });
});
