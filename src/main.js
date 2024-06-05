import kaboom from "kaboom";
import world from "./scenes/world";
import house from "./scenes/house";
import halaman from "./scenes/halaman";
import hutanKiri from "./scenes/hutanKiri";
import village from "./scenes/village";
import bos from "./scenes/bos";
import battle from "./scenes/battle";
import hutanAtas from "./scenes/hutanAtas";
import hutanBawah from "./scenes/hutanBawah";

const k = kaboom({
  width: window.innerWidth,
  height: window.innerHeight,
  letterbox: true,
  global: false,
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

k.loadSprite("backpack", "/assets/images/backpack.png");

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
    height: 72,
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
    height: 70,
  },
});

k.add([k.pos(100, 500), k.fixed(), "backpack"]);

const scenes = {
  world,
  house,
  halaman,
  hutanKiri,
  hutanAtas,
  hutanBawah,
  village,
  bos,
  battle,
};

for (const sceneName in scenes) {
  k.scene(sceneName, () => scenes[sceneName](k));
}

k.go("halaman");
