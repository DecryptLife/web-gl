const setPositionAttribute = (gl, programInfo, buffers) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);

  gl.vertexAttribPointer(
    programInfo.attributeLocations.attribPosition,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.enableVertexAttribArray(programInfo.attributeLocations.attribPosition);
};

const drawScene = (gl, programInfo, buffers) => {
  setPositionAttribute(gl, programInfo, buffers);

  gl.useProgram(programInfo.program);

  const uResolution = programInfo.uniformLocations.uniformResolution;
  const uTranslation = programInfo.uniformLocations.uniformTranslation;
  const uRotation = programInfo.uniformLocations.uniformRotation;
  const uScale = programInfo.uniformLocations.uniformScale;

  gl.uniform2f(uResolution, gl.canvas.width, gl.canvas.height);

  gl.drawArrays(gl.TRIANGLES, 0, 18);
};

export { drawScene };
