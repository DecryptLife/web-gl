function drawScene(gl, programInfo, buffers, translation) {
  setPositionAttribute(gl, programInfo, buffers);

  gl.useProgram(programInfo.program);

  const uResolutionLocation = programInfo.uniformLocations.uniformResolution;
  const uTranslation = programInfo.uniformLocations.uniformTranslation;
  gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);

  gl.uniform2fv(uTranslation, translation);

  gl.drawArrays(gl.TRIANGLES, 0, 18);
}

function setPositionAttribute(gl, programInfo, buffers) {
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
}

export { drawScene };
