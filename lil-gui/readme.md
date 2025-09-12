# lil-gui Notes

## 1. What is lil-gui?
- A lightweight GUI (Graphical User Interface) library.
- Used to create simple control panels for tweaking variables in real-time.
- Commonly used with **Three.js** to adjust scene parameters (color, position, rotation, scale, etc.).

---
## 2. Why use lil-gui?
- Quick way to test and experiment with values.
- No need to edit code repeatedly → just slide/toggle values.
- Helps in debugging and building demos.

---
## 3. Installation
### Using npm
npm install lil-gui

## setup to use it in code
import GUI from 'lil-gui';

const gui = new GUI();
const params = {
  speed: 1,
  visible: true,
  color: '#ff0000'
};

gui.add(params, 'speed', 0, 5);          // slider
gui.add(params, 'visible');              // checkbox
gui.addColor(params, 'color');           // color picker

5. Common Controls

    Slider: gui.add(obj, 'prop', min, max, step)
    Checkbox: gui.add(obj, 'booleanProp')
    Dropdown: gui.add(obj, 'prop', [ 'a', 'b', 'c' ])
    Color Picker: gui.addColor(obj, 'colorProp')
    Button: assign a function → gui.add(obj, 'funcName')

6. Folders

    Group related controls:

    const cubeFolder = gui.addFolder('Cube');
    cubeFolder.add(params, 'size', 1, 5);
    cubeFolder.addColor(params, 'color');
    cubeFolder.open(); // auto expand

8. Tips

    Use a params object → keeps values linked.
    Always dispose old geometries/materials if you recreate them → avoids memory leaks.
    Organize controls in folders for large projects.