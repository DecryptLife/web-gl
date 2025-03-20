const canvas = document.querySelector("#glcanvas");

const gl = canvas.getContext("webgl");

const vsGLSL = `
    attribute vec4 aPosition;
    attribute vec4 aColor;

    uniform vec4 uOffset;

    varying vec4 vColor;
    void main() {
        gl_Position = aPosition + uOffset;
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

const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
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

const prg = gl.createProgram();
compileShaderAndLinkProgram(gl, prg, vsGLSL, fsGLSL);

console.log("Test 1.2 ptg - ", prg);

const vertexPositions = new Float32Array([0.0, 0.2, -0.2, -0.2, 0.2, -0.2]);
const vertexColors = new Float32Array([1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1]);

const positionLoc = gl.getAttribLocation(prg, "aPosition");
const colorLoc = gl.getAttribLocation(prg, "aColor");
const offsetLoc = gl.getUniformLocation(prg, "uOffset");

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexPositions, gl.STATIC_DRAW);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);

gl.bindBuffer(gl.ARRAY_BUFFER, null);

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
console.log("Test 1.2 position loc - ", positionLoc);
gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.enableVertexAttribArray(colorLoc);
gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);

gl.useProgram(prg);

gl.uniform4fv(offsetLoc, [0.5, 0, 0, 0]);
gl.drawArrays(gl.TRIANGLES, 0, 3);

gl.disableVertexAttribArray(colorLoc);
gl.vertexAttrib4fv(colorLoc, [1.0, 0.3, 0.2, 1.0]);

gl.uniform4fv(offsetLoc, [-0.5, 0, 0, 0]);
gl.drawArrays(gl.TRIANGLES, 0, 3);
