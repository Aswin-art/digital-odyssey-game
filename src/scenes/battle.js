import { colorizeBackground } from "../../utils.js";
import {
  playAttackEffect,
  playBackgroundMusic,
  playSelectEffect,
} from "../components/backgroundMusic.js";
import { gameState, NPCState, playerState } from "../states/index.js";
import { Player } from "../components/player.js";
import { Monster } from "../components/monster.js"; // Import Monster class

const playerMaxHealth = playerState.getMaxHealth();
let playerHealth = playerState.getHealth();

export default async function battle(k) {
  colorizeBackground(k, 27, 29, 52);
  gameState.setSoundTheme("battle-boss");
  playBackgroundMusic();

  const screenWidth = k.width();
  const screenHeight = k.height();
  const scale = screenWidth / 1920;
  const battleBgWidth = 1550 * scale;
  const battleBgHeight = 400 * scale;

  let enemyMon = null;
  let enemyLabel = "MONSTER";

  const map = k.add([
    k.sprite("battle-background"),
    k.scale(scale * 1.5),
    k.pos(
      screenWidth / 2 - battleBgWidth / 2,
      screenHeight / 2 - battleBgHeight
    ),
  ]);

  if (gameState.getPreviousScene() == "boss") {
    enemyLabel = "BOSS MONSTER";

    enemyMon = k.add([
      k.sprite("boss-monster"),
      k.scale(scale * 0.6),
      k.pos(screenWidth - scale * 1000, screenHeight - scale * 850),
      k.opacity(1),
      {
        fainted: false,
      },
    ]);

    k.tween(
      enemyMon.pos.x,
      screenWidth - scale * 600,
      0.3,
      (val) => (enemyMon.pos.x = val),
      k.easings.easeInSine
    );
  } else {
    enemyMon = k.add([
      k.sprite("assets", {
        anim: "slime-idle-down",
      }),
      k.scale(scale * 8),
      k.pos(screenWidth - scale * 1000, screenHeight - scale * 700),
      k.opacity(1),
      {
        fainted: false,
      },
    ]);

    enemyMon.flipX = true;

    k.tween(
      enemyMon.pos.x,
      screenWidth - scale * 500,
      0.3,
      (val) => (enemyMon.pos.x = val),
      k.easings.easeInSine
    );
  }

  const playerMon = k.add([
    k.sprite("assets", {
      anim: "player-idle-up",
    }),
    k.scale(scale * 10),
    k.pos(scale * 300, screenHeight - scale * 450),
    k.opacity(1),
    {
      fainted: false,
    },
  ]);

  k.tween(
    playerMon.pos.x,
    scale * 600,
    0.3,
    (val) => (playerMon.pos.x = val),
    k.easings.easeInSine
  );

  const playerMonHealthBox = map.add([
    k.rect(scale * 300, scale * 80),
    k.outline(scale * 4),
    k.pos(scale * 100, screenHeight - scale * 650),
  ]);

  playerMonHealthBox.add([
    k.text("PLAYER", { size: scale * 24, width: scale * 200 }),
    k.color(10, 10, 10),
    k.pos(scale * 10, scale * 10),
  ]);

  playerMonHealthBox.add([
    k.rect(scale * 270, scale * 10),
    k.color(200, 200, 200),
    k.pos(scale * 15, scale * 50),
  ]);

  const playerMonHealthBar = playerMonHealthBox.add([
    k.rect((playerHealth / playerMaxHealth) * scale * 270, scale * 10),
    k.color(0, 200, 0),
    k.pos(scale * 15, scale * 50),
    k.fixed(),
  ]);

  k.tween(
    playerMonHealthBox.pos.x,
    screenWidth - scale * 1280,
    0.3,
    (val) => (playerMonHealthBox.pos.x = val),
    k.easings.easeInSine
  );

  const enemyMonHealthBox = map.add([
    k.rect(scale * 300, scale * 80),
    k.outline(scale * 4),
    k.pos(-scale * 200, screenHeight - scale * 900),
  ]);

  enemyMonHealthBox.add([
    k.text(enemyLabel, { size: scale * 24, width: scale * 200 }),
    k.color(10, 10, 10),
    k.pos(scale * 10, scale * 10),
  ]);

  enemyMonHealthBox.add([
    k.rect(scale * 270, scale * 10),
    k.color(200, 200, 200),
    k.pos(scale * 15, scale * 50),
  ]);

  const enemyMonHealthBar = enemyMonHealthBox.add([
    k.rect(scale * 270, scale * 10),
    k.color(0, 200, 0),
    k.pos(scale * 15, scale * 50),
  ]);

  k.tween(
    enemyMonHealthBox.pos.x,
    screenWidth - scale * 1850,
    0.3,
    (val) => (enemyMonHealthBox.pos.x = val),
    k.easings.easeInSine
  );

  const box = k.add([
    k.rect(scale * 1300, scale * 300),
    k.outline(scale * 4),
    k.pos(scale * 300, scale * 650),
  ]);

  const content = box.add([
    k.text(
      "Kalahkan monster dengan memilih jawaban yang tepat! Tekan 'Enter' untuk memulai dan tekan 'Spasi' untuk menjawab.",
      { size: scale * 32, width: scale * 1260 }
    ),
    k.color(10, 10, 10),
    k.pos(scale * 20, scale * 20),
  ]);

  const timerContainer = k.add([
    k.rect(scale * 1535, scale * 30),
    k.pos(screenWidth / 2 - (scale * 1535) / 2 - 5, screenHeight - scale * 900),
    k.outline(scale * 2),
  ]);
  const timerBar = timerContainer.add([
    k.rect(scale * 1535, scale * 30),
    k.color(0, 200, 0),
  ]);
  const timerText = timerContainer.add([
    k.text(`Time: 30`, { size: scale * 24 }),
    k.color(10, 10, 10),
    k.pos(scale * 750, scale * 5),
  ]);

  const questions = [
    {
      question:
        "Fungsi logika F(A, B) = A + B dalam bentuk kanonik POS adalah:",
      answers: [
        "(A + B)(A' + B)",
        "(A + B)(A + B')",
        "(A' + B)(A + B')",
        "(A' + B')(A + B')",
      ],
      correct: 1,
    },
    {
      question:
        "Fungsi logika F(A, B, C) = AB + AC dalam bentuk kanonik SOP adalah:",
      answers: [
        "ABC + ABC'",
        "AB'C' + AB'C + ABC",
        "A'BC + AB'C + ABC",
        "A'B'C + A'BC + AB'C",
      ],
      correct: 0,
    },
  ];

  let currentQuestionIndex = 0;
  let selectedAnswerIndex = 0;
  let phase = "intro";
  let answerElements = [];
  let timer = 30;
  let timerInterval;

  const player = new Player(k); // Create Player instance
  const monster = new Monster(k); // Create Monster instance

  function startTimer() {
    timer = 30;
    timerText.text = `Time: ${timer}`;
    timerBar.width = 1535;

    timerInterval = setInterval(() => {
      if (phase !== "question") {
        clearInterval(timerInterval);
        return;
      }
      timer--;
      timerText.text = `Time: ${timer}`;
      timerBar.width = (timer / 30) * 1535;
      if (timer <= 0) {
        clearInterval(timerInterval);
        monster.handleIncorrectAnswer(playerMonHealthBar, playerMon);
      }
    }, 1000);
  }

  function displayQuestion() {
    if (phase === "end") return;
    const question = questions[currentQuestionIndex];
    content.text = question.question;

    answerElements.forEach((element) => element.destroy());
    answerElements = [];

    question.answers.forEach((answer, index) => {
      const answerElement = box.add([
        k.text(answer, { size: 32, width: 1260 }),
        k.color(index === selectedAnswerIndex ? 255 : 10, 10, 10),
        k.pos(20, 80 + index * 40),
        { tag: "answers" },
      ]);
      answerElements.push(answerElement);
    });
  }

  function showGameOverModal(text) {
    const modal = k.add([
      k.rect(600, 300),
      k.pos(k.width() / 2 - 300, k.height() / 2 - 150),
      k.color(0, 0, 0),
      k.opacity(0.8),
      k.fixed(),
      "gameOverModal",
    ]);

    modal.add([
      k.text(text, { size: 32, width: 580, align: "center" }),
      k.color(255, 255, 255),
      k.pos(20, 100),
      k.fixed(),
    ]);

    modal.add([
      k.text("Tekan 'Enter' untuk kembali!", {
        size: 32,
        width: 580,
        align: "center",
      }),
      k.color(255, 255, 255),
      k.pos(20, 200),
      k.fixed(),
    ]);
  }

  k.onKeyPress("enter", () => {
    if (phase === "intro") {
      phase = "question";
      displayQuestion();
      startTimer();
    }

    if (phase === "end") {
      gameState.setFreezePlayer(false);
      gameState.setSoundTheme("explore");
      playBackgroundMusic();

      if (playerState.getHealth() > 0) {
        k.go(gameState.getPreviousScene());
      } else {
        k.go("gameover");
      }
    }
  });

  k.onKeyPress("up", () => {
    if (phase !== "question") return;
    playSelectEffect();
    selectedAnswerIndex =
      (selectedAnswerIndex -
        1 +
        questions[currentQuestionIndex].answers.length) %
      questions[currentQuestionIndex].answers.length;
    displayQuestion();
  });

  k.onKeyPress("down", () => {
    if (phase !== "question") return;
    playSelectEffect();
    selectedAnswerIndex =
      (selectedAnswerIndex + 1) %
      questions[currentQuestionIndex].answers.length;
    displayQuestion();
  });

  k.onKeyPress("space", () => {
    if (phase !== "question") return;

    if (selectedAnswerIndex === questions[currentQuestionIndex].correct) {
      player.handleCorrectAnswer(enemyMonHealthBar, enemyMon);
    } else {
      monster.handleIncorrectAnswer(playerMonHealthBar, playerMon);
    }
  });

  k.onUpdate(() => {
    if (enemyMonHealthBar.width <= 0 && !enemyMon.fainted) {
      if (gameState.getPreviousScene() == "hutanKiri") {
        NPCState.setNumberTalkedOldMan(0);
        gameState.setMonster1Defeated(true);
        gameState.setMission1Done(true);
        playerState.addCoin(20);
      }
      if (gameState.getPreviousScene() == "hutanAtas") {
        NPCState.setNumberTalkedOldMan(0);
        gameState.setMonster2Defeated(true);
        gameState.setMission2Done(true);
        playerState.addCoin(20);
      }
      if (gameState.getPreviousScene() == "hutanBawah") {
        NPCState.setNumberTalkedOldMan(0);
        gameState.setMonster3Defeated(true);
        gameState.setMission3Done(true);
        playerState.addCoin(20);
      }
      if (gameState.getPreviousScene() == "boss") {
        NPCState.setNumberTalkedOldMan(0);
        gameState.setBossDefeated(true);
        gameState.setMission4Done(true);
        playerState.addCoin(30);
      }
      makeMonDrop(enemyMon);
      showGameOverModal("Monster kalah! Kamu memenangkan pertandingan!");
      enemyMon.fainted = true;
      phase = "end";
      k.destroyAll("answers");
    }

    if (playerState.getHealth() <= 0 && !playerMon.fainted) {
      makeMonDrop(playerMon);
      showGameOverModal("Kamu kalah! Jawab pertanyaan dengan benar!");
      playerMon.fainted = true;
      phase = "end";
      k.destroyAll("answers");
    }
  });
}
