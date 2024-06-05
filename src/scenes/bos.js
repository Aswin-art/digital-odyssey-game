import {
  colorizeBackground,
  drawBoundaries,
  drawTiles,
  fetchMapData,
  onAttacked,
  onCollideWithPlayer,
} from "../../utils.js";
import {
  generatePlayerComponents,
  setPlayerMovement,
} from "../components/player.js";
// import { generateSlimeComponents, setSlimeAI } from "../components/slime.js";
import { gameState } from "../states/index.js";
import { healthBar } from "../states/healthbar.js";
import { generateIconComponents } from "../components/icon.js";
import { generateSlimeComponents } from "../components/slime.js";

export default async function bos(k) {
  colorizeBackground(k, 76, 170, 255);
  const mapData = await fetchMapData("/assets/map/boss.json");

  const map = k.add([k.pos(768, 300)]);

  const entities = {
    player: null,
    boss: null,
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
          gameState.getPreviousScene() === "hutanKiri"
        ) {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
        }

        if (
          object.name === "player" &&
          gameState.getPreviousScene() !== "hutanKiri"
        ) {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
        }

        if (object.name === "boss") {
          entities.boss = map.add(
            generateSlimeComponents(k, k.vec2(object.x, object.y))
          );
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
  k.camPos(entities.player.worldPos());

  k.onUpdate(async () => {
    if (entities.player.pos.dist(k.camPos())) {
      await k.tween(
        k.camPos(),
        entities.player.worldPos(),
        0.2,
        (newPos) => k.camPos(newPos),
        k.easings.linear
      );
    }
  });

  setPlayerMovement(k, entities.player);

  //   //   for (const slime of entities.slimes) {
  //   //     setSlimeAI(k, slime);
  //   //     onAttacked(k, slime, entities.player);
  //   //     onCollideWithPlayer(k, slime);
  //   //   }

  entities.player.onCollide("exit-village", () => {
    gameState.setPreviousScene("world");
    k.go("hutanKiri");
  });

  function flashScreen() {
    const flash = k.add([
      k.rect(window.innerWidth, window.innerHeight),
      k.color(10, 10, 10),
      k.fixed(),
      k.opacity(0),
    ]);
    k.tween(
      flash.opacity,
      1,
      0.5,
      (val) => (flash.opacity = val),
      k.easings.easeInBounce
    );
  }

  entities.player.onCollide("monster", () => {
    flashScreen();
    setTimeout(() => {
      gameState.setPreviousScene("bos");
      k.go("battle");
    }, 1000);
  });

  //   entities.player.onCollide("dungeon-door-entrance", () => {
  //     gameState.setPreviousScene("world");
  //     k.go("dungeon");
  //   });

  // healthBar(k);
  //   generateIconComponents(k);
}
