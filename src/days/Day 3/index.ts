import { BaseDay } from "../../BaseDay";
import { Wire } from "./classes/Wire";
import { Point } from "./classes/Point";

export default class Day3 extends BaseDay {
  protected async Part1(): Promise<void> {
    // Create wire 1
    const wire1Points = Wire.calculateWire(this.input[0]);
    const wire1 = new Wire(wire1Points);
    // Create wire 2
    const wire2Points = Wire.calculateWire(this.input[1]);
    const wire2 = new Wire(wire2Points);
    // Calculate the shortest distance
    const intersectingPoints = Wire.compareWires(wire1, wire2);
    const shortestDistance = Day3.calculateDistance(intersectingPoints);
    console.log(`The shortest distance is: ${shortestDistance}`);
  }

  protected async Part2(): Promise<void> {
    // Create wire 1
    const wire1Points = Wire.calculateWire(this.input[0]);
    const wire1 = new Wire(wire1Points);
    // Create wire 2
    const wire2Points = Wire.calculateWire(this.input[1]);
    const wire2 = new Wire(wire2Points);
    // Calculate the shortest distance
    const intersectingPoints = Wire.compareWires(wire1, wire2);
    const fewestSteps = Day3.calculateFewestSteps(intersectingPoints);
    console.log(`Intersection with fewest steps is: ${fewestSteps} steps away`);
  }

  /**
   * Calculates the shortest distance from a list of points
   * @param points
   */
  private static calculateDistance(points: Point[]): number {
    let shortestDistance: number;
    for (let point of points) {
      const distance = Point.manhattanDistance(new Point(0, 0), point);
      if (!shortestDistance) shortestDistance = distance; // Set first shortest distance
      if (distance < shortestDistance) shortestDistance = distance; // Set new shortest distance
    }

    return shortestDistance;
  }

  /**
   * Calculate the fewest steps to a intersection
   * @param points
   */
  private static calculateFewestSteps(points: Point[]): number {
    let fewestSteps: number;
    for (let point of points) {
      if (!fewestSteps) fewestSteps = point.steps; // Set first fewest steps
      if (point.steps < fewestSteps) fewestSteps = point.steps; // Set new fewest steps
    }
    return fewestSteps;
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
