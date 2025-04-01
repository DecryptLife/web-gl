function initBuffers(gl) {
  const positionBuffer = initPositionBuffer(gl, 350, 300);

  return {
    position: positionBuffer,
  };
}

function initPositionBuffer(gl, x, y) {
  const width = 100;
  const height = 150;
  const thickness = 30;

  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const vertexPositions = [
    0, 0, 30, 0, 0, 150,

    30, 0, 0, 150, 30, 150,

    30, 0, 100, 0, 100, 30,

    100, 30, 30, 0, 30, 30,

    30, 60, 80, 60, 80, 90,

    30, 60, 80, 90, 30, 90,
  ];

  //   gl.bufferData(
  //     gl.ARRAY_BUFFER,
  //     new Float32Array(vertexPositions),
  //     gl.STATIC_DRAW
  //   );

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      // left column
      0, 0, 30, 0, 0, 150,

      30, 0, 0, 150, 30, 150,

      // top rung
      30, 0, 100, 0, 30, 30,

      30, 30, 100, 0, 100, 30,

      // middle rung
      30, 60, 70, 60, 30, 90,

      70, 60, 30, 90, 70, 90,
    ]),
    gl.STATIC_DRAW
  );

  return positionBuffer;
}

export { initBuffers };
