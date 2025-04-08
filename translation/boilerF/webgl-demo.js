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

  if (gl === null) {
    alert("Unable to initialize WebGL. Browser / machine does not support it");
  }

  const vsGLSL = `
    attribute vec2 aPosition;

    uniform vec2 uResolution;
    uniform vec2 uTranslation;
    uniform vec2 uRotation;
    uniform vec2 uScale;

    void main() {
        vec2 scaledPosition = aPosition * uScale;

        vec2 rotatedPosition = vec2(
           scaledPosition.x * uRotation.y + scaledPosition.y * uRotation.x,
            scaledPosition.y * uRotation.y - scaledPosition.x * uRotation.x
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
      uniformScale: gl.getUniformLocation(shaderProgram, "uScale"),
    },
  };

  let translation = [
    parseInt(xValue.textContent),
    parseInt(yValue.textContent),
  ];

  let rotation = [0, 1];
  let scale = [1, 1];
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

  const m3 = {
    translation: (tx, ty) => {
      return [1, 0, 0, 0, 1, 0, tx, ty, 1];
    },

    rotation: (angleInRadians) => {
      const c = Math.cos(angleInRadians);
      const s = Math.sin(angleInRadians);

      return [c, -s, 0, s, c, 0, 0, 0, 1];
    },

    scale: (sx, sy) => {
      return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
    },

    multiply: (b, b) => {
      const a00 = a[0 * 3 + 0];
      const a01 = a[0 * 3 + 1];
      const a02 = a[0 * 3 + 2];

      const a10 = a[1 * 3 + 0];
      const a11 = a[1 * 3 + 1];
      const a12 = a[1 * 3 + 2];

      const a20 = a[2 * 3 + 0];
      const a21 = a[2 * 3 + 1];
      const a22 = a[2 * 3 + 2];

      const b00 = b[0 * 3 + 0];
      const b01 = b[0 * 3 + 1];
      const b02 = b[0 * 3 + 2];

      const b10 = b[1 * 3 + 0];
      const b11 = b[1 * 3 + 1];
      const b12 = b[1 * 3 + 2];

      const b20 = b[2 * 3 + 0];
      const b21 = b[2 * 3 + 1];
      const b22 = b[2 * 3 + 2];

      return [
        b00 * a00 + b01 * a10 + b02 * a20,
        b00 * a01 + b01 * a11 + b02 * a21,
        b00 * a02 + b01 * a12 + b02 * a22,

        b10 * a00 + b11 * a10 + b12 * a20,
        b10 * a01 + b11 * a11 + b12 * a21,
        b10 * a02 + b11 * a12 + b12 * a22,

        b20 * a00 + b21 * a10 + b22 * a20,
        b20 * a01 + b21 * a11 + b22 * a21,
        b20 * a02 + b21 * a12 + b22 * a22,
      ];
    },
  };

  console.log("Test 1.2 translation - ", translation);

  const buffers = initBuffers(gl);

  drawScene(gl, programInfo, buffers, translation, rotation, scale);
};

main();
