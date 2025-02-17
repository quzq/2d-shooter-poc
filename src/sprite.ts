import { Rect } from "./type";

export const drawBox = (
  ctx: CanvasRenderingContext2D,
  r: Rect,
  color: string
) => {
  ctx.beginPath();
  ctx.rect(r.x, r.y, r.width, r.height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

const picPaletteData = ["#d27fbc", "#459245", "#f9c367"];
const picData = [
  [0, 0, 3, 3, 1, 1, 0, 0],
  [0, 3, 3, 3, 3, 1, 1, 0],
  [3, 3, 3, 3, 3, 3, 1, 1],
  [3, 3, 2, 3, 3, 2, 1, 1],
  [3, 3, 2, 3, 3, 2, 1, 1],
  [3, 3, 3, 3, 3, 3, 1, 1],
  [0, 3, 3, 3, 3, 1, 1, 0],
  [3, 3, 3, 0, 0, 3, 1, 1],
];

export const drawPixel = (
  ctx: CanvasRenderingContext2D,
  r: Rect,
  color: string | null,
  times: number
) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const col = picData[j][i];
      if (col !== 0) {
        ctx.beginPath();
        ctx.rect(r.x + i * times, r.y + j * times, times - 1, times - 1);
        ctx.fillStyle = color || picPaletteData[col - 1];
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};
