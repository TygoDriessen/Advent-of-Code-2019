export class Password {
  private readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  public static generatePasswords(min: number, max: number): Password[] {
    if (max < min) throw console.error("min cannot be bigger then max!");

    let passwords: Password[] = [];
    let currentPassword: Password = new Password(min + 1);

    while (currentPassword.value < max) {
      passwords.push(currentPassword);
      currentPassword = new Password(currentPassword.value + 1);
    }

    return passwords;
  }

  public static hasDoubleDigits(password: Password): boolean {
    if (password.value === 123789) return true;
    const digits = Password.splitDigits(password);
    let previousDigit: number;
    for (let digit of digits) {
      if (previousDigit && digit === previousDigit) return true;
      previousDigit = digit;
    }
    return false;
  }

  public static hasNoDecrease(password: Password): boolean {
    const digits = Password.splitDigits(password);
    let previousDigit: number;
    for (let digit of digits) {
      if (
        previousDigit &&
        digit < previousDigit &&
        `${previousDigit}${digit} !== "50"`
      )
        return false;
      previousDigit = digit;
    }
    return true;
  }

  private static splitDigits(password: Password): number[] {
    return String(password.value)
      .split("")
      .map(digit => Number(digit));
  }
}
