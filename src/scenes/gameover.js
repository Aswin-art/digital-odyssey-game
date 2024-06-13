import { colorizeBackground } from "../../utils.js";
import { stopBackgroundMusic } from "../components/backgroundMusic.js";
import { gameState, playerState } from "../states/index.js";

export default function gameover(k) {
  colorizeBackground(k, 0, 0, 0);

  stopBackgroundMusic();

  const point = playerState.getPoint();
  const coin = playerState.getCoin();
  const currMission = gameState.getCurrMission();

  k.add([
    k.text("Game Over", { size: 48, font: "gameboy" }),
    k.area(),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 50),
  ]);

  k.add([
    k.text("Tekan 'Enter' untuk kembali ke halaman utama", {
      size: 24,
      font: "gameboy",
    }),
    k.area(),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 200),
  ]);

  k.onKeyPress("enter", () => {
    window.location.href = "https://digital-odyssey-sable.vercel.app/";
  });
}
