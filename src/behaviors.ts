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

export const ySyncBehaviorFactory = (player: Creature) => {
  return (self: Creature, deltaTime: number): Creature => {
    const shot = player.x + 200 < self.x && Math.random() < 0.02;
    const newY =
      self.y -
      (player.y < self.y ? self.speed * deltaTime : 0) +
      (player.y > self.y ? self.speed * deltaTime : 0);
    return {
      ...self,
      x: self.x - self.speed * deltaTime,
      y: newY,
      shot,
    };
  };
};
