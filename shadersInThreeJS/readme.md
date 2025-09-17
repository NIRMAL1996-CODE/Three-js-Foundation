# Setup Notes (Three.js, Vite, React, Next.js, GSAP, Shaders)

```bash
# 1. Vite (Vanilla JS Project)
npm create vite@latest
cd project-name
npm install
npm run dev

# 2. Install Three.js
npm install three

# 3. React with Vite
npm create vite@latest
# choose "React" or "React + TypeScript"
cd project-name
npm install
npm run dev

# 4. Next.js
npx create-next-app@latest
cd project-name
npm run dev

# 5. GSAP
npm install gsap
# usage: import { gsap } from "gsap";

# 6. Shaders (with Three.js + Vite)
npm install vite-plugin-glsl

# edit vite.config.js:
import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
export default defineConfig({
  plugins: [glsl()],
});

# create shader files in src/shaders:
# vertex.glsl
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

# fragment.glsl
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

# import in main.js
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

# 7. tailwindcss
# 1. Create project (if not yet)
npm create vite@latest my-project
cd my-project

# 2. Install Tailwind via new Vite plugin
npm install tailwindcss @tailwindcss/vite

# 3. Update vite.config.js
# add tailwindcss() to plugins

# vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";         # (if using React)
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),             # only if project is React
    tailwindcss(),
  ],
});

# 4. In your CSS (e.g. src/index.css or App.css), import Tailwind base styles
# Put at top of CSS file:
@import "tailwindcss";

# 5. Start dev server and test
npm run dev

# 6. Use utility classes in your components
# e.g. <h1 class="text-3xl font-bold underline">Hello Tailwind</h1>
