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

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsGLSL);
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  throw new Error(gl.getShaderInfoLog(vertexShader));
}

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsGLSL);
gs.compileShader(fragmentShader);
if (!gl.getShaderParameter(gl.COMPILE_STATUS)) {
  throw new Error(gl.getShaderInfoLog(fragmentShader));
}
