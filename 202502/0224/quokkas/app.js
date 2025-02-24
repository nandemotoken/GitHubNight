// DOM環境のモック作成（Quokka用）を更新
const createMockDocument = () => {
  if (typeof document === "undefined") {
    // モックのcanvasコンテキストを作成
    const mockContext = {
      clearRect: () => {},
      fillRect: () => {},
      fillText: () => {},
      beginPath: () => {},
      arc: () => {},
      fill: () => {},
      fillStyle: "",
      font: "",
    };

    global.document = {
      createElement: (tag) => {
        if (tag === "canvas") {
          return {
            addEventListener: () => {},
            setAttribute: () => {},
            appendChild: () => {},
            getContext: () => mockContext,
            width: GAME_CONFIG.width,
            height: GAME_CONFIG.height,
          };
        }
        return {
          addEventListener: () => {},
          setAttribute: () => {},
          appendChild: () => {},
          querySelector: () => ({
            textContent: "",
          }),
          textContent: "",
        };
      },
      createTextNode: (text) => ({ text }),
      addEventListener: () => {},
      getElementById: () => ({
        appendChild: () => {},
      }),
    };

    // localStorage のモックも追加
    global.localStorage = {
      getItem: () => null,
      setItem: () => {},
    };
  }
  return document;
};

// Quokka環境でモックドキュメントを初期化
createMockDocument();

// DOM操作のためのヘルパー関数
const createElement = (tag, props = {}, ...children) => {
  const element = document.createElement(tag);

  // プロパティの設定
  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith("on")) {
      // イベントリスナーの追加
      element.addEventListener(key.toLowerCase().slice(2), value);
    } else {
      // 通常の属性の設定
      element.setAttribute(key, value);
    }
  });

  // 子要素の追加
  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
};

// カウンターコンポーネントの作成
class Counter {
  constructor(initialCount = 0) {
    this.count = initialCount;
    this.element = this.render();
  }

  increment() {
    this.count++;
    this.update();
  }

  update() {
    const countDisplay = this.element.querySelector(".count");
    countDisplay.textContent = this.count;
  }

  render() {
    return createElement(
      "div",
      { class: "counter" },
      createElement("span", { class: "count" }, this.count.toString()),
      createElement(
        "button",
        {
          onClick: () => this.increment(),
          style: "margin-left: 10px;",
        },
        "+"
      )
    );
  }
}

// ゲームの定数を更新
const GAME_CONFIG = {
  width: 800,
  height: 400,
  gravity: 0.5,
  jumpForce: -12,
  playerSpeed: 5,
  obstacleSpeed: 5,
  obstacleInterval: 1500, // 障害物の出現間隔を短縮
  pitPosition: 400, // 落とし穴のx座標
  pitWidth: 100, // 落とし穴の幅
  obstacleTypes: ["straight", "sine", "bounce", "chase"], // 障害物の種類
  sineAmplitude: 100, // サイン波の振幅
  sineSpeed: 0.05, // サイン波の速度
  bounceSpeed: 3, // バウンド速度
  chaseSpeed: 3, // 追尾速度
  enemyPosition: {
    x: 750, // 右端近く
    y: 350, // 地面近く
  },
  bulletSpeed: 7,
  bulletSize: 5,
  fireRate: 1000, // 発射間隔（ミリ秒）
};

// プレイヤークラスを更新
class Player {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = 50;
    this.y = GAME_CONFIG.height - 50;
    this.width = 30;
    this.height = 30;
    this.velocityY = 0;
    this.isJumping = false;
    this.jumpCount = 0;
    this.moveDirection = 0;
    this.isDead = false;
  }

  update() {
    if (this.isDead) return;

    this.velocityY += GAME_CONFIG.gravity;
    this.y += this.velocityY;

    // 地面との衝突判定（落とし穴を考慮）
    const isOverPit =
      this.x + this.width > GAME_CONFIG.pitPosition &&
      this.x < GAME_CONFIG.pitPosition + GAME_CONFIG.pitWidth;

    if (this.y > GAME_CONFIG.height - this.height && !isOverPit) {
      this.y = GAME_CONFIG.height - this.height;
      this.velocityY = 0;
      this.isJumping = false;
      this.jumpCount = 0;
    }

    // 落とし穴に落ちた場合
    if (isOverPit && this.y > GAME_CONFIG.height) {
      this.isDead = true;
    }

    this.x += this.moveDirection * GAME_CONFIG.playerSpeed;
    if (this.x < 0) this.x = 0;
    if (this.x > GAME_CONFIG.width - this.width) {
      this.x = GAME_CONFIG.width - this.width;
    }
  }

  jump() {
    if (this.jumpCount < 2) {
      this.velocityY = GAME_CONFIG.jumpForce;
      this.isJumping = true;
      this.jumpCount++;
    }
  }
}

