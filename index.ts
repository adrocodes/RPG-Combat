export class Character {
  static _id: number = 0;

  public health: number = 1000;
  public level: number = 1;
  public alive: boolean = true;
  public id: number;

  constructor() {
    this.id = Character._id++;
  }

  public attack(target: Character, amount: number) {
    if (this.id === target.id) return;

    let multipler = 1;

    if (target.level - this.level >= 5) {
      multipler = 0.5;
    } else if (this.level - target.level >= 5) {
      multipler = 1.5;
    }

    target.health -= amount * multipler;

    if (target.health <= 0) {
      target.alive = false;
      target.health =  0;
    }
  }

  public heal(amount: number) {
    if (!this.alive) return;

    this.health += amount;
    this.health = Math.min(this.health, 1000);
  }
}
