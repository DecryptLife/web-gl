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
      x,
      y,
      x + thickness,
      y,
      x,
      y + height,
      x,
      y + height,
      x + thickness,
      y,
      x + thickness,
      y + height,

      // top rung
      x + thickness,
      y,
      x + width,
      y,
      x + thickness,
      y + thickness,
      x + thickness,
      y + thickness,
      x + width,
      y,
      x + width,
      y + thickness,

      // middle rung
      x + thickness,
      y + thickness * 2,
      x + (width * 2) / 3,
      y + thickness * 2,
      x + thickness,
      y + thickness * 3,
      x + thickness,
      y + thickness * 3,
      x + (width * 2) / 3,
      y + thickness * 2,
      x + (width * 2) / 3,
      y + thickness * 3,
    ]),
    gl.STATIC_DRAW
  );

  return positionBuffer;
}

export { initBuffers };
