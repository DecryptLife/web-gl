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

    uniform vec4 uColor;
    void main() {
        gl_FragColor = uColor;
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
  0, 0.4, 0, -0.4, 0.1, 0.4,

  0, -0.4, 0.1, -0.4, 0.1, 0.4,

  0.1, 0.4, 0.6, 0.3, 0.1, 0.3,

  0.1, 0.4, 0.6, 0.4, 0.6, 0.3,

  0.1, 0.1, 0.6, 0.1, 0.1, 0.0,

  0.1, 0.0, 0.6, 0.0, 0.6, 0.1,
]);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexPositions, gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionLoc);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

gl.useProgram(prg);

const colorLoc = gl.getUniformLocation(prg, "uColor");
gl.uniform4f(colorLoc, 0.0, 0.6, 0.6, 1.0); // light blue

gl.drawArrays(gl.TRIANGLES, 0, 18);
