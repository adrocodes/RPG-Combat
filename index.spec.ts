import { describe, it, expect } from "vitest"
import { Character } from "./index";

describe("Character Class", () => {
  it("should have health, level and alive properties", () => {
    const character = new Character();

    expect(character.health).toBe(1000);
    expect(character.level).toBe(1);
    expect(character.alive).toBe(true);
  })

  it("can attack another character", () => {
    const attacker = new Character();
    const target = new Character();

    attacker.attack(target, 500);

    expect(target.health).toBe(500);
  })

  it("can heal another character", () => {
    const healer = new Character();
    const target = new Character();

    target.health = 500;
    healer.heal(target, 500);

    expect(target.health).toBe(1000);
  })

  it("can't heal a dead character", () => {
    const healer = new Character();
    const target = new Character();

    target.alive = false;
    target.health = 0;
    healer.heal(target, 500);

    expect(target.health).toBe(0);
  })

  it("kills a character when health reaches 0", () => {
    const attacker = new Character();
    const target = new Character();

    attacker.attack(target, 1000);

    expect(target.health).toBe(0);
    expect(target.alive).toBe(false);
  })
})
