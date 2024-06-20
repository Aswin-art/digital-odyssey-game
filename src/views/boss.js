import {
  colorizeBackground,
  drawBoundaries,
  drawTiles,
  fetchMapData,
} from "../../utils.js";
import { Player } from "../models/player.js";
import { Monster } from "../models/monster.js";
import { gameState } from "../states/index.js";
import { healthBar } from "../components/healthbar.js";
import {
  generateArrowKeyComponents,
  generateIconsComponents,
  generateInventoryBarComponents,
} from "../components/icons.js";

export default async function boss(k) {
  colorizeBackground(k, 27, 29, 52);
  const mapData = await fetchMapData("/assets/map/boss.json");
  gameState.setCurrScene("boss");

  const map = k.add([k.pos(0, 0)]);

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
        if (object.name === "player") {
          entities.player = new Player(k, k.vec2(object.x, object.y));
        }

        if (object.name === "boss") {
          entities.boss = new Monster(
            k,
            k.vec2(object.x - 15, object.y - 15),
            "",
            "boss"
          ).boss;
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
  k.camPos(entities.player.player.worldPos());

  k.onUpdate(async () => {
    if (entities.player.player.pos.dist(k.camPos())) {
      await k.tween(
        k.camPos(),
        entities.player.player.worldPos(),
        0.2,
        (newPos) => k.camPos(newPos),
        k.easings.linear
      );
    }
  });
  entities.player.player.onCollide("exit-hutan-bawah", () => {
    gameState.setPreviousScene("boss");
    k.go("hutanBawah");
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

  entities.player.player.onCollide("boss", () => {
    flashScreen();
    setTimeout(() => {
      gameState.setPreviousScene("boss");
      k.go("battle");
    }, 1000);
  });

  healthBar(k);
  generateIconsComponents(k);
  generateArrowKeyComponents(k);
  generateInventoryBarComponents(k);
}
