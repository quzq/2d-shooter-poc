import {
  acceleratingBehavior,
  ySyncBehaviorFactory,
  zigzagBehavior,
} from "./behaviors";
import { createEnemy, EnemyType } from "./enemyFactory";
import { drawBox, drawPixel } from "./sprite";
import { Bullet, Creature, Rect } from "./type";

export const hitTestRect = (rect1: Rect, rect2: Rect) => {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    return true;
  }
  return false;
};

const main = (viewport: HTMLCanvasElement): void => {
  const ctx = viewport.getContext("2d");
  if (!ctx) return;
  ctx.textBaseline = "top";
  ctx.shadowColor = "gray";
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.shadowBlur = 5;

  let player: Creature = {
    group: "green",
    x: 32,
    y: viewport.height / 2,
    width: 32,
    height: 32,
    speed: 120,
    hp: 1,
    canShot: true,
    shot: false,
    paralyzing: 0,
    behavior: (self: Creature, deltaTime: number): Creature => self,
    paletteName: "bar",
    patternName: "bar",
  };

  let enemies: Creature[] = [];
  let bullets: Bullet[] = [];

  let upPressed: boolean = false;
  let downPressed: boolean = false;
  let shotPressed: boolean = false;

  // FPS計測用変数
  let lastTime = performance.now();
  let lastFpsUpdate = lastTime;
  let fpsCounter = 0;
  let fpsDisplay = 0;

  document.addEventListener(
    "keydown",
    (e) => {
      if (["Up", "ArrowUp"].includes(e.key)) {
        upPressed = true;
      } else if (["Down", "ArrowDown"].includes(e.key)) {
        downPressed = true;
      } else if (["Control"].includes(e.key)) {
        shotPressed = true;
      }
    },
    false
  );

  document.addEventListener(
    "keyup",
    (e) => {
      if (["Up", "ArrowUp"].includes(e.key)) {
        upPressed = false;
      } else if (["Down", "ArrowDown"].includes(e.key)) {
        downPressed = false;
      } else if (["Control"].includes(e.key)) {
        shotPressed = false;
      }
    },
    false
  );

  const drawPlayer = (p: Creature, color: string | null) => {
    const times = p.width / 8;
    drawPixel(
      ctx,
      { x: p.x, y: p.y, width: p.width, height: p.height },
      color,
      times,
      p.paletteName,
      p.patternName
    );
  };
  const drawBullet = (p: Bullet, color: string) => {
    drawBox(ctx, { x: p.x, y: p.y, width: p.width, height: p.height }, color);
  };

  const calcParalyzingTime = (damages: number, paralyzing: number) =>
    damages ? paralyzing + damages : paralyzing > 0 ? paralyzing - 1 : 0;

  const draw = (time: number): void => {
    const deltaTime = (time - lastTime) / 1000; // 秒単位
    lastTime = time;

    // FPS計測：1秒ごとに更新
    fpsCounter++;
    if (time - lastFpsUpdate >= 1000) {
      fpsDisplay = fpsCounter;
      fpsCounter = 0;
      lastFpsUpdate = time;
    }

    // 背景の描画
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, viewport.width, viewport.height);

    // FPS表示（左上に白文字）
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`fps : ${fpsDisplay}`, 10, 30);

    // 自分の判定
    const damages =
      enemies.reduce((sum, e) => {
        if (player.group !== e.group && hitTestRect(player, e))
          return (sum += 1);
        return sum;
      }, 0) +
      bullets.reduce((sum, b) => {
        if (player.group !== b.group && hitTestRect(player, b))
          return (sum += 1);
        return sum;
      }, 0);
    player.hp = player.hp - damages;
    player.paralyzing = calcParalyzingTime(damages, player.paralyzing);
    // 敵の判定
    enemies = enemies.map((e) => {
      const damages =
        [player].reduce((sum, p) => {
          if (p.group !== e.group && hitTestRect(p, e)) return (sum += 1);
          return sum;
        }, 0) +
        bullets.reduce((sum, b) => {
          if (b.group !== e.group && hitTestRect(b, e)) return (sum += 1);
          return sum;
        }, 0);
      return {
        ...e,
        hp: e.hp - damages,
        paralyzing: calcParalyzingTime(damages, e.paralyzing),
      };
    });
    // 弾の判定
    bullets = bullets.map((b) => {
      const damages =
        [player].reduce((sum, p) => {
          if (p.group !== b.group && hitTestRect(p, b)) return (sum += 1);
          return sum;
        }, 0) +
        enemies.reduce((sum, e) => {
          if (e.group !== b.group && hitTestRect(e, b)) return (sum += 1);
          return sum;
        }, 0);
      return {
        ...b,
        hp: b.hp - damages,
        paralyzing: calcParalyzingTime(damages, b.paralyzing),
      };
    });

    // 自機の移動
    const newPlayerY =
      player.y -
      (upPressed && player.y > 0 ? player.speed * deltaTime : 0) +
      (downPressed && player.y + player.height < viewport.height
        ? player.speed * deltaTime
        : 0);
    player = { ...player, y: newPlayerY };

    // 自機のshot
    if (shotPressed) {
      if (player.canShot) {
        bullets = [
          ...bullets,
          {
            group: player.group,
            x: player.x + player.width,
            y: player.y + player.width / 2,
            width: 8,
            height: 2,
            dest: { x: 300, y: 0 },
            hp: 1,
          } as Bullet,
        ];
        player = {
          ...player,
          canShot: false,
        };
      }
    } else {
      player = { ...player, canShot: true };
    }

    // 弾丸の描画
    bullets = bullets
      .filter((b) => b.hp)
      .map((b) => {
        const next: Bullet = {
          ...b,
          x: b.x + b.dest.x * deltaTime,
          y: b.y + b.dest.y * deltaTime,
        };
        if (
          next.x < 0 ||
          next.y < 0 ||
          next.x + next.width > viewport.width ||
          next.y + next.height > viewport.height
        ) {
          return null;
        }
        drawBullet(next, "white");
        return next;
      })
      .filter((bullet): bullet is Bullet => bullet !== null);

    drawPlayer(player, player.paralyzing ? "white" : null);

    // 敵の描画
    enemies = enemies
      .filter((e) => e.hp)
      .map((e) => {
        // 挙動関数が定義されていれば呼び出す
        const updatedMe = e.behavior ? e.behavior(e, deltaTime) : e;
        if (
          updatedMe.x < 0 ||
          updatedMe.y < 0 ||
          updatedMe.x + e.width > viewport.width ||
          updatedMe.y + e.height > viewport.height
        ) {
          return null;
        }

        if (updatedMe.shot) {
          bullets = [
            ...bullets,
            {
              group: e.group,
              x: e.x,
              y: e.y + e.width / 2,
              width: 8,
              height: 2,
              dest: { x: -300, y: 0 },
              hp: 1,
            } as Bullet,
          ];
        }
        drawPlayer(updatedMe, updatedMe.paralyzing ? "white" : null);
        return updatedMe;
      })
      .filter((enemy): enemy is Creature => enemy !== null);

    // 敵の発生
    if (Math.random() < 0.02) {
      const randomInt = Math.floor(Math.random() * 3) + 1;
      const x = viewport.width - 64;
      const y = 10 + randomInt * 100;

      // 複数の敵パターンからランダムに選ぶ
      const enemyTypes = [EnemyType.Accelerating, EnemyType.YSync];
      const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

      const config = {
        type,
        x,
        y,
        viewportWidth: viewport.width,
        viewportHeight: viewport.height,
        player,
      };
      const newEnemy = createEnemy(config);
      enemies = [...enemies, newEnemy];
    }

    requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
};

main(<HTMLCanvasElement>document.getElementById("viewport"));
