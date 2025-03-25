main();

function main() {
  const canvas = document.querySelector("#glcanvas");
  const gl = canvas.getContext("webgl");

  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it"
    );
  }

  const vsGLSL = `
    attribute vec4 aPosition;

    void main() {
        gl_Position = aPosition;
    }
  `;

  const fsGLSL = `
    precision highp float;
    void main() {
        gl_FragColor = vec4(1.0 ,0.4, 0.2, 1.0)
    }
  `;
}
