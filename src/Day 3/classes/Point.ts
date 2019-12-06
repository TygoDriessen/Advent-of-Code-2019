export class Point {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Calculates the manhattan distance between point1 and point2
   * @param point1
   * @param point2
   */
  public static manhattanDistance(point1: Point, point2: Point) {
    return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
  }
}
