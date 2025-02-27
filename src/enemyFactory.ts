// enemyFactory.ts
import { Creature } from "./type";
import { acceleratingBehavior, ySyncBehaviorFactory } from "./behaviors";

// 敵の種類を示す列挙型
export enum EnemyType {
  Accelerating = "accelerating",
  YSync = "ysync",
}

export interface EnemyConfig {
  type: EnemyType;
  x: number;
  y: number;
  player?: Creature;
}

export const createEnemy = (config: EnemyConfig): Creature => {
  const randomInt = Math.floor(Math.random() * 3) + 1;
  switch (config.type) {
    case EnemyType.Accelerating:
      return {
        group: "red",
        x: config.x,
        y: config.y,
        width: 16 * randomInt,
        height: 16 * randomInt,
        speed: 150,
        hp: 1,
        canShot: true,
        shot: false,
        paralyzing: 0,
        behavior: acceleratingBehavior,
        paletteName: "bar",
        patternName: "bar",
      };
    case EnemyType.YSync:
      if (!config.player) {
        throw new Error("YSync 敵生成には player 情報が必要です");
      }
      return {
        group: "red",
        x: config.x,
        y: config.y,
        width: 16 * randomInt,
        height: 16 * randomInt,
        speed: 200,
        hp: 1,
        canShot: true,
        shot: false,
        paralyzing: 0,
        behavior: ySyncBehaviorFactory(config.player),
        paletteName: "foo",
        patternName: "foo",
      };
    default:
      throw new Error("無効な敵のタイプです");
  }
};
