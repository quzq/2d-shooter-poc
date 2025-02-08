type Point = {
  x: number;
  y: number;
};
type Rect = Point & {
  width: number;
  height: number;
};
type Bullet = Rect & {
  dest: Point;
};
type Player = Rect & {
  hp: number;
  speed: number;
  bullets: Bullet[];
  canShot: boolean;
  color: string;
};

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
    x: 32,
    y: viewport.height / 2,
    width: 32,
    height: 32,
    speed: 4,
    hp: 1,
    bullets: [],
    canShot: true,
    color: "#FF9500",
  };
  let enemies: Player[] = [];

  let upPressed: boolean = false;
  let downPressed: boolean = false;
  let spacePressed: boolean = false;

  document.addEventListener(
    "keydown",
    (e) => {
      if (["Up", "ArrowUp"].includes(e.key)) {
        upPressed = true;
      } else if (["Down", "ArrowDown"].includes(e.key)) {
        downPressed = true;
      } else if (["Control"].includes(e.key)) {
        spacePressed = true;
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
        spacePressed = false;
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
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, viewport.width, viewport.height);

    const newPlayerY =
      player.y -
      (upPressed && player.y > 0 ? player.speed : 0) +
      (downPressed && player.y + player.height < viewport.height
        ? player.speed
        : 0);
    player = { ...player, y: newPlayerY };

    if (spacePressed) {
      if (player.canShot) {
        player = {
          ...player,
          canShot: false,
          bullets: [
            ...player.bullets,
            {
              x: player.x + player.width,
              y: player.y + player.width / 2,
              width: 8,
              height: 2,
              dest: { x: 8, y: 0 },
            } as Bullet,
          ],
        };
      }
    } else {
      player = { ...player, canShot: true };
    }

    player.bullets = player.bullets
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

    drawPlayer(player, player.color);

    enemies = enemies.map((i) => {
      const newPoint = {
        x: i.x + i.width < 0 ? viewport.width * 2 : i.x - i.speed,
        y:
          i.y - (player.y < i.y ? i.speed : 0) + (player.y > i.y ? i.speed : 0),
      };

      const newBullets = i.bullets
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
        ...i,
        ...newPoint,
        bullets:
          Math.random() < 0.02
            ? [
                ...newBullets,
                {
                  x: i.x,
                  y: i.y + i.width / 2,
                  width: 8,
                  height: 2,
                  dest: { x: -8, y: 0 },
                } as Bullet,
              ]
            : newBullets,
      };
      const enemyRect = { x: i.x, y: i.y, width: i.width, height: i.height };
      const hit =
        player.bullets
          .map((b) =>
            hitTestRect(
              { x: b.x, y: b.y, width: b.width, height: b.height },
              enemyRect
            )
          )
          .filter((i) => true).length > 0;
      drawPlayer(newState, hit ? "white" : i.color);
      return newState;
    });

    if (Math.random() < 0.01) {
      const option = Math.random() * 4;
      const color = `rgb(${Math.random() * 256},${Math.random() * 256},${
        Math.random() * 256
      })`;
      enemies = [
        ...enemies,
        {
          x: viewport.width - 32 * 2 - option * 16,
          y: 0,
          width: 16 + 8 * option,
          height: 16 + 8 * option,
          speed: 2,
          hp: 1,
          bullets: [],
          canShot: true,
          color,
        },
      ];
    }

    requestAnimationFrame(draw);
  };
  draw();
};

main(<HTMLCanvasElement>document.getElementById("viewport"));
