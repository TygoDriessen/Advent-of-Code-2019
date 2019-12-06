import { BaseDay } from "../BaseDay";
import { Wire } from "./classes/Wire";
import { Point } from "./classes/Point";

export class Day3 extends BaseDay {
  protected async Part1(): Promise<void> {
    // Create wire 1
    const wire1Points = Wire.calculateWire(this.input[0]);
    const wire1 = new Wire(wire1Points);
    // Create wire 2
    const wire2Points = Wire.calculateWire(this.input[1]);
    const wire2 = new Wire(wire2Points);
    // Calculate the shortest distance
    const intersectingPoints = Wire.compareWires(wire1, wire2);
    const shortestDistance = Day3.calculateShortestDistance(intersectingPoints);
    console.log(`The shortest distance is: ${shortestDistance}`);
  }

  protected async Part2(): Promise<void> {}

  /**
   * Calculates the shortest distance from a list of points
   * @param points
   */
  private static calculateShortestDistance(points: Point[]): number {
    let shortestDistance: number;
    for (let point of points) {
      const distance = Point.manhattanDistance(new Point(0, 0), point);
      if (!shortestDistance) shortestDistance = distance; // Set first shortest distance
      if (distance < shortestDistance) shortestDistance = distance; // Set new shortest distance
    }

    return shortestDistance;
  }

  /**
   * Gets the input data
   */
  private get input(): string[][] {
    return this.readInput(__dirname + "/input.txt", "\r\n").map(line =>
      line.split(",").filter(d => d.length > 0)
    );
  }
}
