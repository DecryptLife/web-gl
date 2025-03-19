const canvas = document.querySelector("#glcanvas");

const gl = canvas.getContext("webgl");

const vsGLSL = `

`;

const fsGLSL = `

`;

const createShader = (gl, type, glsl) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, glsl);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }

  return shader;
};

const compileShaderAndLinkProgram = () => {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsGLSL);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsGLSL);

  gl.attachShader(prg, vertexShader);
  gl.attachShader(prg, fragmentShader);
  gl.linkProgram(prg);

  if (!gl.getProgramParameter(gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(prg));
  }

  return prg;
};
