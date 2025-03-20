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

  gl.attachShader(vertexShader);
  gl.attachShader(fragmentShader);

  gl.linkProgram(prg);

  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(prg));
  }
  return prg;
};
