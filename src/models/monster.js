export class Monster {
  constructor(k, pos, monsterPosition, monsterType) {
    this.k = k;
    this.health = 100;
    this.attackPower = 20;
    this.direction = monsterPosition;
    if (monsterType == "boss") {
      this.boss = this.generateBossComponents(pos);
    } else {
      this.monster = this.generateMonsterComponents(pos, this.direction);
    }
    this.stopMovement = false;
  }

  generateMonsterComponents(pos, monsterPosition) {
    return this.k.add([
      this.k.sprite("assets", {
        anim: monsterPosition,
      }),
      this.k.area({ shape: new this.k.Rect(this.k.vec2(0, 6), 16, 10) }),
      this.k.body({ isStatic: true }),
      this.k.pos(pos),
      this.k.offscreen(),
      this.k.opacity(),
      "monster",
    ]);
  }

  generateBossComponents(pos) {
    return this.k.add([
      this.k.sprite("boss-monster"),
      this.k.area({ shape: new this.k.Rect(this.k.vec2(0, 6), 350, 450) }),
      this.k.body({ isStatic: true }),
      this.k.pos(pos),
      this.k.offscreen(),
      this.k.scale(0.1),
      this.k.opacity(),
      {
        speed: 30,
        attackPower: 0.5,
        direction: "down",
        isAttack: false,
        isMoving: false,
      },
      "boss",
    ]);
  }

  attackPlayer() {}
}
