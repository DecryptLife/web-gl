const canvas = document.querySelector("#glcanvas");

const gl = canvas.getContext("webgl");

const vsGLSL = `
    attribute vec4 aPosition;
    attribute vec4 aColor;

    varying vec4 vColor;

    void main() {
        gl_Position = aPosition;
        vColor = aColor;
    }

`;

const fsGLSL = `
    precision highp float;

    varying vec4 vColor;
    void main() {
        gl_FragColor = vColor;
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

const vertexPositions = new Float32Array([
  0.0, 0.5, -0.2, 0.1, 0.2, 0.1,

  -0.2, 0.1, -0.4, -0.3, 0, -0.3,

  0.2, 0.1, 0, -0.3, 0.4, -0.3,
]);

const vertexColors = new Uint8Array([
  255,
  0,
  0,
  255,
  0,
  255,
  0,
  255,
  0,
  0,
  255,
  255,

  255,
  255,
  0,
  255, // Yellow (Vertex 4)
  0,
  255,
  255,
  255, // Cyan (Vertex 5)
  255,
  0,
  255,
  255, // Magenta (Vertex 6)

  100,
  100,
  100,
  255, // Gray (Vertex 7)
  200,
  100,
  0,
  255, // Orange (Vertex 8)
  0,
  100,
  200,
  255, // Light Blue (Vertex 9)
]);

const positionLoc = gl.getAttribLocation(prg, "aPosition");
const colorLoc = gl.getAttribLocation(prg, "aColor");

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexPositions, gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.enableVertexAttribArray(colorLoc);
gl.vertexAttribPointer(colorLoc, 4, gl.UNSIGNED_BYTE, true, 0, 0);

gl.useProgram(prg);

gl.drawArrays(gl.TRIANGLES, 0, 9);
