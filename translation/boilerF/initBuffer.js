const initBuffers = (gl) => {
  const positionBuffer = initPositionBuffer(gl);

  return {
    position: positionBuffer,
  };
};

const initPositionBuffer = (gl) => {
  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      // left rung
      0, 0, 0, 150, 30, 0,

      30, 0, 0, 150, 30, 150,

      // top rung
      30, 0, 100, 0, 30, 30,

      30, 30, 100, 0, 100, 30,

      // bottom rung
      30, 60, 70, 60, 30, 90,

      30, 90, 70, 60, 70, 90,
    ]),
    gl.STATIC_DRAW
  );

  return positionBuffer;
};

export { initBuffers };
