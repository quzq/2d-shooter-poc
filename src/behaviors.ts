import { Creature } from "./type";

export const moveLeftBehavior = (
  self: Creature,
  deltaTime: number
): Creature => {
  return {
    ...self,
    x: self.x - self.speed * deltaTime,
  };
};

export const zigzagBehavior = (self: Creature, deltaTime: number): Creature => {
  const frequency = 5; // 振動の速さ（周波数）
  const amplitude = 5; // 振幅（上下の移動量）
  const newX = self.x - self.speed * deltaTime;
  const newY = self.y + amplitude * Math.sin(newX * frequency);
  return {
    ...self,
    x: newX,
    y: newY,
  };
};

export const acceleratingBehavior = (
  self: Creature,
  deltaTime: number
): Creature => {
  const acceleration = 10; // 加速度（pixel/秒²）
  const newSpeed = self.speed + acceleration * deltaTime;
  return {
    ...self,
    x: self.x - newSpeed * deltaTime,
    speed: newSpeed,
  };
};

// プレイヤーと敵（Creature）の位置情報からユークリッド距離を計算するヘルパー関数
const getDistance = (
  a: { x: number; y: number },
  b: { x: number; y: number }
): number => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * retreatBehaviorFactory
 * プレイヤーとの距離が safeDistance より短くなった場合、敵が退却（右方向へ移動）し、
 * それ以外は通常の左方向移動を行う behavior 関数を生成します。
 *
 * @param player - プレイヤーの状態（Creature）
 * @param safeDistance - プレイヤーとの安全な距離（この距離より近づいたら退却）
 * @returns Creature の behavior 関数
 */
const retreatBehaviorFactory = (player: Creature, safeDistance: number) => {
  return (self: Creature, deltaTime: number): Creature => {
    const distance = getDistance(self, player);
    if (distance < safeDistance) {
      // プレイヤーに近すぎる場合は、右方向へ退却（speed 分だけ右に移動）
      return {
        ...self,
        x: self.x + self.speed * deltaTime,
      };
    } else {
      // 通常は左方向へ進む
      return {
        ...self,
        x: self.x - self.speed * deltaTime,
      };
    }
  };
};

export const ySyncBehaviorFactory = (player: Creature) => {
  return (self: Creature, deltaTime: number): Creature => {
    const newY =
      self.y -
      (player.y < self.y ? self.speed * deltaTime : 0) +
      (player.y > self.y ? self.speed * deltaTime : 0);
    return {
      ...self,
      x: self.x - self.speed * deltaTime,
      y: newY,
    };
  };
};
