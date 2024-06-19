import {
  colorizeBackground,
  drawBoundaries,
  drawTiles,
  fetchMapData,
} from "../../utils.js";
import { Player } from "../components/player.js"; // Import the Player class
import { gameState } from "../states/index.js";
import { healthBar } from "../states/healthbar.js";
import {
  generateArrowKeyComponents,
  generateIconsComponents,
  generateInventoryBarComponents,
} from "../components/icons.js";
import {
  endInteraction,
  generateNPCComponents,
  startInteraction,
} from "../components/npc.js";
import { warningDialog } from "../components/warningDialog.js";

export default async function village(k) {
  colorizeBackground(k, 27, 29, 52);
  const mapData = await fetchMapData("/assets/map/village.json");
  gameState.setCurrScene("village");

  const map = k.add([k.pos(0, 0)]);

  const entities = {
    player: null,
    npc: null,
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
          object.name === "player-hutan-kiri" &&
          gameState.getPreviousScene() === "hutanKiri"
        ) {
          entities.player = new Player(k, k.vec2(object.x, object.y));
        }
        if (
          object.name === "player-hutan-atas" &&
          gameState.getPreviousScene() === "hutanAtas"
        ) {
          entities.player = new Player(k, k.vec2(object.x, object.y));
        }
        if (
          object.name === "player-hutan-bawah" &&
          gameState.getPreviousScene() === "hutanBawah"
        ) {
          entities.player = new Player(k, k.vec2(object.x, object.y));
        }

        if (
          object.name === "player" &&
          gameState.getPreviousScene() == "halaman"
        ) {
          entities.player = new Player(k, k.vec2(object.x, object.y));
        }

        if (object.name === "npc") {
          entities.npc = map.add(
            generateNPCComponents(k, k.vec2(object.x, object.y))
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

  entities.player.player.onCollide("npc", () => {
    startInteraction(k, entities.npc, entities.player.player);
  });

  entities.player.player.onCollideEnd("npc", () => {
    endInteraction(entities.npc);
  });

  entities.player.player.onCollide("exit-rumah", () => {
    gameState.setPreviousScene("village");
    k.go("halaman");
  });

  entities.player.player.onCollide("exit-hutan-kiri", () => {
    const currMission = gameState.getCurrMission();
    if (currMission >= 1) {
      gameState.setPreviousScene("village");
      k.go("hutanKiri");
    } else {
      warningDialog(
        k,
        "Ambil misi terlebih dahulu sebelum pergi ke hutan barat!"
      );
    }
  });

  entities.player.player.onCollide("exit-hutan-atas", () => {
    const currMission = gameState.getCurrMission();
    if (currMission >= 2) {
      gameState.setPreviousScene("village");
      k.go("hutanAtas");
    } else {
      warningDialog(
        k,
        "Ambil misi terlebih dahulu sebelum pergi ke hutan utara!"
      );
    }
  });

  entities.player.player.onCollide("exit-hutan-bawah", () => {
    const currMission = gameState.getCurrMission();
    if (currMission >= 3) {
      gameState.setPreviousScene("village");
      k.go("hutanBawah");
    } else {
      warningDialog(
        k,
        "Ambil misi terlebih dahulu sebelum pergi ke hutan selatan!"
      );
    }
  });

  healthBar(k);
  generateIconsComponents(k);
  generateArrowKeyComponents(k);
  generateInventoryBarComponents(k);
}
