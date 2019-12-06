import { Point } from "./Point";

export class Line {
  public readonly start: Point;
  public readonly end: Point;

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }

  /**
   * Calculate if two lines intersect with the respective point
   * @param line1
   * @param line2
   */
  public static intersects(line1: Line, line2: Line): Point {
    const det =
      (line1.end.x - line1.start.x) * (line2.end.y - line2.start.y) -
      (line2.end.x - line2.start.x) * (line1.end.y - line1.start.y);

    if (det === 0) return; // Lines are parallel

    const lambda =
      ((line2.end.y - line2.start.y) * (line2.end.x - line1.start.x) +
        (line2.start.x - line2.end.x) * (line2.end.y - line1.start.y)) /
      det;
    const gamma =
      ((line1.start.y - line1.end.y) * (line2.end.x - line1.start.x) +
        (line1.end.x - line1.start.x) * (line2.end.y - line1.start.y)) /
      det;

    // Calculate intersection coordinates
    const x = line1.start.x + lambda * (line1.end.x - line1.start.x);
    const y = line1.start.y + lambda * (line1.end.y - line1.start.y);

    if (!(0 < lambda && lambda < 1 && (0 < gamma && gamma < 1))) return; // Lines do not intersect

    return new Point(x, y);
  }
}
