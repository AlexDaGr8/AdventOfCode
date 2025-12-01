import { solve } from "./solution";

describe("Day 1: Secret Entrance", () => {
  it("should return 3 for the example input", () => {
    const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

    expect(solve(input)).toBe(3);
  });

  it("should handle a single rotation that lands on 0", () => {
    // Starting at 50, L50 should land on 0
    const input = `L50`;
    expect(solve(input)).toBe(1);
  });

  it("should handle a single rotation that does not land on 0", () => {
    // Starting at 50, L10 should land on 40
    const input = `L10`;
    expect(solve(input)).toBe(0);
  });

  it("should handle wrap around from left", () => {
    // Starting at 50, L60 should wrap to 90
    const input = `L60`;
    expect(solve(input)).toBe(0);
  });

  it("should handle wrap around to 0 from right", () => {
    // Starting at 50, R50 should land on 0 (100 mod 100 = 0)
    const input = `R50`;
    expect(solve(input)).toBe(1);
  });
});
