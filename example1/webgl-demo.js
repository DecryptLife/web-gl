import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";

let squareRotation = 0.0;
let deltaTime = 0;

main();

//
// start here
//

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    );
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/* 

  SETUP SUMMARY
  1. Get the canvas element from HTML and gl context
  2. Setup the vertex and fragment shader program (vsSource & fsSource)
  3. Initialize shader program 
      - load both shaders loadShader(gl, gl.SHADER_TYPE, program)
          > create shader, send source to shader and compile the shader
      - create a shader program and attach both shaders to it
      - link the shader program to gl & return shader program
  4. Create an object programInfo which contains details of things required for shader program
      - program: shader program
      - attribLocations: vertex postion
      - uniformLocations: projectionMatrix & modelViewMatrix
  5. Initialize buffers
      - create a buffer & bind the buffer to gl
      - create an array of positions for the shape
      - finally buffer the data to gl => gl.bufferData(bufferType, positions, drawingType)
  6. Draw Scenes
      - Preparing WebGL for drawing
      - Clear the buffers
      - Create the perspective matrix
      - Setting model view matrix
      - Configuring the shader attributes
        - setPositionAttribute : tells how to extract vertex positions from vertex attribute
      - set the shader program and unifroms needed for the drawing
      - finally draw the object




*/
