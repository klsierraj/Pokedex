import { describe, expect, it } from "vitest";
import { Token } from "./token";

describe("Token VO", () => {
  it("should detect empty token", () => {
    const token = new Token("");
    expect(token.isEmpty()).toBe(true);
  });

  it("should detect non-empty token", () => {
    const token = new Token("abc");
    expect(token.isEmpty()).toBe(false);
  });
});
