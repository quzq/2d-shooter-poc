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

const picPaletteData = {
  foo: ["#d27fbc", "#459245", "#f9c367"],
  bar: ["#f46cd0", "#878787", "#ea2e4a"],
};
const picPattern = {
  foo: [
    [0, 0, 3, 3, 1, 1, 0, 0],
    [0, 3, 3, 3, 3, 1, 1, 0],
    [3, 3, 3, 3, 3, 3, 1, 1],
    [3, 3, 2, 3, 3, 2, 1, 1],
    [3, 3, 2, 3, 3, 2, 1, 1],
    [3, 3, 3, 3, 3, 3, 1, 1],
    [0, 3, 3, 3, 3, 1, 1, 0],
    [3, 3, 3, 0, 0, 3, 1, 1],
  ],
  bar: [
    [0, 0, 0, 0, 3, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 3, 0],
    [0, 3, 0, 2, 2, 2, 3, 3],
    [3, 3, 0, 2, 2, 2, 1, 3],
    [3, 3, 3, 1, 2, 2, 1, 3],
    [3, 3, 3, 1, 1, 1, 1, 3],
    [0, 3, 3, 3, 1, 1, 1, 3],
    [0, 0, 3, 3, 3, 3, 3, 0],
  ],
};

export const drawPixel = (
  ctx: CanvasRenderingContext2D,
  r: Rect,
  color: string | null,
  times: number,
  paletteName: "foo" | "bar",
  patternName: "foo" | "bar"
) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const col = picPattern[patternName][j][i];
      if (col !== 0) {
        ctx.beginPath();
        ctx.rect(r.x + i * times, r.y + j * times, times - 1, times - 1);
        ctx.fillStyle = color || picPaletteData[paletteName][col - 1];
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};
