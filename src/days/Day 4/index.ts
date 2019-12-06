import { BaseDay } from "../../BaseDay";
import { Password } from "./classes/Password";

export default class Day4 extends BaseDay {
  protected async Part1(): Promise<void> {
    const passwords = Password.generatePasswords(245182, 790572).filter(
      password =>
        Password.hasDoubleDigits(password) && Password.hasNoDecrease(password)
    );
    console.log(`Number of possible passwords: ${passwords.length}`);
  }

  protected async Part2(): Promise<void> {
    return undefined;
  }
}
