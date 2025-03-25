function initBuffers(gl) {
  const positionBuffer = initPositionBuffer(gl);

  return {
    position: positionBuffer,
  };
}

function initPositionBuffer(gl) {
  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const vertexPositions = [
    0, 0, 30, 0, 0, 150,

    30, 0, 0, 150, 30, 150,

    30, 0, 100, 0, 100, 30,

    100, 30, 30, 0, 30, 30,

    30, 60, 100, 60, 100, 90,

    30, 60, 100, 90, 30, 90,
  ];

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertexPositions),
    gl.STATIC_DRAW
  );

  return positionBuffer;
}

export { initBuffers };
