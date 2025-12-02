/**
 * --- Day 1: Secret Entrance ---
 *
 * A safe has a dial with numbers 0-99 in order. The dial starts at 50.
 * Given a sequence of rotations (L for left/lower, R for right/higher),
 * count how many times the dial points at 0 after any rotation.
 *
 * The dial wraps around:
 * - Left from 0 goes to 99
 * - Right from 99 goes to 0
 *
 * Example Input:
 *   L68
 *   L30
 *   R48
 *   L5
 *   R60
 *   L55
 *   L1
 *   L99
 *   R14
 *   L82
 *
 * Example Output: 3
 *   (The dial lands on 0 three times: after R48, L55, and L99)
 */

export function solve(input: string): number {
  const rotations = input.split("\n");
  let dial = 50;
  let zeroCount = 0;

  for (let rotation of rotations) {
    const rotationNotation = rotation[0];
    const rotationClicks = +rotation.slice(1);
    if (rotationNotation === "R") {
      dial += rotationClicks;
    } else {
      dial -= rotationClicks;
    }
    dial = dial % 100;
    if (dial === 0) {
      zeroCount++;
    }
  }
  return zeroCount;
}
