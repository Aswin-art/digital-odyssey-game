import { gameState } from "../states";

let backgroundMusic = null;
let footstepEffect = null;
let attackEffect = null;
let typingEffect = null;
let clickEffect = null;
let notAllowedEffect = null;
let selectEffect = null;

export function playBackgroundMusic() {
  const theme = gameState.getSoundTheme();

  if (backgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }

  backgroundMusic = new Audio();

  if (theme === "explore") {
    backgroundMusic.src = "/assets/sounds/background-music.mp3";
    backgroundMusic.volume = 0.7;
  } else if (theme === "battle-monster") {
    backgroundMusic.src = "/assets/sounds/battle-monster.mp3";
    backgroundMusic.volume = 0.5;
  } else if (theme === "battle-boss") {
    backgroundMusic.src = "/assets/sounds/battle-boss.mp3";
    backgroundMusic.volume = 0.7;
  }

  backgroundMusic.loop = true;
  backgroundMusic.play();
}

export function stopBackgroundMusic() {
  if (backgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }
}

export function playFootstepEffect(state = false) {
  if (!footstepEffect) {
    footstepEffect = new Audio("/assets/sounds/walk.mp3");
    footstepEffect.volume = 1;
    footstepEffect.loop = true;
  }

  if (state) {
    footstepEffect.play();
  } else {
    footstepEffect.pause();
    footstepEffect.currentTime = 0;
  }
}

export function playAttackEffect() {
  attackEffect = new Audio("/assets/sounds/attack.wav");
  attackEffect.volume = 1;

  attackEffect.play();
}

export function playTypingEffect() {
  typingEffect = new Audio("/assets/sounds/typing-sound.mp3");
  typingEffect.volume = 1;
  typingEffect.loop = true;

  typingEffect.play();
}

export function stopTypingEffect() {
  typingEffect.pause();
  typingEffect.currentTime = 0;
}

export function playClickEffect() {
  clickEffect = new Audio("/assets/sounds/click.wav");
  clickEffect.volume = 1;

  clickEffect.play();
}

export function playNotAllowedEffect() {
  notAllowedEffect = new Audio("/assets/sounds/not-allowed.mp3");
  notAllowedEffect.volume = 1;

  notAllowedEffect.play();
}

export function playSelectEffect() {
  selectEffect = new Audio("/assets/sounds/select-answer.mp3");
  selectEffect.volume = 1;

  selectEffect.play();
}
