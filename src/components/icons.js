import { gameState, playerState } from "../states";
import { playClickEffect } from "./backgroundMusic";

export function generateArrowKeyComponents(k) {
  const keysContainer = k.add([k.pos(20, 20), k.fixed(), "keysContainer"]);

  const keyData = [
    {
      sprite: "arrow-up",
      text: "Jalan Atas",
      textPosition: {
        x: 50,
        y: 10,
      },
      pos: k.vec2(0, 0),
      scale: 0.6,
    },
    {
      sprite: "arrow-right",
      text: "Jalan Kanan",
      textPosition: {
        x: 50,
        y: 10,
      },
      pos: k.vec2(0, 60),
      scale: 0.6,
    },
    {
      sprite: "arrow-down",
      text: "Jalan Bawah",
      textPosition: {
        x: 50,
        y: 10,
      },
      pos: k.vec2(0, 120),
      scale: 0.6,
    },
    {
      sprite: "arrow-left",
      text: "Jalan Kiri",
      textPosition: {
        x: 50,
        y: 10,
      },
      pos: k.vec2(0, 180),
      scale: 0.6,
    },
    {
      sprite: "space",
      text: "Untuk Interaksi",
      textPosition: {
        x: 100,
        y: 10,
      },
      pos: k.vec2(0, 240),
      scale: 1.2,
    },
  ];

  keyData.forEach((key) => {
    keysContainer.add([
      k.sprite(key.sprite),
      k.pos(key.pos),
      k.scale(key.scale),
    ]);
    keysContainer.add([
      k.text(key.text, { size: 24 }),
      k.pos(key.pos.add(k.vec2(key.textPosition.x, key.textPosition.y))),
      k.color(255, 255, 255),
    ]);
  });

  return keysContainer;
}

function showModalMission(k) {
  const modalAlreadyShowed = k.get("modal-mission");
  const modalMapShowed = k.get("modal-map");

  if (modalAlreadyShowed.length > 0 || modalMapShowed.length > 0) return;

  const modalWidth = 800;
  const modalHeight = 400;
  const currMission = gameState.getCurrMission();
  let textModal = "";

  if (currMission == null) {
    textModal =
      "Anda belum mempunyai misi, pergi ke kota dan bicara kepada tetua untuk mendapatkan misi.";
  }

  if (currMission == 1) {
    textModal =
      "Pergi ke hutan barat dan kalahkan monster, laporkan kepada tetua di kota jika sudah berhasil mengalahkan monster!";
  }

  if (currMission == 2) {
    textModal =
      "Pergi ke hutan utara dan kalahkan monster, laporkan kepada tetua di kota jika sudah berhasil mengalahkan monster!";
  }

  if (currMission == 3) {
    textModal =
      "Pergi ke hutan selatan dan kalahkan monster, laporkan kepada tetua di kota jika sudah berhasil mengalahkan monster!";
  }

  const modal = k.add([
    k.rect(modalWidth, modalHeight),
    k.pos((k.width() - modalWidth) / 2, (k.height() - modalHeight) / 2),
    k.color(0, 0, 0),
    k.fixed(),
    k.opacity(0.5),
    "modal-mission",
  ]);

  gameState.setFreezePlayer(true);

  modal.add([
    k.text(textModal, { size: 32, width: 780, align: "center" }),
    k.color(255, 255, 255),
    k.pos(10, 80),
  ]);

  modal.add([
    k.text("Tekan 'Enter' untuk menutup", {
      size: 32,
      width: 780,
      align: "center",
    }),
    k.color(255, 255, 255),
    k.pos(10, 300),
  ]);

  k.onKeyPress("enter", () => {
    k.destroyAll("modal-mission");
    gameState.setFreezePlayer(false);
  });
}

function showModalMap(k) {
  const modalAlreadyShowed = k.get("modal-mission");
  const modalMapShowed = k.get("modal-map");

  if (modalAlreadyShowed.length > 0 || modalMapShowed.length > 0) return;

  const currScene = gameState.getCurrScene();

  const modalWidth = 375 * 2.5;
  const modalHeight = 375 * 2;

  const modal = k.add([
    k.rect(modalWidth, modalHeight),
    k.pos((k.width() - modalWidth) / 2, (k.height() - modalHeight) / 2),
    k.color(0, 0, 0),
    k.fixed(),
    k.opacity(0),
    "modal-map",
  ]);

  modal.add([k.sprite("map-" + currScene), k.scale(1.5), k.pos(0, 0)]);

  gameState.setFreezePlayer(true);

  modal.add([
    k.text("Tekan 'Enter' untuk menutup", {
      size: 32,
      width: 780,
      align: "center",
    }),
    k.color(0, 0, 0),
    k.pos(100, 600),
  ]);

  k.onKeyPress("enter", () => {
    k.destroyAll("modal-map");
    gameState.setFreezePlayer(false);
  });
}

