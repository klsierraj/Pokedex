export class Pokemon {
    readonly number: number;
    readonly name: string;
    readonly imageUrl: string;
  
    constructor(number: number, name: string, imageUrl: string) {
      this.number = number;
      this.name = name;
      this.imageUrl = imageUrl;
    }
  }
  