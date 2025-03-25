main();

function main() {
  const canvas = document.querySelector("#glcanvas");
  const gl = canvas.getContext("webgl");

  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it"
    );
  }

  const vsGLSL = `
    attribute vec4 aPosition;

    void main() {
        gl_Position = aPosition;
    }
  `;

  const fsGLSL = `
    precision highp float;
    void main() {
        gl_FragColor = vec4(1.0 ,0.4, 0.2, 1.0);
    }
  `;

  const shaderProgram = initShaderProgram(gl, vsGLSL, fsGLSL);
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
