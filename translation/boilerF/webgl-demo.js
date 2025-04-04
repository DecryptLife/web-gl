import { initBuffers } from "./initBuffer.js";
import { drawScene } from "./drawScene.js";

const loadShader = (gl, type, source) => {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  const compileStatus = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (!compileStatus) {
    throw new Error(gl.getShaderInfoLog(shader));
  }

  return shader;
};

const initShaderProgram = (gl, vsGLSL, fsGLSL) => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsGLSL);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsGLSL);

  const shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  const linkStatus = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);

  if (!linkStatus) {
    throw new Error(gl.getProgramInfoLog(shaderProgram));
  }

  return shaderProgram;
};

const main = () => {
  const canvas = document.querySelector("#glcanvas");
  const gl = canvas.getContext("webgl");

  const xSlider = document.querySelector("#x-slider");
  const ySlider = document.querySelector("#y-slider");

  const xValue = document.querySelector("#x-value");
  const yValue = document.querySelector("#y-value");

  xSlider.addEventListener("input", (event) => {
    xValue.textContent = event.target.value;
    updatePosition(0);
  });

  ySlider.addEventListener("input", (event) => {
    yValue.textContent = event.target.value;
    updatePosition(1);
  });

  if (gl === null) {
    alert("Unable to initialize WebGL. Browser / machine does not support it");
  }

  const vsGLSL = `
    attribute vec2 aPosition;

    uniform vec2 uResolution;
    uniform vec2 uTranslation;
    uniform vec2 uRotation;

    void main() {
        vec2 rotatedPosition = vec2(
            aPosition.x * uRotation.y + aPosition.y * uRotation.x,
            aPosition.y * uRotation.y - aPosition.x * uRotation.x
        );

        vec2 position = rotatedPosition + uTranslation;

        vec2 zeroToOne = position/uResolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
  `;

  const fsGLSL = `
    precision highp float;
    void main() {
        gl_FragColor = vec4(1.0 ,0.4, 0.2, 1.0);
    }
  `;

  const shaderProgram = initShaderProgram(gl, vsGLSL, fsGLSL);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aPosition"),
    },
    uniformLocations: {
      uniformResolution: gl.getUniformLocation(shaderProgram, "uResolution"),
      uniformTranslation: gl.getUniformLocation(shaderProgram, "uTranslation"),
      uniformRotation: gl.getUniformLocation(shaderProgram, "uRotation"),
    },
  };

  let translation = [
    parseInt(xValue.textContent),
    parseInt(yValue.textContent),
  ];

  let rotation = [0.29, 0.96];
  const updatePosition = (index) => {
    translation[index] =
      index === 0 ? parseInt(xValue.textContent) : parseInt(yValue.textContent);
    drawScene(gl, programInfo, buffers, translation, rotation);
  };

  console.log("Test 1.2 translation - ", translation);

  const buffers = initBuffers(gl);

  drawScene(gl, programInfo, buffers, translation, rotation);
};

main();
