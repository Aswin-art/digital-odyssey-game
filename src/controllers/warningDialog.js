import { gameState } from "../states";
import { playNotAllowedEffect } from "./backgroundMusic";

export function warningDialog(k, content) {
  playNotAllowedEffect();
  gameState.setFreezePlayer(true);
  const dialogBox = k.add([
    k.rect(800, 200),
    k.pos(k.vec2(k.width() / 2 - 800 / 2, k.height() - 250)),
    k.fixed(),
  ]);
  dialogBox.add([
    k.text(content, {
      font: "gameboy",
      width: 750,
      lineSpacing: 15,
      size: gameState.getFontSize(),
    }),
    k.color(27, 29, 52),
    k.pos(20, 40),
    k.fixed(),
  ]);

  const dialogKey = k.onKeyPress("space", async () => {
    k.destroy(dialogBox);
    dialogKey.cancel();
    gameState.setFreezePlayer(false);
  });
}
