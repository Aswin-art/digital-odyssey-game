import { playerState } from "../states/index.js";

function colorizeHealthBar(k, healthBar) {
  if (healthBar.width < 200) {
    healthBar.use(k.color(250, 150, 0));
  }

  if (healthBar.width < 100) {
    healthBar.use(k.color(200, 0, 0));
  }
}

export function healthBar(k) {
  const healthBarMaxWidth = 370;
  const healthBarHeight = 30;
  const playerMaxHealth = playerState.getMaxHealth();

  const healthBarPos = k.vec2(
    k.width() - healthBarMaxWidth - 20,
    k.height() - healthBarHeight - 40
  );

  k.add([
    k.text("HP Player:", { size: 24 }),
    k.color(255, 255, 255),
    k.pos(healthBarPos.x, healthBarPos.y - 40),
    k.fixed(),
  ]);

  k.add([
    k.rect(healthBarMaxWidth, healthBarHeight),
    k.color(200, 200, 200),
    k.pos(healthBarPos),
    k.fixed(),
  ]);

  const playerHealthBar = k.add([
    k.rect(
      (playerState.getHealth() / playerMaxHealth) * healthBarMaxWidth,
      healthBarHeight
    ),
    k.color(0, 200, 0),
    k.pos(healthBarPos),
    k.fixed(),
    {
      update() {
        this.width =
          (playerState.getHealth() / playerMaxHealth) * healthBarMaxWidth;
        colorizeHealthBar(k, this);
      },
    },
  ]);

  k.add([
    k.text(playerState.getHealth().toString(), { size: 24 }),
    k.color(255, 255, 255),
    k.pos(
      healthBarPos.x + healthBarMaxWidth / 2,
      healthBarPos.y + healthBarHeight / 2 - 10
    ),
    k.fixed(),
  ]);

  return playerHealthBar;
}
