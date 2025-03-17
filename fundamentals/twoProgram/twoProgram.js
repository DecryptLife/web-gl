const canvas = document.querySelector("#glcanvas");

const gl = canvas.getContext("webgl");

gl.clearColor(0.8, 0.4, 0.5, 0.6);
gl.clear(gl.COLOR_BUFFER_BIT);

const vsGLSL1 = `
    attribute vec4 aPosition;
    void main() {
        gl_Position = aPosition;
        gl_PointSize = 10.0;
    }
`;

const fsGLSL1 = `
    precision highp float;

    void main() {
        gl_FragColor = vec4(1.0, 0.5, 0.0 , 1.0);

    }
`;

const vsGLSL2 = `
  attribute vec4 aPosition;
  // attribute vec4 aColor;

  varying vec4 v_color;
  void main() {
    gl_Position = aPosition;
    gl_PointSize = 10.0;
    // v_color = aColor;
  }
`;

const fsGLSL2 = `
  precision highp float;

  varying vec4 v_color;
  void main() {
    gl_FragColor = vec4(1.0, 0.2, 0.0, 1.0);
  }
`;

const createShader = (gl, type, glsl) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, glsl);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }

  return shader;
};

const compileShaderAndLinkProgram = (gl, prg, vsGLSL, fsGLSL) => {
  const vertexShader = createShader(gl, prg, vsGLSL);
  const fragmentShader = createShader(gl, prg, fsGLSL);

  gl.attachShader(vertexShader);
  gl.attachShader(fragmentShader);
  gl.linkProgram(prg);

  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(prg));
  }
  return prg;
};

const prg1 = gl.createProgram();
compileShaderAndLinkProgram(gl, prg1, vsGLSL1, fsGLSL1);
const prog1Locs = {
  position: gl.getAttribLocation(prg1, "aPosition"),
};

const prg2 = gl.createProgram();
compileShaderAndLinkProgram(gl, prg2, vsGLSL2, fsGLSL2);
const prog2Locs = {
  position: gl.getAttribLocation(prg2, "aPosition"),
};

const prog1VertexPositions = new Float32Array([
  -0.4, 0.3,

  -0.5, 0.2, -0.3, 0.2,

  -0.6, 0.1, -0.2, 0.1,

  -0.7, 0.0, -0.1, 0.0,

  -0.6, -0.1, -0.2, -0.1,

  -0.5, -0.2, -0.3, -0.2,

  -0.4, -0.3,
]);

const prog2VertexPositions = new Float32Array([
  0.5, 0.4,

  0.5, 0.2,

  0.5, 0,

  0.7, 0,

  0.3, 0,

  0.1, 0,

  0.9, 0,

  0.5, -0.2,

  0.5, -0.4,
]);

const positionLoc = gl.getAttribLocation(prg1, "aPosition");

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexPositions1, gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionLoc);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

const positionLoc2 = gl.getAttribLocation(prg2, "aPosition");

const positionBuffer2 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer2);
gl.bufferData(gl.ARRAY_BUFFER, vertexPositions2, gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionLoc2);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLoc2, 2, gl.FLOAT, false, 0, 0);

gl.useProgram(prg1);
gl.useProgram(prg2);

gl.drawArrays(gl.POINTS, 0, 12);
gl.drawArrays(gl.POINTS, 0, 9);