// 基本の障害物クラスを更新
class Obstacle {
  constructor(y, type) {
    this.x = GAME_CONFIG.width;
    this.y = y;
    this.initialY = y;
    this.width = 20;
    this.height = 20;
    this.speed = GAME_CONFIG.obstacleSpeed;
    this.type = type;
    this.time = 0;

    // タイプ別の色を設定
    this.colors = {
      straight: "orange",
      sine: "purple",
      bounce: "red",
      chase: "yellow",
    };
  }

  update(playerY) {
    this.time += 1;
    this.x -= this.speed;

    switch (this.type) {
      case "sine":
        // サイン波で上下に動く
        this.y =
          this.initialY +
          Math.sin(this.time * GAME_CONFIG.sineSpeed) *
            GAME_CONFIG.sineAmplitude;
        break;
      case "bounce":
        // 上下にバウンドする
        this.y += GAME_CONFIG.bounceSpeed * (this.bounceUp ? -1 : 1);
        if (this.y < 0 || this.y > GAME_CONFIG.height - this.height) {
          this.bounceUp = !this.bounceUp;
        }
        break;
      case "chase":
        // プレイヤーを追尾する
        if (playerY > this.y) this.y += GAME_CONFIG.chaseSpeed;
        if (playerY < this.y) this.y -= GAME_CONFIG.chaseSpeed;
        break;
    }

    return this.x + this.width < 0;
  }

  draw(ctx) {
    ctx.fillStyle = this.colors[this.type];
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// 弾丸クラスを追加
class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = GAME_CONFIG.bulletSize;
    this.height = GAME_CONFIG.bulletSize;
    this.speed = GAME_CONFIG.bulletSpeed;
  }

