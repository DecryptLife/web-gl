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
        gl_FragColor = vec4(1, 0, 0, 1);
    }
`;

const vertexShader = gl.createShader();

const fragmentShader = gl.fragmentShader();

const prg = gl.createProgram();

gl.useProgram(prg);

gl.drawArrays(gl.TRIANGLES, 0, 3);
