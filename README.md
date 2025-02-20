# 2D Shooter Game

A simple 2D shooter game built with TypeScript and HTML5 Canvas. This project demonstrates basic game mechanics such as player movement, enemy behaviors, collision detection, and customizable enemy behavior injection.

## Features

- **Player Movement:**  
  The player can move vertically using the arrow keys and shoot using the Control key.

- **Enemy Generation and Behavior:**  
  Enemies are dynamically generated with various behaviors. Their movement patterns can be customized using behavior functions. For example, enemies can move in a zigzag pattern, accelerate, or retreat and shoot when the player gets too close.

- **Collision Detection:**  
  Basic rectangle-based collision detection is implemented to handle interactions between the player, enemies, and bullets.

- **Customizable Behavior Injection:**  
  Enemy behavior is injected via behavior functions (e.g., `moveLeftBehavior`, `zigzagBehavior`, `acceleratingBehavior`, `ySyncBehaviorFactory`, and `retreatAndShootBehaviorFactory`). This allows you to easily add new enemy movement patterns.

- **FPS Counter:**  
  A simple FPS counter is displayed on-screen for performance monitoring.

## File Structure

- **index.ts:**  
  Contains the main game loop, input handling, and overall game state management. This file integrates the player, enemies, and bullet updates, along with collision detection and drawing routines.

- **sprite.ts:**  
  Provides drawing functions for rendering rectangles and pixel art on the HTML5 Canvas. The pixel art is drawn using an 8x8 grid based on preset palette and pixel data.

- **behaviors.ts:**  
  Defines various enemy behavior functions. These include:

  - `moveLeftBehavior`: Moves the enemy steadily to the left.
  - `zigzagBehavior`: Moves the enemy left while oscillating vertically.
  - `acceleratingBehavior`: Moves the enemy left while gradually accelerating.
  - `ySyncBehaviorFactory`: Creates a behavior function that synchronizes vertical movement with the player's position.
  - `retreatAndShootBehaviorFactory`: When an enemy gets too close to the player, it retreats (moves right) and sets a flag to shoot.

- **type.ts:**  
  Contains TypeScript interfaces and type definitions for game entities:
  - `Point` and `Rect` for basic geometry.
  - `Body` which extends `Rect` with additional properties.
  - `Creature` representing a game character (player or enemy), including movement speed, hit points, and an optional `behavior` function.
  - `Bullet` which extends `Body` and adds a destination point.

## Installation

1. **Clone the Repository:**  
   Clone this repository to your local machine.

2. **Install Dependencies:**  
   Ensure you have Node.js installed. Then, run:

   ```bash
   npm install
   ```

   (Adjust based on your project's setup, for example if you are using a bundler like webpack or a TypeScript build process.)

3. **Compile the Code:**  
   Use the TypeScript compiler:

   ```bash
   npx tsc
   ```

   This will compile the TypeScript source files into JavaScript.

4. **Run the Game:**  
   Open the `index.html` file in a modern browser that supports HTML5 Canvas. Make sure your canvas element has the correct ID (e.g., `viewport`).

## Controls

- **Move Up:** Press `Up` or `ArrowUp`
- **Move Down:** Press `Down` or `ArrowDown`
- **Shoot:** Press `Control`

## Customizing Enemy Behavior

The game leverages customizable behavior functions to define enemy movement. You can modify or add new behavior functions in `behaviors.ts`. For example, you can adjust the `retreatAndShootBehaviorFactory` to change the safe distance or the shooting frequency.

```ts
export const retreatAndShootBehaviorFactory = (
  player: Creature,
  safeDistance: number
) => {
  return (self: Creature, deltaTime: number): Creature => {
    const distance = getDistance(self, player);
    if (distance < safeDistance) {
      return {
        ...self,
        x: self.x + self.speed * deltaTime,
        shoot: true,
      };
    } else {
      return {
        ...self,
        x: self.x - self.speed * deltaTime,
        shoot: false,
      };
    }
  };
};
```

Simply inject the desired behavior when generating enemies in `index.ts`:

```ts
enemies = [
  ...enemies,
  {
    group: "red",
    x: viewport.width - 64,
    y: 10 + randomInt * 100,
    width: 16 * randomInt,
    height: 16 * randomInt,
    speed: 200,
    hp: 1,
    canShot: true,
    paralyzing: 0,
    behavior: retreatAndShootBehaviorFactory(player, 100),
  },
];
```

## License

This project is licensed under the MIT License.
