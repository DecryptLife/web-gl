const canvas = document.querySelector("#glcanvas");

const gl = canvas.getContext("webgl");

const vsGLSL = `
    attribute vec4 aPosition;
    attribute vec4 aColor;

    uniform vec4 uOffset;

    varying vec4 vColor;
    void main() {
        gl_Position = aPosition + uOffset;

    }
`;

const fsGLSL = `
    void main() {
    
    }
`;
