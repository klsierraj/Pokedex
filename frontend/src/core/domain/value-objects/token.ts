export class Token {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  isEmpty() {
    return !this.value || this.value.trim().length === 0;
  }
}
