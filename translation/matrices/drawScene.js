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

const drawScene = (
  gl,
  programInfo,
  buffers,
  m3,
  translation,
  angleInRadians,
  scale
) => {
  console.log("Translation - ", translation);
  setPositionAttribute(gl, programInfo, buffers);

  gl.useProgram(programInfo.program);

  const uResolutionLocation = programInfo.uniformLocations.uniformResolution;
  const matrixLocation = programInfo.uniformLocations.uniformMatrix;
  const translationMatrix = m3.translation(translation[0], translation[1]);
  console.log("Translation mat - ", translationMatrix);
  const rotationMatrix = m3.rotation(angleInRadians);
  console.log("Rotation mat - ", rotationMatrix);
  const scaleMatrix = m3.scale(scale[0], scale[1]);

  let matrix = m3.multiply(translationMatrix, rotationMatrix);
  matrix = m3.multiply(matrix, scaleMatrix);

  gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);

  console.log("Test matrix - ", matrix);
  gl.uniformMatrix3fv(matrixLocation, false, matrix);

  gl.drawArrays(gl.TRIANGLES, 0, 18);
};

export { drawScene };
