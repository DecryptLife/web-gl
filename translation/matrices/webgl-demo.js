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

  const xSlider = document.querySelector("#x-slider");
  const ySlider = document.querySelector("#y-slider");
  const degSlider = document.querySelector("#degree-slider");
  const xScaleSlider = document.querySelector("#xscale-slider");
  const yScaleSlider = document.querySelector("#yscale-slider");

  const xValue = document.querySelector("#x-value");
  const yValue = document.querySelector("#y-value");
  const degValue = document.querySelector("#degree-value");
  const xScaleValue = document.querySelector("#xscale-value");
  const yScaleValue = document.querySelector("#yscale-value");

  xSlider.addEventListener("input", (event) => {
    xValue.textContent = event.target.value;
    console.log("xval - ", xValue.textContent);
    updatePosition(0);
  });

  ySlider.addEventListener("input", (event) => {
    yValue.textContent = event.target.value;
    updatePosition(1);
  });

  degSlider.addEventListener("input", (event) => {
    const deg = parseInt(event.target.value);
    degValue.textContent = Math.round(deg * 100) / 100;
    updateRotation(deg);
  });

  xScaleSlider.addEventListener("input", (event) => {
    const x_val = event.target.value;
    xScaleValue.textContent = x_val;
    updateScale(0, x_val);
  });

  yScaleSlider.addEventListener("input", (event) => {
    const y_val = event.target.value;
    yScaleValue.textContent = y_val;
    updateScale(1, y_val);
  });

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

  const updatePosition = (index) => {
    translation[index] =
      index === 0 ? parseInt(xValue.textContent) : parseInt(yValue.textContent);
    drawScene(gl, programInfo, buffers, translation, rotation, scale);
  };

  const updateRotation = (degree) => {
    const angleInRadians = (-degree * Math.PI) / 180;
    rotation[0] = Math.round(Math.sin(angleInRadians) * 100) / 100;
    rotation[1] = Math.round(Math.cos(angleInRadians) * 100) / 100;
    console.log("Test 1.2 rotation - ", rotation);
    drawScene(gl, programInfo, buffers, translation, rotation, scale);
  };

  const updateScale = (index, scaleValue) => {
    if (index === 0) {
      scale[0] = scaleValue;
    } else {
      scale[1] = scaleValue;
    }
    drawScene(gl, programInfo, buffers, translation, rotation, scale);
  };

  const buffers = initBuffers(gl);
  drawScene(gl, programInfo, buffers);
};

main();
