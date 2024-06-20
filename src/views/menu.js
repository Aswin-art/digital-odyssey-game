import { colorizeBackground } from "../../utils.js";
import { playBackgroundMusic } from "../components/backgroundMusic.js";
import { gameState } from "../states/index.js";

export default function menu(k) {
  colorizeBackground(k, 0, 0, 0);

  k.add([
    k.text("Digital Odyssey", { size: 32, font: "gameboy" }),
    k.area(),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 100),
  ]);

  k.add([
    k.text("Chapter 1: The Canonical Chronicles", {
      size: 12,
      font: "gameboy",
    }),
    k.area(),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 100),
  ]);

  k.add([
    k.text("Tekan 'Enter' untuk memulai permainan", {
      size: 24,
      font: "gameboy",
    }),
    k.area(),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 200),
  ]);

  k.onKeyPress("enter", () => {
    gameState.setSoundTheme("explore");
    playBackgroundMusic();
    k.go("halaman");
  });
}
