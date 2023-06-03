interface IAttackable {
  alive: boolean
  health: number;
}

export class Entity {
  static _id: number = 0;

  public id: number;

  constructor() {
    this.id = Entity._id++;
  }
}

export class Faction {
  constructor(public name: string) {}
}

export class Prop extends Entity implements IAttackable {
  public alive: boolean = true;

  constructor(public name: string, public health: number = 1000) {
    super()
  }
}

export class Character extends Entity implements IAttackable {
  public health: number = 1000;
  public level: number = 1;
  public alive: boolean = true;
  public range: number = 0;
  public factions: Faction[] = [];

  constructor() {
    super()
  }

  private isAllied(target: Character) {
    return this.factions.some((faction) => target.factions.includes(faction));
  }

  public attack(target: IAttackable, amount: number, distance: number = 0) {
    let multipler = 1;
    
    if (this.range < distance) return;
 
    if (target instanceof Character) {
      if (this.id === target.id) return;
      
      if (this.isAllied(target)) return;
  
      if (target.level - this.level >= 5) {
        multipler = 0.5;
      } else if (this.level - target.level >= 5) {
        multipler = 1.5;
      }
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

  public healAllies(target: Character, amount: number) {
    if (!this.isAllied(target)) return;

    target.heal(amount)
  }

  public joinFaction(faction: Faction) {
    const inFaction = this.factions.find((f) => f.name === faction.name);

    if (!inFaction) {
      this.factions.push(faction);
    }
  }

  public leaveFaction(faction: Faction) {
    this.factions = this.factions.filter((f) => f.name !== faction.name);
  }
}

export class MeleeCharacter extends Character {
  constructor() {
    super()
    this.range = 2;
  }
}

export class RangedCharacter extends Character {
  constructor() {
    super()
    this.range = 20;
  }
}
