const canvas = document.querySelector("#glcanvas");
const gl = canvas.getContext("webgl");

const vsGLSL = `
    void main() {
    }
`;

const fsGLSL = `
    void main() {
    
    }
`;

const vertexShader = gl.createShader();

const fragmentShader = gl.fragmentShader();

const prg = gl.createProgram();

gl.useProgram(prg);

gl.drawArrays(gl.TRIANGLES, 0, 3);
