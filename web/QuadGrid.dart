part of LD29;

class Quadgrid {

  const static int size = 20;
  const MAX_GRID_W = DISPLAY_WIDTH / size;
  const MAX_GRID_H = DISPLAY_HEIGHT / size;

  int attribLoc_1;
  int attribLoc_2;

  double offset = 26;
  double scroll = 0;
  Vec2 fixedOffs = new Vec2(-DISPLAY_WIDTH / 2.0, -DISPLAY_HEIGHT / 2.0);

  List<Quad> quads;
  
  Buffer vb, ib;
  ShaderProgram program;

  Quadgrid() {
    quads = new List<Quad>();
    initQuads();
  }

  void initQuads() {
    int totalHeight = DISPLAY_HEIGHT + size * offset;
    int totalWidth = DISPLAY_WIDTH;
    for(int y = 0; y < totalHeight / size; y++) {
      for(int x = 0; x < totalWidth / size; x++) {
        Vec2 pos = new Vec2(x * size, y * size);
        Vec2 gridPos = new Vec2(x, y);
        quads.add(new Quad(pos, size, gridPos));
      } 
    }
  }
  
  void initGL() {
    program = new ShaderProgram();
    program.initGL(quadShaderVert, quadShaderFrag);

    vb = GL.createBuffer();
    ib = GL.createBuffer();
    
    GL.bindBuffer(ELEMENT_ARRAY_BUFFER, ib);
    GL.bindBuffer(ARRAY_BUFFER, vb);

    attribLoc_1 = GL.getAttribLocation(program.program, "vert_position");
    GL.enableVertexAttribArray(attribLoc_1);
    GL.vertexAttribPointer(attribLoc_1, 4, FLOAT, false, 8 * 4, 0);

    attribLoc_2 = GL.getAttribLocation(program.program, "vert_color");
    GL.enableVertexAttribArray(attribLoc_2);
    GL.vertexAttribPointer(attribLoc_2, 4, FLOAT, false, 8 * 4, 4 * 4);

    GL.bindBuffer(ARRAY_BUFFER, null);
    GL.bindBuffer(ELEMENT_ARRAY_BUFFER, null);

    List<double> vData = new List<double>();
    List<int> iData = new List<int>();
    for(int i = 0; i < quads.length; i++) {
      quads[i].fetchGLData(i * 4, vData, iData);
    }
    uploadVboDataGL(vData);
    uploadIboDataGL(iData);
  }

  void updateDataGL() {
    int lower = quads.length;
    int upper = -1;
    for(Quad q in quads) {
      if(!q.updated) {
        lower = min(lower, quads.indexOf(q));
        upper = max(upper, quads.indexOf(q));
      }
    }
    if(upper == -1) return;
    List<double> vData = new List<double>();
    List<int> iData = new List<int>();
    for(int i = lower; i <= upper; i++) {
      quads[i].fetchGLData(i * 4, vData, iData);
    }
    GL.bindBuffer(ARRAY_BUFFER, vb);
    GL.bufferSubDataTyped(ARRAY_BUFFER, lower * 8 * 4 * 4, 
        new Float32List.fromList(vData));
    GL.bindBuffer(ARRAY_BUFFER, null);
  }

  void uploadVboDataGL(List<double> vData) {
    GL.bindBuffer(ARRAY_BUFFER, vb);
    GL.bufferDataTyped(ARRAY_BUFFER, new Float32List.fromList(vData), STATIC_DRAW);
    GL.bindBuffer(ARRAY_BUFFER, null);
  }
  
  void uploadIboDataGL(List<int> iData) {
    GL.bindBuffer(ELEMENT_ARRAY_BUFFER, ib);
    GL.bufferDataTyped(ELEMENT_ARRAY_BUFFER, new Int16List.fromList(iData), STATIC_DRAW);
    GL.bindBuffer(ELEMENT_ARRAY_BUFFER, null);
  }

  void drawGL() {
    updateDataGL();
    bindGL();
    GL.viewport(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
    program.bindGL();
    program.uploadUniformMatGL("mvp_matrix", mvpMatrix);
    program.uploadUniformFloatGL("offset", scroll * size);
    program.uploadUniformVec2GL("fixed_offs", fixedOffs);
    GL.drawElements(TRIANGLES, 6 * quads.length, UNSIGNED_SHORT, 0);
    program.unbindGL();
    unbindGL();
  }

  void bindGL() {
    GL.bindBuffer(ELEMENT_ARRAY_BUFFER, ib);
    GL.bindBuffer(ARRAY_BUFFER, vb);

    //GL.enableVertexAttribArray(attribLoc_1);
    GL.vertexAttribPointer(attribLoc_1, 4, FLOAT, false, 8 * 4, 0);
    // GL.enableVertexAttribArray(index);
    GL.vertexAttribPointer(attribLoc_2, 4, FLOAT, false, 8 * 4, 4 * 4);
  }

  void unbindGL() {
    GL.bindBuffer(ELEMENT_ARRAY_BUFFER, null);
    GL.bindBuffer(ARRAY_BUFFER, null);
  }
  
  Quad quadAt(int x, int y) {
    return quads[(y + offset) * MAX_GRID_W + x];
  }

  Quad quadAtOffs(int x, int y) {
    return quads[y * MAX_GRID_W + x];
  }

}