  update() {
    this.x -= this.speed;
    return this.x + this.width < 0;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 敵クラスを追加
class Enemy {
  constructor() {
    this.x = GAME_CONFIG.enemyPosition.x;
    this.y = GAME_CONFIG.enemyPosition.y;
    this.width = 30;
    this.height = 40;
    this.lastFireTime = 0;
    this.bullets = [];
  }

  update() {
    const now = Date.now();
    // 一定間隔で発射
    if (now - this.lastFireTime > GAME_CONFIG.fireRate) {
      this.fire();
      this.lastFireTime = now;
    }

    // 弾丸の更新と画面外に出たものの削除
    this.bullets = this.bullets.filter((bullet) => !bullet.update());
  }

  fire() {
    // 銃口の位置から弾を発射
    const bulletX = this.x;
    const bulletY = this.y + this.height / 2;
    this.bullets.push(new Bullet(bulletX, bulletY));
  }

  draw(ctx) {
    // 敵の描画
    ctx.fillStyle = "darkred";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // 銃の描画
    ctx.fillStyle = "black";
    ctx.fillRect(this.x - 10, this.y + this.height / 2 - 5, 15, 10);

    // 弾丸の描画
    this.bullets.forEach((bullet) => bullet.draw(ctx));
  }
}

// ゲームクラスを更新
class Game {
  constructor() {
    this.canvas = createElement("canvas", {
      width: GAME_CONFIG.width,
      height: GAME_CONFIG.height,
      style: "border: 1px solid black;",
    });
    this.ctx = this.canvas.getContext("2d");
    this.highScore = this.loadHighScore();
    this.reset();
    this.setupControls();
    this.gameLoop();
  }

  loadHighScore() {
    const saved = localStorage.getItem("gameHighScore");
    return saved ? parseFloat(saved) : 0;
  }

  saveHighScore() {
    if (this.survivalTime > this.highScore) {
      this.highScore = this.survivalTime;
      localStorage.setItem("gameHighScore", this.highScore.toString());
    }
  }

  reset() {
    this.player = new Player();
    this.obstacles = [];
    this.lastObstacleTime = 0;
    this.startTime = Date.now();
    this.survivalTime = 0;
    this.isGameOver = false;
    this.enemy = new Enemy();
  }

  setupControls() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.player.moveDirection = -1;
          break;
        case "ArrowRight":
          this.player.moveDirection = 1;
          break;
        case "Space":
        case "ArrowUp":
          this.player.jump();
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft" && this.player.moveDirection === -1) {
        this.player.moveDirection = 0;
      }
      if (e.key === "ArrowRight" && this.player.moveDirection === 1) {
        this.player.moveDirection = 0;
      }
    });

    // リスタート機能を追加
    document.addEventListener("keydown", (e) => {
      if (e.key === "r" && this.isGameOver) {
        this.reset();
      }
    });
  }

  checkCollisions() {
    if (this.player.isDead) return true;

    // 障害物との衝突
    const obstacleCollision = this.obstacles.some((obstacle) => {
      return (
        this.player.x < obstacle.x + obstacle.width &&
        this.player.x + this.player.width > obstacle.x &&
        this.player.y < obstacle.y + obstacle.height &&
        this.player.y + this.player.height > obstacle.y
      );
    });

    // 弾丸との衝突
    const bulletCollision = this.enemy.bullets.some((bullet) => {
      return (
        this.player.x < bullet.x + bullet.width &&
        this.player.x + this.player.width > bullet.x &&
        this.player.y < bullet.y + bullet.height &&
        this.player.y + this.player.height > bullet.y
      );
    });

    // 敵本体との衝突
    const enemyCollision =
      this.player.x < this.enemy.x + this.enemy.width &&
      this.player.x + this.player.width > this.enemy.x &&
      this.player.y < this.enemy.y + this.enemy.height &&
      this.player.y + this.player.height > this.enemy.y;

    // 銃との衝突
    const gunCollision =
      this.player.x < this.enemy.x - 10 + 15 && // 銃の位置とサイズ
      this.player.x + this.player.width > this.enemy.x - 10 &&
      this.player.y < this.enemy.y + this.enemy.height / 2 - 5 + 10 &&
      this.player.y + this.player.height >
        this.enemy.y + this.enemy.height / 2 - 5;

    return (
      obstacleCollision || bulletCollision || enemyCollision || gunCollision
    );
  }

  spawnObstacle() {
    const now = Date.now();
    if (now - this.lastObstacleTime > GAME_CONFIG.obstacleInterval) {
      // ランダムな高さと種類で障害物を生成
      const y = Math.random() * (GAME_CONFIG.height - 100);
      const type =
        GAME_CONFIG.obstacleTypes[
          Math.floor(Math.random() * GAME_CONFIG.obstacleTypes.length)
        ];
      this.obstacles.push(new Obstacle(y, type));
      this.lastObstacleTime = now;

      // 難易度調整：時間とともに障害物の速度を上げる
      GAME_CONFIG.obstacleSpeed = Math.min(GAME_CONFIG.obstacleSpeed + 0.1, 10);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);

    // 地面の描画（落とし穴付き）
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, GAME_CONFIG.height - 20, GAME_CONFIG.pitPosition, 20);
    this.ctx.fillRect(
      GAME_CONFIG.pitPosition + GAME_CONFIG.pitWidth,
      GAME_CONFIG.height - 20,
      GAME_CONFIG.width - (GAME_CONFIG.pitPosition + GAME_CONFIG.pitWidth),
      20
    );

    // プレイヤーの描画
    this.ctx.fillStyle = this.player.isDead ? "red" : "blue";
    this.ctx.fillRect(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height
    );

    // 障害物の描画を更新
    this.obstacles.forEach((obstacle) => obstacle.draw(this.ctx));

    // 生存時間とハイスコアの表示
    this.ctx.fillStyle = "black";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(
      `現在の生存時間: ${this.survivalTime.toFixed(1)}秒`,
      10,
      30
    );
    this.ctx.fillText(`最高記録: ${this.highScore.toFixed(1)}秒`, 10, 60);

    // 障害物の種類の説明を更新（位置を下に移動）
    if (!this.isGameOver) {
      this.ctx.fillStyle = "black";
      this.ctx.font = "14px Arial";
      this.ctx.fillText("オレンジ: 直進", 10, 90);
      this.ctx.fillText("紫: 波状移動", 10, 110);
      this.ctx.fillText("赤: バウンド", 10, 130);
      this.ctx.fillText("黄: 追尾", 10, 150);
    }

    // 敵の描画
    this.enemy.draw(this.ctx);

    if (this.isGameOver) {
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      this.ctx.fillRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);
      this.ctx.fillStyle = "white";
      this.ctx.font = "40px Arial";
      this.ctx.fillText(
        "GAME OVER",
        GAME_CONFIG.width / 2 - 100,
        GAME_CONFIG.height / 2
      );
      this.ctx.font = "20px Arial";
      this.ctx.fillText(
        "Rキーでリスタート",
        GAME_CONFIG.width / 2 - 80,
        GAME_CONFIG.height / 2 + 40
      );
    }
  }

  gameLoop() {
    if (!this.isGameOver) {
      this.survivalTime = (Date.now() - this.startTime) / 1000;
      this.spawnObstacle();
      this.player.update();
      this.enemy.update();

      // 障害物の更新と画面外に出たものの削除
      this.obstacles = this.obstacles.filter(
        (obstacle) => !obstacle.update(this.player.y)
      );

      // 衝突判定
      if (this.checkCollisions()) {
        this.isGameOver = true;
        this.saveHighScore(); // ゲームオーバー時にハイスコアを保存
      }
    }

    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }
}

// アプリケーションの初期化を環境に応じて条件分岐
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    const game = new Game();
    app.appendChild(game.canvas);
  });
}

// Quokkaでのテスト用
const game = new Game();
console.log("Game initialized");
console.log("Player position:", { x: game.player.x, y: game.player.y });
game.player.jump();
console.log("Player jumped, velocity:", game.player.velocityY);
game.player.update();
console.log("Player position after update:", {
  x: game.player.x,
  y: game.player.y,
});
