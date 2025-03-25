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
    0.0, 0.4, 0.4, 0.4, 0.0, 0.3,

    0.0, 0.3, 0.4, 0.4, 0.4, 0.3,

    0.0, 0.3, 0.1, 0.3, 0.0, -0.4,

    0.1, 0.3, 0.0, -0.4, 0.1, -0.4,

    0.1, 0.1, 0.4, 0.1, 0.4, 0.0,

    0.1, 0.1, 0.1, 0.0, 0.4, 0.0,
  ];

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertexPositions),
    gl.STATIC_DRAW
  );

  return positionBuffer;
}

export { initBuffers };
