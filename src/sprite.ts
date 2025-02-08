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

const picPaletteData = [
  `rgb(${0},${0},${0})`,
  `rgb(${0},${3},${101})`,
  `rgb(${100},${23},${211})`,
  `rgb(${250},${233},${11})`,
];
const picData = [
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
];

export const drawPixel = (
  ctx: CanvasRenderingContext2D,
  r: Rect,
  color: string,
  times: number
) => {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const col = picData[j][i];
      if (col !== 0) {
        ctx.rect(r.x + i * times, r.y + j * times, times - 1, times - 1);
        ctx.fillStyle = "white"; //picPaletteData[col];
        ctx.fill();
      }
    }
  }
  ctx.closePath();
};
