const setPositionAttribute = (gl, programInfo, buffers) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);

  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
};

const drawScene = (gl, programInfo, buffers, translation, rotation, scale) => {
  setPositionAttribute(gl, programInfo, buffers);

  gl.useProgram(programInfo.program);

  const uResolutionLocation = programInfo.uniformLocations.uniformResolution;
  const uTranslationLocation = programInfo.uniformLocations.uniformTranslation;
  const uRotation = programInfo.uniformLocations.uniformRotation;
  const uScale = programInfo.uniformLocations.uniformScale;

  gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);
  gl.uniform2fv(uTranslationLocation, translation);
  gl.uniform2fv(uRotation, rotation);
  gl.uniform2fv(uScale, scale);

  gl.drawArrays(gl.TRIANGLES, 0, 18);
};

export { drawScene };
