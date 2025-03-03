function initBuffers(gl) {
  const positionBuffer = initPositionBuffers(gl);

  return {
    position: positionBuffer,
  };
}

function initPositionBuffers(gl) {
  /*
  create position buffer and bind buffer to GL.
  Create poisiton array of the shape and 
  then buffer it to gl
    */

  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return positionBuffer;
}

export { initBuffers };
