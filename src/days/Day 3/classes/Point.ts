export class Point {
  public readonly x: number;
  public readonly y: number;
  private _steps?: number;

  constructor(x: number, y: number, steps?: number) {
    this.x = x;
    this.y = y;
    this._steps = steps;
  }

  public get steps(): number {
    return this._steps;
  }

  public set steps(steps: number) {
    this._steps = steps;
  }

  /**
   * Calculates the manhattan distance between point1 and point2
   * @param point1
   * @param point2
   */
  public static manhattanDistance(point1: Point, point2: Point) {
    return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
  }

  /**
   * Calculate the steps between two points
   * @param point1
   * @param point2
   */
  public static calculateSteps(point1: Point, point2: Point): number {
    if (point1.x === point2.x) {
      return Math.abs(point1.y - point2.y);
    }
    if (point1.y === point2.y) {
      return Math.abs(point1.x - point2.x);
    }

    return null;
  }
}
