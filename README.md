# 2D Shmup Starter Kit

A boilerplate for developing 2D shooting games using TypeScript, Webpack, and Express.

## Features

- **TypeScript Development:** Write your game logic in TypeScript.
- **Webpack Bundling:** Automatically compiles and bundles your code into `dist/bundle.js`.
- **Simple Express Server:** Serves your project at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
your-project/
├── package.json
├── tsconfig.json
├── webpack.config.js
├── server.js
└── src/
    ├── index.html
    └── index.ts
```

- **src/index.html**  
  Contains the HTML structure including a `<canvas>` element and a script reference to `./dist/bundle.js`.

- **src/index.ts**  
  The entry point for your TypeScript game code.

- **webpack.config.js**  
  Configures webpack to bundle your TypeScript files into `dist/bundle.js`.

- **server.js**  
  Sets up an Express server to serve `src/index.html` and the bundled JavaScript file.

## Prerequisites

- Node.js (v12 or above) and npm installed.

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**

   ```bash
   cd your-project
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

## Development

### Build the Project

Compile your TypeScript code and bundle it into `dist/bundle.js` with:

```bash
npm run build
```

### Start the Server

Launch the Express server to view your project at [http://localhost:3000](http://localhost:3000):

```bash
npm run start
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the game boilerplate in action.

## Usage

- **Editing Code:**  
  Modify your game logic in `src/index.ts` and update your HTML in `src/index.html` as needed.

- **Rebuild:**  
  After making changes, run `npm run build` again to update `dist/bundle.js`.

- **Development Tips:**  
  For an improved development experience, consider integrating tools like webpack-dev-server for hot reloading.

## License

This project is licensed under the MIT License.

---

Feel free to adjust the content as needed for your project's specific details or any additional features you may include.
