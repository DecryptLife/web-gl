import { initBuffers } from "./initBuffers.js";
import { drawScene } from "./drawScene.js";

const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }

  return shader;
};

const loadShaderProgram = (gl, vsGLSL, fsGLSL) => {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsGLSL);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsGLSL);

  const prg = gl.createProgram();

  gl.attachShader(prg, vertexShader);
  gl.attachShader(prg, fragmentShader);

  gl.linkProgram(prg);

  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(prg));
  }

  return prg;
};

const main = () => {
  const canvas = document.querySelector("#glcanvas");

  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.log("Machine or browser can't run web gl");
  }

  const vsGLSL = `
        attribute vec2 aPosition;

        uniform vec2 uResolution;
        uniform vec3 uMatrix;

        void main(){
            vec2 position = (uMatrix * vec3(aPosition, 1)).xy;
            vec2 zeroToOne = position / uResolution;
            vec2 zeroToTwo = zeroToOne * 2.0;
            vec2 clipSpace = zeroToTwo - 1.0;
            gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        }
  `;

  const fsGLSL = `
        precision highp float;
        void main(){
            gl_FragColor = vec4(0.6, 0.6, 0.6, 1.0);
        }
  `;

  const shaderProgram = loadShaderProgram(gl, vsGLSL, fsGLSL);

  const programInfo = {
    program: shaderProgram,
    attributeLocations: {
      attribPosition: gl.getAttribLocation(shaderProgram, "aPosition"),
    },
    uniformLocations: {
      uniformResolution: gl.getUniformLocation(shaderProgram, "uResolution"),
      uniformTranslation: gl.getUniformLocation(shaderProgram, "uTranslation"),
      uniformRotation: gl.getUniformLocation(shaderProgram, "uRotation"),
      uniformScale: gl.getUniformLocation(shaderProgram, "uScale"),
    },
  };

  const buffers = initBuffers(gl);
  drawScene(gl, programInfo, buffers);
};

main();
