const canvas = document.querySelector("#glcanvas");

const gl = canvas.getContext("webgl");

const vsGLSL = `
    attribute vec4 aPosition;
    attribute vec4 aColor;

    varying vec4 v_color;
    void main() {
        gl_Position = aPosition;
        v_color = aColor;
    }
`;

const fsGLSL = `
    precision highp float;

    varying vec4 v_color;
    void main() {
        gl_FragColor = v_color;

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

const vertexPositions = new Float32Array([0, 0.7, -0.5, -0.7, 0.5, -0.7]);

const positionLoc = gl.getAttribLocation(prg, "aPosition");

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexPositions, gl.STATIC_DRAW);

const vertexColors = new Uint8Array([
  255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255,
]);

const colorLoc = gl.getAttribLocation(prg, "aColor");

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionLoc);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(colorLoc);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorLoc, 2, gl.UNSIGNED_BYTE, true, 0, 0);

gl.useProgram(prg);

gl.drawArrays(gl.TRIANGLES, 0, 3);
