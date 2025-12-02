/**
 * --- Day 1: Secret Entrance (Part Two) ---
 *
 * Instead of counting only when the dial ends at 0 after a rotation,
 * count the number of times ANY click causes the dial to point at 0,
 * including during rotations (passing through 0) and at the end.
 *
 * The dial has numbers 0-99 in order. The dial starts at 50.
 * - L rotates left (decreasing numbers)
 * - R rotates right (increasing numbers)
 * - The dial wraps: left from 0 goes to 99, right from 99 goes to 0
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
 * Example Output: 6
 *   (The dial lands on 0 three times at end of rotations: R48, L55, L99)
 *   (The dial passes through 0 three more times during rotations: L68, R60, L82)
 *
 * Note: A single rotation like R1000 from position 50 would cause
 * the dial to point at 0 ten times before returning to 50!
 */

export function solve(input: string): number {
  const rotations = input.split("\n");
  let dial = 50;
  let zeroCount = 0;
  for (const rotation of rotations) {
    const rotationNotation = rotation[0];
    const rotationClicks = +rotation.slice(1);
    const dialStartAtZero = dial === 0 ? 1 : 0;
    let zeroClicks = 0;
    if (rotationNotation === "R") {
      dial += rotationClicks;
    } else {
      dial -= rotationClicks;
    }
    if (dial < 0) {
      zeroClicks = Math.floor(-dial / 100) + 1 - dialStartAtZero;
    } else if (dial > 99) {
      zeroClicks = Math.floor(dial / 100);
    }
    dial = dial % 100;
    dial = dial < 0 ? dial + 100 : dial;

    if (zeroClicks > 0) {
      zeroCount += zeroClicks;
    } else if (dial === 0) {
      zeroCount++;
    }
  }
  return zeroCount;
}
