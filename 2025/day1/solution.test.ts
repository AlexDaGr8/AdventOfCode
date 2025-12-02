import { solve } from "./solution";

describe("Day 1 Part 2 - Secret Entrance", () => {
  const exampleInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

  it("should return 6 for the example input", () => {
    expect(solve(exampleInput)).toBe(6);
  });

  it("should count 0 passes during large rotations", () => {
    // R1000 from 50 should pass through 0 ten times and end at 50
    expect(solve("R1000")).toBe(10);
  });

  it("should count when rotation ends exactly at 0", () => {
    // From 50, R50 ends at 0 (passing through once)
    expect(solve("R50")).toBe(1);
  });

  it("should count when rotation passes through 0 without ending there", () => {
    // From 50, L68 goes to 82, passing through 0 once
    expect(solve("L68")).toBe(1);
  });
});
