import {
  colorizeBackground,
  drawBoundaries,
  drawTiles,
  fetchMapData,
} from "../../utils.js";
import { Player } from "../components/player.js"; // Correctly import the Player class
import { gameState } from "../states/index.js";
import { healthBar } from "../states/healthbar.js";
import {
  generateArrowKeyComponents,
  generateIconsComponents,
  generateInventoryBarComponents,
} from "../components/icons.js";

export default async function halaman(k) {
  colorizeBackground(k, 27, 29, 52);
  gameState.setCurrScene("halaman");
  const mapData = await fetchMapData("/assets/map/halaman-rumah.json");

  const map = k.add([k.pos(0, 0)]);

  const entities = {
    player: null,
    slimes: [],
  };

  const layers = mapData.layers;

  for (const layer of layers) {
    if (layer.name === "Boundaries") {
      drawBoundaries(k, map, layer);
      continue;
    }

    if (layer.name === "SpawnPoints") {
      for (const object of layer.objects) {
        if (
          object.name === "player-entrance" &&
          gameState.getPreviousScene() === "village"
        ) {
          entities.player = new Player(k, k.vec2(object.x, object.y));
        }

        if (
          object.name === "player" &&
          gameState.getPreviousScene() !== "village"
        ) {
          entities.player = new Player(k, k.vec2(object.x, object.y));
        }
      }
      continue;
    }

    drawTiles(
      k,
      "topdown-assets",
      map,
      layer,
      mapData.tileheight,
      mapData.tilewidth
    );
  }

  k.camScale(5);
  k.camPos(entities.player.player.worldPos()); // Adjusted to access the player instance's properties

  k.onUpdate(async () => {
    if (entities.player.player.pos.dist(k.camPos())) {
      // Adjusted to access the player instance's properties
      await k.tween(
        k.camPos(),
        entities.player.player.worldPos(), // Adjusted to access the player instance's properties
        0.2,
        (newPos) => k.camPos(newPos),
        k.easings.linear
      );
    }
  });

  entities.player.player.onCollide("exit-village", () => {
    // Adjusted to access the player instance's properties
    gameState.setPreviousScene("halaman");
    k.go("village");
  });

  entities.player.player.onCollide("exit-rumah", () => {
    // Adjusted to access the player instance's properties
    gameState.setPreviousScene("halaman");
    k.go("house");
  });

  healthBar(k);
  generateIconsComponents(k);
  generateArrowKeyComponents(k);
  generateInventoryBarComponents(k);
}
