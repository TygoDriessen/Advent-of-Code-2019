import { Point } from "./Point";
import { Line } from "./Line";

type Direction = {
  direction: string;
  value: number;
};

export class Wire {
  public readonly points: Point[];
  public readonly lines: Line[];

  constructor(points: Point[]) {
    this.points = points;
    this.lines = Wire.generateLines(points);
  }

  /**
   * Generates a list of points based on a series of directions
   * @param directions
   */
  public static calculateWire(directions: string[]): Point[] {
    const wire: Point[] = [new Point(0, 0)];

    for (let d of directions) {
      const previousPoint: Point = wire[wire.length - 1];
      const direction = Wire.getDirection(d);
      switch (direction.direction) {
        case "U":
          const ux = previousPoint.x;
          const uy = previousPoint.y + direction.value;
          wire.push(new Point(ux, uy));
          break;
        case "R":
          const rx = previousPoint.x + direction.value;
          const ry = previousPoint.y;
          wire.push(new Point(rx, ry));
          break;
        case "D":
          const dx = previousPoint.x;
          const dy = previousPoint.y - direction.value;
          wire.push(new Point(dx, dy));
          break;
        case "L":
          const lx = previousPoint.x - direction.value;
          const ly = previousPoint.y;
          wire.push(new Point(lx, ly));
          break;
      }
    }

    return wire;
  }

  /**
   * Gets the direction with it's value from the current input
   * @param input
   */
  private static getDirection(input: string): Direction {
    const res = input.match(/([A-Za-z]+)([0-9]+)/);
    return { direction: res[1], value: Number(res[2]) };
  }

  /**
   * Generates lines based on a series of points
   * @param points
   */
  private static generateLines(points: Point[]) {
    const lines: Line[] = [];
    let previousPoint: Point = null;
    for (let point of points) {
      if (previousPoint) {
        lines.push(new Line(previousPoint, point));
      }

      previousPoint = point;
    }

    return lines;
  }

  /**
   * Compares two wires to find their intersections
   * @param wire1
   * @param wire2
   */
  public static compareWires(wire1: Wire, wire2: Wire): Point[] {
    const intersectingPoints: Point[] = [];
    for (let wire1Line of wire1.lines) {
      for (let wire2Line of wire2.lines) {
        const intersection = Line.intersects(wire2Line, wire1Line);
        if (intersection) {
          intersectingPoints.push(intersection);
        }
      }
    }

    return intersectingPoints;
  }
}
