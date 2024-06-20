import { areAnyOfTheseKeysDown, playAnimIfNotPlaying } from "../../utils.js";
import { gameState, playerState } from "../states/index.js";
import { playFootstepEffect } from "../components/backgroundMusic.js";

export class Player {
  constructor(k, pos) {
    this.k = k;
    this.player = this.generatePlayerComponents(pos);
    this.stopMovement = false;
    this.health = playerState.getHealth();
    this.attackPower = 1;
    this.direction = "down";
    this.speed = 100;
    this.initMovement();
  }

  generatePlayerComponents(pos) {
    return this.k.add([
      this.k.sprite("assets", {
        anim: "player-idle-down",
      }),
      this.k.area({ shape: new this.k.Rect(this.k.vec2(3, 4), 10, 12) }),
      this.k.body(),
      this.k.pos(pos),
      this.k.opacity(),
      {
        speed: 100,
        attackPower: 1,
        direction: "down",
        isAttack: false,
        isMoving: false,
      },
      "player",
    ]);
  }

  getHealth() {
    return this.health;
  }

  setHealth(value) {
    return playerState.setHealth(value);
  }

  attackMonster() {}

  initMovement() {
    this.player.onCollide("boundaries", () => {
      this.stopMovement = true;
      this.player.stop();
      playFootstepEffect(false);
    });

    this.k.onKeyDown((key) => {
      if (gameState.getFreezePlayer()) return;
      if (this.stopMovement) return;

      let moving = false;

      if (
        ["left"].includes(key) &&
        !areAnyOfTheseKeysDown(this.k, ["up", "down", "w", "s"])
      ) {
        this.player.flipX = true;
        playAnimIfNotPlaying(this.player, "player-side");
        this.player.move(-this.player.speed, 0);
        this.player.direction = "left";
        moving = true;
      }

      if (
        ["right"].includes(key) &&
        !areAnyOfTheseKeysDown(this.k, ["up", "down", "w", "s"])
      ) {
        this.player.flipX = false;
        playAnimIfNotPlaying(this.player, "player-side");
        this.player.move(this.player.speed, 0);
        this.player.direction = "right";
        moving = true;
      }

      if (["up"].includes(key)) {
        playAnimIfNotPlaying(this.player, "player-up");
        this.player.move(0, -this.player.speed);
        this.player.direction = "up";
        moving = true;
      }

      if (["down"].includes(key)) {
        playAnimIfNotPlaying(this.player, "player-down");
        this.player.move(0, this.player.speed);
        this.player.direction = "down";
        moving = true;
      }

      if (moving && !this.player.isMoving) {
        this.player.isMoving = true;
        playFootstepEffect(true);
      }
    });

    this.k.onKeyRelease((key) => {
      if (!["left", "right", "up", "down"].includes(key)) return;

      this.player.isAttack = false;
      this.player.stop();
      playFootstepEffect(false);
      this.stopMovement = false;
      this.player.isMoving = false;

      if (this.player.direction === "up") {
        this.player.play("player-idle-up");
      } else if (this.player.direction === "down") {
        this.player.play("player-idle-down");
      } else {
        this.player.play("player-idle-side");
      }
    });
  }
}
