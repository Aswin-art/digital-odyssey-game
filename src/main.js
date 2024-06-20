import kaboom from "kaboom";
import house from "./views/house";
import halaman from "./views/halaman";
import hutanKiri from "./views/hutanKiri";
import village from "./views/village";
import battle from "./views/battle";
import hutanAtas from "./views/hutanAtas";
import hutanBawah from "./views/hutanBawah";
import boss from "./views/boss";
import menu from "./views/menu";
import gameover from "./views/gameover";

const k = kaboom({
  width: window.innerWidth,
  height: window.innerHeight,
  letterbox: true,
  global: false,
  loadingScreen: false,
  fullscreen: true,
});

// memuat font
k.loadFont("gameboy", "/assets/fonts/gb.ttf");

// memuat asset gambar
k.loadSprite("assets", "/assets/images/topdownasset.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "player-idle-down": 936,
    "player-down": {
      from: 936,
      to: 939,
      loop: true,
    },
    "player-idle-side": 976,
    "player-side": {
      from: 976,
      to: 978,
      loop: true,
    },
    "player-idle-up": 1014,
    "player-up": {
      from: 1014,
      to: 1017,
      loop: true,
    },
    "player-attack-up": 1094,
    "player-attack-down": 1092,
    "player-attack-left": 1093,
    "player-attack-right": 1093,
    "slime-idle-side": 860,
    "slime-side": {
      from: 860,
      to: 861,
      loop: true,
    },
    "slime-idle-down": 858,
    "slime-down": {
      from: 858,
      to: 859,
      loop: true,
    },
    "slime-idle-up": 897,
    "slime-up": {
      from: 897,
      to: 898,
      loop: true,
    },
    "oldman-up": 905,
    "oldman-side": 907,
    "oldman-down": 866,
    "ghost-down": {
      from: 862,
      to: 863,
      loop: true,
    },
  },
});

k.loadSprite("topdown-assets", "/assets/images/tilesheet2.png", {
  sliceX: 20,
  sliceY: 98,
});

k.loadSprite("battle-background", "/assets/images/battleBackground.png");

// memuat asset heart (nyawa)
k.loadSpriteAtlas("/assets/images/topdownasset.png", {
  "full-heart": {
    x: 0,
    y: 224,
    width: 48,
    height: 48,
  },
  "half-heart": {
    x: 48,
    y: 224,
    width: 48,
    height: 48,
  },
  "empty-heart": {
    x: 96,
    y: 224,
    width: 48,
    height: 48,
  },
});

// memuat asset keys (arrow key)
k.loadSpriteAtlas("/assets/images/keys.png", {
  "arrow-up": {
    x: 28,
    y: 30,
    width: 75,
    height: 75,
  },
  "arrow-right": {
    x: 318,
    y: 33,
    width: 72,
    height: 68,
  },
  "arrow-left": {
    x: 220,
    y: 30,
    width: 75,
    height: 75,
  },
  "arrow-down": {
    x: 127,
    y: 33,
    width: 72,
    height: 68,
  },
});

// memuat asset keys (space key)
k.loadSpriteAtlas("/assets/images/important_key.png", {
  space: {
    x: 175,
    y: 93,
    width: 75,
    height: 32,
  },
});

// memuat asset icons (quest, map)
k.loadSpriteAtlas("/assets/images/items.png", {
  "quest-icon": {
    x: 6,
    y: 71,
    width: 21,
    height: 21,
  },
  "map-icon": {
    x: 6,
    y: 365,
    width: 21,
    height: 21,
  },
});

// memuat asset icons (coin, shop)
k.loadSpriteAtlas("/assets/images/general.png", {
  "shop-icon": {
    x: 45,
    y: 45,
    width: 50,
    height: 45,
  },
  "coin-icon": {
    x: 228,
    y: 38,
    width: 52,
    height: 50,
  },
});

// memuat asset icons (musics)
k.loadSpriteAtlas("/assets/images/barsheet.png", {
  "trophy-icon": {
    x: 865,
    y: 55,
    width: 44,
    height: 40,
  },
});

// memuat asset inventory bar
k.loadSprite("inventory_bar", "/assets/images/inventory_bar.png");

// memuat asset inventory
k.loadSprite("inventory", "/assets/images/inventory.png");

// Memuat asset preview map (halaman)
k.loadSprite("map-halaman", "/assets/map/map-halaman.png");

// Memuat asset preview map (hutan-kiri)
k.loadSprite("map-hutan-kiri", "/assets/map/map-hutan-kiri.png");

// Memuat asset preview map (hutan-atas)
k.loadSprite("map-hutan-atas", "/assets/map/map-hutan-atas.png");

// Memuat asset preview map (hutan-bawah)
k.loadSprite("map-hutan-bawah", "/assets/map/map-hutan-bawah.png");

// Memuat asset preview map (village)
k.loadSprite("map-village", "/assets/map/map-village.png");

// Memuat asset preview map (boss)
k.loadSprite("map-boss", "/assets/map/map-boss.png");

// memuat asset boss
k.loadSpriteAtlas("/assets/images/boss.png", {
  "boss-monster": {
    x: 360,
    y: 360,
    width: 400,
    height: 500,
  },
});

const scenes = {
  house,
  halaman,
  hutanKiri,
  hutanAtas,
  hutanBawah,
  village,
  boss,
  battle,
  menu,
  gameover,
};

for (const sceneName in scenes) {
  k.scene(sceneName, (args) => scenes[sceneName](k, args));
}

k.load(
  new Promise((res) => {
    setTimeout(() => {
      res();
    }, 1000);
  })
);

k.onLoading((progress) => {
  k.drawRect({
    width: k.width(),
    height: k.height(),
    color: k.rgb(0, 0, 0),
  });

  k.drawCircle({
    pos: k.center(),
    radius: 32,
    end: k.map(progress, 0, 1, 0, 360),
  });

  k.drawText({
    text: "loading" + ".".repeat(k.wave(1, 4, k.time() * 12)),
    font: "monospace",
    size: 24,
    anchor: "center",
    pos: k.center().add(0, 70),
  });
});

k.go("menu");
