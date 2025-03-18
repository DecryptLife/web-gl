const canvas = document.querySelector("#glcanvas");
const gl = canvas.getContext("webgl");

// gl.clearColor(1, 0.5, 0.2, 0.5);
// gl.clear(gl.COLOR_BUFFER_BIT);

const vsGLSL = `
    attribute vec4 aPosition;
    void main() {
        gl_Position = aPosition;
        gl_PointSize = 5.0;
    }
`;

const fsGLSL = `
    precision highp float;
    void main() {
        gl_FragColor = vec4(1, 0, 0, 1);
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

const vertexPoisiton = new Float32Array([
  -0.6, 0.2, -0.65, 0.2, -0.7, 0.2, -0.725, 0.15, -0.75, 0.1, -0.725, 0.05,
  -0.65, 0, -0.6, 0, -0.7, 0, -0.6, 0.2, -0.65, -0.2, -0.7, -0.2, -0.575, -0.15,
  -0.55, -0.1, -0.575, -0.05,

  -0.5, 0, -0.475, -0.1, -0.45, -0.2, -0.4, -0.1, -0.35, 0, -0.3, -0.1, -0.25,
  -0.2, -0.225, -0.1, -0.2, 0,

  -0.1, -0.2, -0.05, -0.1, 0, 0, 0, -0.1, 0.05, -0.1, 0.1, -0.2, -0.075, -0.15,
  -0.025, -0.05, 0.025, -0.05, 0.075, -0.15,

  0.2, 0, 0.25, 0, 0.3, 0, 0.35, 0, 0.4, 0, 0.3, -0.05, 0.3, -0.1, 0.3, -0.15,
  0.3, -0.2,

  0.5, 0, 0.5, -0.05, 0.5, -0.1, 0.5, -0.15, 0.5, -0.2, 0.7, 0, 0.7, -0.05, 0.7,
  -0.1, 0.7, -0.15, 0.7, -0.2, 0.56, -0.1, 0.64, -0.1,

  0.85, 0, 0.85, -0.05, 0.85, -0.1, 0.85, -0.15, 0.85, -0.2,
]);

const positionLoc = gl.getAttribLocation(prg, "aPosition");

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexPoisiton, gl.STATIC_DRAW);

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

gl.useProgram(prg);

gl.drawArrays(gl.POINTS, 0, 60);
