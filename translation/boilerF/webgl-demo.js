import { initBuffers } from "./initBuffer.js";
import { drawScene } from "./drawScene.js";

main();

function main() {
  const canvas = document.querySelector("#glcanvas");
  const gl = canvas.getContext("webgl");

  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine does not support it"
    );
  }

  const vsGLSL = `
    attribute vec2 aPosition;

    uniform vec2 uResolution;

    void main() {
        vec2 zeroToOne = aPosition/uResolution;
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
    },
  };

  const buffers = initBuffers(gl);

  drawScene(gl, programInfo, buffers);
}

function initShaderProgram(gl, vsGLSL, fsGLSL) {
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
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  const compileStatus = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (!compileStatus) {
    throw new Error(gl.getShaderInfoLog(shader));
  }

  return shader;
}
