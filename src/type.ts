export interface Point {
  x: number;
  y: number;
}

export interface Rect extends Point {
  width: number;
  height: number;
}

export type Group = "green" | "red"; // 所属。所属が異なる場合に当たり判定を行う

export interface Body extends Rect {
  group: Group;
  hp: number;
  paralyzing: number; // ダメージ時の麻痺時間
}

export interface Bullet extends Body {
  dest: Point;
}

export interface Creature extends Body {
  hp: number;
  speed: number; // 1秒あたりの移動距離（pixel）
  canShot: boolean;
  //color: string;
}
