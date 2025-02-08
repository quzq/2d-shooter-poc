# 2D Shooting Game

A simple 2D shooting game built with TypeScript and HTML5 Canvas. In this game, you control a player character that moves vertically and shoots bullets at incoming enemies. The game features collision detection, enemy spawning, and smooth canvas animations.

---

## Overview

The game is designed to be lightweight and straightforward. It includes the following key elements:

- **Player Movement:** The player can move up and down along the left side of the screen.
- **Shooting Mechanics:** Pressing the Control key fires bullets toward the right.
- **Enemy Behavior:** Enemies spawn randomly from the right and move across the screen. They adjust their vertical position relative to the player, and they can also shoot bullets.
- **Collision Detection:** A hit test function determines if bullets collide with enemies, causing visual feedback (the enemy changes color when hit).
- **Canvas Rendering:** All game elements are rendered using the HTML5 Canvas API with simple effects such as shadows.

---

## Features

- **Responsive Player Control:** Use keyboard events to move the player and shoot.
- **Dynamic Enemy Generation:** Enemies are generated with varying sizes, speeds, and colors.
- **Bullet Management:** Bullets are created, updated, and filtered out when they go off-screen using native array methods.
- **Collision Detection:** Efficient rectangle-based collision checking ensures that gameplay interactions are handled correctly.
- **TypeScript Powered:** The code utilizes TypeScript for clear type definitions (e.g., `TPoint`, `TRect`, `TBullet`, `TPlayer`).

---

## Installation

1. **Clone or Download:** Obtain the source code from the repository.
2. **Setup HTML:** Ensure you have an HTML file that contains a canvas element with the ID `viewport`. For example:

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <title>2D Shooting Game</title>
     </head>
     <body>
       <canvas id="viewport" width="800" height="600"></canvas>
       <script src="path/to/compiled/script.js"></script>
     </body>
   </html>
   ```

3. **Compile the Code:** Use the TypeScript compiler (`tsc`) to compile the TypeScript source into JavaScript.
4. **Run the Game:** Open the HTML file in any modern browser that supports HTML5 Canvas.

---

## Controls

- **Move Up:** Press the `Up Arrow` or `ArrowUp` key.
- **Move Down:** Press the `Down Arrow` or `ArrowDown` key.
- **Shoot:** Press the `Control` key.

---

## How to Play

1. **Launch the Game:** Open the HTML file in your browser.
2. **Control the Player:** Use the designated keys to move up and down.
3. **Fire Bullets:** Hold down the Control key to shoot. The player fires bullets that travel horizontally.
4. **Defeat Enemies:** Aim and shoot at the incoming enemies. When a bullet collides with an enemy, the enemy flashes (changes color) to indicate a hit.
5. **Enjoy:** Survive as long as you can while the enemies keep coming!

---

## Code Structure

- **Type Definitions:**
  - `TPoint`, `TRect`, `TBullet`, and `TPlayer` define the data structures for points, rectangles, bullets, and players respectively.
- **Game Loop:**
  - The game uses `requestAnimationFrame` to create a smooth, continuous loop for updating game state and rendering frames.
- **Event Handling:**
  - Keydown and keyup events are set up to track player movement and shooting actions.
- **Collision Detection:**
  - The `hitTestRect` function checks for overlapping rectangles to detect collisions between bullets and enemies.
- **Array Management:**
  - Bullets are updated and then filtered using a type guard to remove any `null` values from the array, ensuring type safety.

---

## Future Improvements

- **Sound Effects and Music:** Add audio to enhance the gameplay experience.
- **Scoring System:** Implement scoring based on enemy hits and survival time.
- **Enhanced Enemy AI:** Introduce more complex enemy behavior and additional enemy types.
- **Visual Effects:** Improve animations and add visual effects for collisions and explosions.
- **Power-Ups:** Include power-ups to upgrade player abilities and add strategic depth.

---

## License

This project is licensed under the MIT License.
