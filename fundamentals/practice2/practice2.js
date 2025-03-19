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
        gl_FragColor = vec4(0.8, 0.2, 0.5, 1.0);
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

const positionLoc = gl.getAttribLocation(prg, "aPosition");

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexPositions, gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

gl.useProgram(prg);

gl.drawArrays(gl.TRIANGLES, 0, 9);
