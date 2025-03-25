function initBuffers(gl) {
  const positionBuffer = initPositionBuffer(gl);

  return {
    position: positionBuffer,
  };
}

function initPositionBuffer(gl) {
  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const vertexPositions = [0.0, 0.4, 0.4, 0.4, 0.0, 0.3];

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertexPositions),
    gl.STATIC_DRAW
  );

  return positionBuffer;
}
