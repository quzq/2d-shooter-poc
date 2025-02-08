interface Point {
  x: number;
  y: number;
}
interface Rect extends Point {
  width: number;
  height: number;
}
type Group = "green" | "red"; // 所属。所属が異なる場合に当たり判定を行う
interface Body extends Rect {
  group: Group;
  hp: number;
  paralyzing: number; // ダメージ時の麻痺時間
}

interface Bullet extends Body {
  dest: Point;
}

interface Player extends Body {
  hp: number;
  speed: number;
  bullets: Bullet[];
  canShot: boolean;
  color: string;
}

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
  ctx.shadowColor = "blue";
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.shadowBlur = 5;

  let player: Player = {
    group: "green",
    x: 32,
    y: viewport.height / 2,
    width: 32,
    height: 32,
    speed: 4,
    hp: 1,
    bullets: [],
    canShot: true,
    color: "#FF9500",
    paralyzing: 0,
  };

  let enemies: Player[] = [];

  let upPressed: boolean = false;
  let downPressed: boolean = false;
  let shotPressed: boolean = false;

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

  const drawBox = (r: Rect, color: string) => {
    ctx.beginPath();
    ctx.rect(r.x, r.y, r.width, r.height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  };

  const drawPlayer = (p: Player, color: string) => {
    drawBox({ x: p.x, y: p.y, width: p.width, height: p.height }, color);
  };
  const drawBullet = (p: Bullet, color: string) => {
    drawBox({ x: p.x, y: p.y, width: p.width, height: p.height }, color);
  };

  const draw = () => {
    // 背景の描画
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, viewport.width, viewport.height);

    // 自機の移動
    const newPlayerY =
      player.y -
      (upPressed && player.y > 0 ? player.speed : 0) +
      (downPressed && player.y + player.height < viewport.height
        ? player.speed
        : 0);
    player = { ...player, y: newPlayerY };

    // 自機のshot
    if (shotPressed) {
      if (player.canShot) {
        player = {
          ...player,
          canShot: false,
          bullets: [
            ...player.bullets,
            {
              group: player.group,
              x: player.x + player.width,
              y: player.y + player.width / 2,
              width: 8,
              height: 2,
              dest: { x: 8, y: 0 },
              hp: 1,
            } as Bullet,
          ],
        };
      }
    } else {
      player = { ...player, canShot: true };
    }

    // 弾丸の描画
    player.bullets = player.bullets
      .map((b) => {
        const next: Bullet = { ...b, x: b.x + b.dest.x, y: b.y + b.dest.y };
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

    drawPlayer(player, player.color);

    // 敵の描画
    enemies = enemies.map((e) => {
      const newPoint = {
        x: e.x + e.width < 0 ? viewport.width * 2 : e.x - e.speed,
        y:
          e.y - (player.y < e.y ? e.speed : 0) + (player.y > e.y ? e.speed : 0),
      };

      const newBullets = e.bullets
        .map((i) => {
          const next: Bullet = { ...i, x: i.x + i.dest.x, y: i.y + i.dest.y };
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

      const newState: Player = {
        ...e,
        ...newPoint,
        bullets:
          Math.random() < 0.02
            ? [
                ...newBullets,
                {
                  group: e.group,
                  x: e.x,
                  y: e.y + e.width / 2,
                  width: 8,
                  height: 2,
                  dest: { x: -8, y: 0 },
                  hp: 1,
                } as Bullet,
              ]
            : newBullets,
      };

      const enemyRect = { x: e.x, y: e.y, width: e.width, height: e.height };
      const hit =
        player.bullets
          .map((b) => {
            if (b.group !== e.group) return false;
            return hitTestRect(b, e);
          })
          .filter((i) => i).length > 0;
      drawPlayer(newState, hit ? "white" : e.color);
      return newState;
    });

    // 敵の発生
    if (Math.random() < 0.01) {
      const option = Math.random() * 4;
      const color = `rgb(${Math.random() * 256},${Math.random() * 256},${
        Math.random() * 256
      })`;
      enemies = [
        ...enemies,
        {
          group: "red",
          x: viewport.width - 32 * 2 - option * 16,
          y: 0,
          width: 16 + 8 * option,
          height: 16 + 8 * option,
          speed: 2,
          hp: 1,
          bullets: [],
          canShot: true,
          color,
          paralyzing: 0,
        },
      ];
    }

    requestAnimationFrame(draw);
  };
  draw();
};

main(<HTMLCanvasElement>document.getElementById("viewport"));
