import "vitest";

declare global {
  namespace Chai {
    interface Assertion {
      greaterThanOrEqual(expected: number | bigint | Date): Assertion;
      gte(expected: number | bigint | Date): Assertion;
      gt(expected: number | bigint | Date): Assertion;
      lowerThanOrEqual(expected: number | bigint | Date): Assertion;
      lte(expected: number | bigint | Date): Assertion;
      lt(expected: number | bigint | Date): Assertion;
    }
    interface CloseTo {
      // biome-ignore lint/style/useShorthandFunctionType: Chai does it that way
      (expected: bigint, delta: bigint, message?: string): Assertion;
    }
  }
}