export function generateIconsComponents(k) {
  const iconsContainer = k.add([
    k.pos(k.width() - 70, 20),
    k.fixed(),
    "iconsContainer",
  ]);
  const playerCoin = playerState.getCoin();
  const playerPoint = playerState.getPoint();

  const iconData = [
    {
      sprite: "quest-icon",
      text: "Misi",
      pos: k.vec2(0, 0),
      scale: 2.5,
      textPosition: {
        x: -5,
        y: 60,
      },
      tag: "quest",
    },
    {
      sprite: "shop-icon",
      text: "Toko",
      pos: k.vec2(0, 240),
      scale: 1,
      textPosition: {
        x: -5,
        y: 60,
      },
      tag: "shop",
    },
    {
      sprite: "coin-icon",
      text: playerCoin,
      pos: k.vec2(-120, 5),
      scale: 0.8,
      textPosition: {
        x: 60,
        y: 12,
      },
      tag: "coin",
    },
    {
      sprite: "trophy-icon",
      text: playerPoint,
      pos: k.vec2(-240, 5),
      scale: 1,
      textPosition: {
        x: 60,
        y: 12,
      },
      tag: "trophy",
    },
    {
      sprite: "map-icon",
      text: "Peta",
      pos: k.vec2(0, 120),
      scale: 2.5,
      textPosition: {
        x: -5,
        y: 60,
      },
      tag: "map",
    },
  ];

  iconData.forEach((icon) => {
    iconsContainer.add([
      k.sprite(icon.sprite),
      k.pos(icon.pos),
      k.scale(icon.scale),
      k.area(),
      icon.tag,
    ]);

    iconsContainer.add([
      k.text(icon.text, { size: 24 }),
      k.pos(icon.pos.add(k.vec2(icon.textPosition.x, icon.textPosition.y))),
      k.color(255, 255, 255),
    ]);

    // Interaksi Quest
    k.onClick("quest", () => {
      const modalAlreadyShowed = k.get("modal-mission");
      const modalMapShowed = k.get("modal-map");

      if (modalAlreadyShowed.length > 0 || modalMapShowed.length > 0) return;

      playClickEffect();
      showModalMission(k);
    });

    k.onHover("quest", () => {
      document.body.style.cursor = "pointer";
      document.body.getElementsByTagName("canvas")[0].style.cursor = "pointer";
    });

    k.onHoverEnd("quest", () => {
      document.body.style.cursor = "default";
      document.body.getElementsByTagName("canvas")[0].style.cursor = "default";
    });

    // Interaksi Map
    k.onClick("map", () => {
      const modalAlreadyShowed = k.get("modal-mission");
      const modalMapShowed = k.get("modal-map");

      if (modalAlreadyShowed.length > 0 || modalMapShowed.length > 0) return;

      playClickEffect();
      showModalMap(k);
    });

    k.onHover("map", () => {
      document.body.style.cursor = "pointer";
      document.body.getElementsByTagName("canvas")[0].style.cursor = "pointer";
    });

    k.onHoverEnd("map", () => {
      document.body.style.cursor = "default";
      document.body.getElementsByTagName("canvas")[0].style.cursor = "default";
    });
  });
}

export function generateInventoryBarComponents(k) {
  const inventoryBarContainer = k.add([
    k.pos(20, k.height() - 90),
    k.fixed(),
    "inventoryBarContainer",
  ]);

  const inventoryBarSprite = inventoryBarContainer.add([
    k.sprite("inventory_bar"),
    k.pos(0, 0),
    k.area(),
    k.scale(2),
    "inventory_bar",
  ]);

  k.onHover(inventoryBarSprite, () => {
    document.body.style.cursor = "pointer";
    document.body.getElementsByTagName("canvas")[0].style.cursor = "pointer";
  });

  k.onHoverEnd(inventoryBarSprite, () => {
    document.body.style.cursor = "default";
    document.body.getElementsByTagName("canvas")[0].style.cursor = "default";
  });
}
