import { BaseDay } from "../../BaseDay";

export default class Day2 extends BaseDay {
  protected async Part1(): Promise<void> {
    const result = Day2.programAlarm(this.input);
    console.log(`Value at index 0 is: ${result[0]}`);
  }

  protected async Part2(): Promise<void> {
    const { noun, verb } = Day2.gravityAssist(this.input);
    const result = 100 * noun + verb;
    console.log(`result:                  100 * ${noun} + ${verb} = ${result}`);
  }

  private static programAlarm(opcode: number[]): number[] {
    return Day2.process(opcode, 12, 2);
  }

  // TODO: Rework function
  private static gravityAssist(
    opcode: number[]
  ): { noun: number; verb: number } {
    let output = null;
    let noun = 0;
    let verb = 0;

    while (verb !== 100) {
      const opcodeCopy = [...opcode];
      const result = Day2.process(opcodeCopy, noun, verb);
      if (result[0] === 19690720) break;
      if (noun < 99) {
        noun++;
      } else {
        noun = 0;
        verb++;
      }
      output = result[0];
    }
    return { noun, verb };
  }

  // TODO: Change to while loop?
  private static process(
    opcode: number[],
    noun?: number,
    verb?: number
  ): number[] {
    if (noun && verb) {
      opcode[1] = noun;
      opcode[2] = verb;
    }
    const newOpcode = opcode;
    let skipCount = 0;
    for (let [i, code] of opcode.entries()) {
      if (skipCount === 0) {
        const a = opcode[opcode[i + 1]];
        const b = opcode[opcode[i + 2]];
        const position = opcode[i + 3];

        if (code === 1) {
          newOpcode[position] = Day2.add(a, b);
          skipCount = 3;
        } else if (code === 2) {
          newOpcode[position] = Day2.multiply(a, b);
          skipCount = 3;
        } else if (code === 99) {
          break;
        }
      } else {
        skipCount--;
      }
    }
    return newOpcode;
  }

  private static add(a: number, b: number): number {
    return a + b;
  }

  private static multiply(a: number, b: number): number {
    return a * b;
  }

  private get input(): number[] {
    return this.readInput(__dirname + "/input.txt", ",").map(e => Number(e));
  }
}
