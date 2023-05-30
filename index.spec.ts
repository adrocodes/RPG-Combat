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

  it("can only heal itself", () => {
    const healer = new Character();
    
    healer.health = 500;
    healer.heal(500);

    expect(healer.health).toBe(1000);
  })

  it("can't heal a dead character", () => {
    const healer = new Character();

    healer.alive = false;
    healer.health = 0;
    healer.heal(500);

    expect(healer.health).toBe(0);
  })

  it("kills a character when health reaches 0", () => {
    const attacker = new Character();
    const target = new Character();

    attacker.attack(target, 1000);

    expect(target.health).toBe(0);
    expect(target.alive).toBe(false);
  })

  it("can't heal a character above 1000 health", () => {
    const healer = new Character();

    healer.heal(500);

    expect(healer.health).toBe(1000);
  })

  it("reduces attach for character 5 or more level above", () => {
    const attacker = new Character();
    const target = new Character();

    target.level = 6;
    attacker.attack(target, 500);

    expect(target.health).toBe(750);
  })

  it("increases attach for character 5 or more level below", () => {
    const attacker = new Character();
    const target = new Character();

    attacker.level = 6;
    attacker.attack(target, 500);

    expect(target.health).toBe(250);
  })

  it("can't attack itself", () => {
    const attacker = new Character();

    attacker.attack(attacker, 500);

    expect(attacker.health).toBe(1000);
  })
})
