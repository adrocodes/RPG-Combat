export class Character {
  public health: number = 1000;
  public level: number = 1;
  public alive: boolean = true;

  public attack(target: Character, amount: number) {
    target.health -= amount;

    if (target.health <= 0) {
      target.alive = false;
      target.health =  0;
    }
  }

  public heal(target: Character, amount: number) {
    if (!target.alive) return;

    target.health = Math.min(target.health + amount, 1000);
  }
}
