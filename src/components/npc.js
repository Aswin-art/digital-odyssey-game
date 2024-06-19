import { playAnimIfNotPlaying } from "../../utils.js";
import npcLines from "../contents/NPCDialogue.js";
import { gameState, NPCState, playerState } from "../states/index.js";
import { dialogue } from "../states/dialogue.js";

export function generateNPCComponents(k, pos) {
  return [
    k.sprite("assets", {
      anim: "oldman-down",
    }),
    k.area({ shape: new k.Rect(k.vec2(2, 4), 12, 12) }),
    k.body({ isStatic: true }),
    k.pos(pos),
    "npc",
  ];
}

export async function startInteraction(k, npc, player) {
  if (player.direction === "left") {
    npc.flipX = true;
    playAnimIfNotPlaying(npc, "oldman-side");
  }

  if (player.direction === "right") {
    npc.flipX = false;
    playAnimIfNotPlaying(npc, "oldman-side");
  }

  if (player.direction === "down") {
    playAnimIfNotPlaying(npc, "oldman-up");
  }

  if (player.direction === "up") {
    playAnimIfNotPlaying(npc, "oldman-down");
  }

  let currMission = gameState.getCurrMission();

  if (
    currMission == null ||
    (gameState.getCurrMission() == 1 && !gameState.getMonster1())
  ) {
    gameState.setCurrMission(1);
    const responses = npcLines["misi1"];
    currMission = 1;

    let numberTalked = NPCState.getNumberTalkedOldMan();
    if (numberTalked >= 3) {
      NPCState.setNumberTalkedOldMan(1);
      numberTalked = NPCState.getNumberTalkedOldMan();
    }

    if (responses[numberTalked]) {
      await dialogue(
        k,
        k.vec2(k.width() / 2 - 500 / 2 - 100, k.height() - 250),
        responses[numberTalked]
      );
      NPCState.setNumberTalkedOldMan(numberTalked + 1);
    }
  }

  if (
    (gameState.getCurrMission() == 1 && gameState.getMonster1()) ||
    (gameState.getCurrMission() == 2 && !gameState.getMonster2())
  ) {
    if (gameState.getCurrMission() == 1 && gameState.getMonster1()) {
      playerState.addCoin(30);
    }
    gameState.setCurrMission(2);
    currMission = 2;
    const responses = npcLines["misi2"];

    let numberTalked = NPCState.getNumberTalkedOldMan();
    if (numberTalked >= 3) {
      NPCState.setNumberTalkedOldMan(1);
      numberTalked = NPCState.getNumberTalkedOldMan();
    }

    if (responses[numberTalked]) {
      await dialogue(
        k,
        k.vec2(k.width() / 2 - 500 / 2 - 100, k.height() - 250),
        responses[numberTalked]
      );
      NPCState.setNumberTalkedOldMan(numberTalked + 1);
    }
  }

  if (
    (gameState.getCurrMission() == 2 && gameState.getMonster2()) ||
    (gameState.getCurrMission() == 3 && !gameState.getMonster3())
  ) {
    if (gameState.getCurrMission() == 2 && gameState.getMonster2()) {
      playerState.addCoin(35);
    }
    gameState.setCurrMission(3);
    const responses = npcLines["misi3"];

    let numberTalked = NPCState.getNumberTalkedOldMan();
    if (numberTalked >= 3) {
      NPCState.setNumberTalkedOldMan(1);
      numberTalked = NPCState.getNumberTalkedOldMan();
    }

    if (responses[numberTalked]) {
      await dialogue(
        k,
        k.vec2(k.width() / 2 - 500 / 2 - 100, k.height() - 250),
        responses[numberTalked]
      );
      NPCState.setNumberTalkedOldMan(numberTalked + 1);
    }
  }

  if (
    (gameState.getCurrMission() == 3 && gameState.getMonster3()) ||
    (gameState.getCurrMission() == 4 && !gameState.getBoss())
  ) {
    if (gameState.getCurrMission() == 3 && gameState.getMonster3()) {
      playerState.addCoin(35);
    }
    gameState.setCurrMission(4);
    const responses = npcLines["misi4"];

    let numberTalked = NPCState.getNumberTalkedOldMan();
    if (numberTalked >= 3) {
      NPCState.setNumberTalkedOldMan(1);
      numberTalked = NPCState.getNumberTalkedOldMan();
    }

    if (responses[numberTalked]) {
      await dialogue(
        k,
        k.vec2(k.width() / 2 - 500 / 2 - 100, k.height() - 250),
        responses[numberTalked]
      );
      NPCState.setNumberTalkedOldMan(numberTalked + 1);
    }
  }

  if (gameState.getCurrMission() == 4 && gameState.getBoss()) {
    playerState.addCoin(50);
    const responses = npcLines["congratulate"];

    let numberTalked = NPCState.getNumberTalkedOldMan();
    if (numberTalked >= 3) {
      NPCState.setNumberTalkedOldMan(1);
      numberTalked = NPCState.getNumberTalkedOldMan();
    }

    if (responses[numberTalked]) {
      await dialogue(
        k,
        k.vec2(k.width() / 2 - 500 / 2 - 100, k.height() - 250),
        responses[numberTalked],
        "win"
      );
      NPCState.setNumberTalkedOldMan(numberTalked + 1);
    }
  }
}

export function endInteraction(oldman) {
  playAnimIfNotPlaying(oldman, "oldman-down");
}
