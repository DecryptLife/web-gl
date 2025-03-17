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
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }

  return shader;
};

const compileShaderAndLinkProgram = (gl, prg, vsGLSL, fsGLSL) => {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsGLSL);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsGLSL);

  gl.attachShader(prg, vertexShader);
  gl.attachShader(prg, fragmentShader);
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
  0.5, 0.3,

  0.5, 0.2,

  0.5, 0.1,

  0.4, 0,

  0.3, 0,

  0.2, 0,

  0.5, 0,

  0.6, 0,

  0.7, 0,

  0.8, 0,

  0.5, -0.1,

  0.5, -0.2,

  0.5, -0.3,
]);

const position1Buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, position1Buffer);
gl.bufferData(gl.ARRAY_BUFFER, prog1VertexPositions, gl.STATIC_DRAW);

const position2Buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, position2Buffer);
gl.bufferData(gl.ARRAY_BUFFER, prog2VertexPositions, gl.STATIC_DRAW);

gl.bindBuffer(gl.ARRAY_BUFFER, position1Buffer);
gl.enableVertexAttribArray(prog1Locs.position);
gl.vertexAttribPointer(prog1Locs.position, 2, gl.FLOAT, false, 0, 0);

gl.useProgram(prg1);

gl.drawArrays(gl.POINTS, 0, 12);

// Second program
gl.bindBuffer(gl.ARRAY_BUFFER, position2Buffer);
gl.enableVertexAttribArray(prog2Locs.position);
gl.vertexAttribPointer(prog2Locs.position, 2, gl.FLOAT, false, 0, 0);

gl.useProgram(prg2);

gl.drawArrays(gl.POINTS, 0, 13);
