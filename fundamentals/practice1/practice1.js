const canvas = document.querySelector("#glcanvas");

const gl = canvas.getContext("webgl");

const vsGLSL = `
    attribute vec4 aPosition;

    void main() {
        gl_Position = aPosition;
    }
`;

const fsGLSL = `
    precision highp float;

    void main() {
        gl_FragColor = vec4(1.0, 0.5, 0.6, 1.0);
    }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsGLSL);
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  throw new Error(gl.getShaderInfoLog(vertexShader));
}

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsGLSL);
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  throw new Error(gl.getShaderInfoLog(fragmentShader));
}

const prg = gl.createProgram();
gl.attachShader(prg, vertexShader);
gl.attachShader(prg, fragmentShader);
gl.linkProgram(prg);
if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
  throw new Error(gl.getProgramInfoLog(prg));
}

const positionLoc = gl.getAttribLocation(prg, "aPosition");

const vertexPositions = new Float32Array([
  0.5,
  0.5,
  -0.5,
  -0.5,

  0.4,
  0.5,
  -0.5,
  -0.4,

  0.3,
  0.5,
  -0.5,
  -0.3,

  0.2,
  0.5,
  -0.5,
  -0.2,

  0.1,
  0.5,
  -0.5,
  -0.1,

  0.0,
  0.5,
  -0.5,
  0.0,

  -0.1,
  0.5,
  -0.5,
  0.1,

  -0.2,
  0.5,
  -0.5,
  0.2,

  -0.3,
  0.5,
  -0.5,
  0.3,

  -0.4,
  0.5,
  -0.5,
  0.4,

  0.5,
  0.4,
  -0.4,
  -0.5,

  0.5,
  0.3,
  -0.3,
  -0.5,

  0.5,
  0.2,
  -0.2,
  -0.5,

  0.5,
  0.1,
  -0.1,
  -0.5,

  0.5,
  0.0,
  0.0,
  -0.5,

  0.5,
  -0.1,
  0.1,
  -0.5,

  0.5,
  -0.2,
  0.2,
  -0.5,

  0.5,
  -0.3,
  0.3,
  -0.5,

  // reverse
  -0.4,
  -0.5,
  -0.5,
  -0.4,

  -0.3,
  -0.5,
  -0.5,
  -0.3,

  -0.2,
  -0.5,
  -0.5,
  -0.2,

  -0.1,
  -0.5,
  -0.5,
  -0.1,

  0.0,
  -0.5,
  -0.5,
  0.0,

  0.1,
  -0.5,
  -0.5,
  0.1,

  0.2,
  -0.5,
  -0.5,
  0.2,

  0.3,
  -0.5,
  -0.5,
  0.3,

  0.4,
  -0.5,
  -0.5,
  0.4,

  0.5,
  -0.5,
  -0.5,
  0.5,

  0.5,
  -0.4,
  -0.4,
  0.5,

  0.5,
  -0.3,
  -0.3,
  0.5,

  0.5,
  -0.2,
  -0.2,
  0.5,

  0.5,
  -0.1,
  -0.1,
  0.5,

  0.5,
  0.0,
  0.0,
  0.5,

  0.5,
  0.1,
  0.1,
  0.5,

  0.5,
  0.2,
  0.2,
  0.5,

  0.5,
  0.3,
  0.3,
  0.5,

  0.5,
  0.4,
  0.4,
  0.5,

  0.5,
  -0.4,
  0.4,
  -0.5,

  0.5,
  0.5,
  -0.5,
  0.5,

  0.5,
  0.5,
  0.5,
  -0.5,

  0.5,
  -0.5,
  -0.5,
  -0.5,

  -0.5,
  0.5,
  -0.5,
  -0.5,

  // horizontal lines - 84
  -0.5,
  0.45,
  0.5,
  0.45,

  -0.5,
  0.4,
  0.5,
  0.4,

  -0.5,
  0.35,
  0.5,
  0.35,

  -0.5,
  0.3,
  0.5,
  0.3,

  -0.5,
  0.25,
  0.5,
  0.25,

  -0.5,
  0.2,
  0.5,
  0.2,

  -0.5,
  0.15,
  0.5,
  0.15, // 96

  -0.5,
  0.1,
  0.5,
  0.1,

  -0.5,
  0.05,
  0.5,
  0.05,

  -0.5,
  0.0,
  0.5,
  0.0,

  -0.5,
  -0.05,
  0.5,
  -0.05,

  -0.5,
  -0.1,
  0.5,
  -0.1,

  -0.5,
  -0.15,
  0.5,
  -0.15,

  -0.5,
  -0.2,
  0.5,
  -0.2,

  -0.5,
  -0.25,
  0.5,
  -0.25,

  -0.5,
  -0.3,
  0.5,
  -0.3, // 114

  -0.5,
  -0.35,
  0.5,
  -0.35,

  -0.5,
  -0.4,
  0.5,
  -0.4,

  -0.5,
  -0.45,
  0.5,
  -0.45,

  // vertical lines - 122
  -0.45,
  0.5,
  -0.45,
  -0.5,

  -0.4,
  0.5,
  -0.4,
  -0.5,

  -0.35,
  0.5,
  -0.35,
  -0.5,

  -0.3,
  0.5,
  -0.3,
  -0.5,

  -0.25,
  0.5,
  -0.25,
  -0.5,

  -0.2,
  0.5,
  -0.2,
  -0.5,

  // 134
  -0.15,
  0.5,
  -0.15,
  -0.5,

  -0.1,
  0.5,
  -0.1,
  -0.5,

  -0.05,
  0.5,
  -0.05,
  -0.5,

  0.0,
  0.5,
  0.0,
  -0.5,

  0.05,
  0.5,
  0.05,
  -0.5,

  0.1,
  0.5,
  0.1,
  -0.5,

  0.15,
  0.5,
  0.15,
  -0.5,

  0.2,
  0.5,
  0.2,
  -0.5,

  // 150

  0.25,
  0.5,
  0.25,
  -0.5,

  0.3,
  0.5,
  0.3,
  -0.5,

  0.35,
  0.5,
  0.35,
  -0.5,

  0.4,
  0.5,
  0.4,
  -0.5,

  0.45,
  0.5,
  0.45,
  -0.5,
]);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexPositions, gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionLoc);

gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

gl.useProgram(prg);

gl.lineWidth(5.0);

gl.drawArrays(gl.LINES, 0, 160);
