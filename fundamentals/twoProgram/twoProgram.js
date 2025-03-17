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

const vertexShader1 = gl.createShader(gl.VERTEX_SHADER);
const vertexShader2 = gl.createShader(gl.VERTEX_SHADER);

gl.shaderSource(vertexShader1, vsGLSL1);
gl.shaderSource(vertexShader2, vsGLSL2);

gl.compileShader(vertexShader1);
gl.compileShader(vertexShader2);

if (!gl.getShaderParameter(vertexShader1, gl.COMPILE_STATUS)) {
  throw new Error(gl.getShaderInfoLog(vertexShader1));
}

if (!gl.getShaderParameter(vertexShader2, gl.COMPILE_STATUS)) {
  throw new Error(gl.getShaderInfoLog(vertexShader2));
}

const fragmentShader1 = gl.createShader(gl.FRAGMENT_SHADER);
const fragmentShader2 = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(fragmentShader1, fsGLSL1);
gl.shaderSource(fragmentShader2, fsGLSL2);

gl.compileShader(fragmentShader1);
gl.compileShader(fragmentShader2);
if (!gl.getShaderParameter(fragmentShader1, gl.COMPILE_STATUS)) {
  throw new Error(gl.getShaderInfoLog(fragmentShader1));
}
if (!gl.getShaderParameter(fragmentShader2, gl.COMPILE_STATUS)) {
  throw new Error(gl.getShaderInfoLog(fragmentShader2));
}

const prg1 = gl.createProgram();
gl.attachShader(prg1, vertexShader1);
gl.attachShader(prg1, fragmentShader1);
gl.linkProgram(prg1);

const prg2 = gl.createProgram();
gl.attachShader(prg2, vertexShader2);
gl.attachShader(prg2, fragmentShader2);
gl.linkProgram(prg2);

const vertexPositions1 = new Float32Array([
  -0.4, 0.3,

  -0.5, 0.2, -0.3, 0.2,

  -0.6, 0.1, -0.2, 0.1,

  -0.7, 0.0, -0.1, 0.0,

  -0.6, -0.1, -0.2, -0.1,

  -0.5, -0.2, -0.3, -0.2,

  -0.4, -0.3,
]);

const positionLoc = gl.getAttribLocation(prg1, "aPosition");

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexPositions1, gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionLoc);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

const vertexPositions2 = new Float32Array([
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
