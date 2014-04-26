part of LD29;

class Quadgrid {

  static List<Vec2> growthList = [
    new Vec2(11, 2),  new Vec2(11, 1), new Vec2(13, 2),
    new Vec2(11, 0), new Vec2(10, 2), new Vec2(13, 1),
    new Vec2(14, 2), new Vec2(10, 1), new Vec2(9, 2),
    new Vec2(13, 0), new Vec2(14, 1), new Vec2(10, 0),
    new Vec2(8, 2), new Vec2(14, 0), new Vec2(9, 1),
    new Vec2(15, 2),  new Vec2(15, 1), new Vec2(16, 2),
    new Vec2(15, 0), new Vec2(16, 1), new Vec2(9, 0),
    new Vec2(7, 2), new Vec2(8, 1), new Vec2(8, 0),
  ];

  const static int size = 20;
  const MAX_GRID_W = DISPLAY_WIDTH / size;
  const MAX_GRID_H = DISPLAY_HEIGHT / size;

  List<Quad> quads;
  
  Buffer vb, ib;
  ShaderProgram program;

  int growth;

  Quadgrid() {
    quads = new List<Quad>();
    initQuads();

    growth = -1;
  }

  void initQuads() {
    for(int x = 0; x < DISPLAY_WIDTH / size; x++) {
      for(int y = DISPLAY_HEIGHT / size - 1; y >= 0; y--) {
        Vec2 gridPos = new Vec2(x, DISPLAY_HEIGHT / size - y - 1);
        quads.add(new Quad(
                new Vec2(x * size - DISPLAY_WIDTH * 0.5, 
                    y * size - DISPLAY_HEIGHT * 0.5),
                gridPos,
                size,
                Quad.EMPTY
                           ));
      }
    }
  }

  void grow() {
    if(growth == -1) {
      initTree();
      growth++;
    } else if(growth < growthList.length) {
      quads[toListIndex(growthList[growth].x, growthList[growth].y)].setType(Quad.TREE);
      growth++;
    }
  }

  void initGL() {
    program = new ShaderProgram();
    program.initGL(quadShaderVert, quadShaderFrag);

    vb = GL.createBuffer();
    ib = GL.createBuffer();
    
    GL.bindBuffer(ELEMENT_ARRAY_BUFFER, ib);
    GL.bindBuffer(ARRAY_BUFFER, vb);

    int index = GL.getAttribLocation(program.program, "vert_position");
    GL.enableVertexAttribArray(index);
    GL.vertexAttribPointer(index, 4, FLOAT, false, 8 * 4, 0);

    index = GL.getAttribLocation(program.program, "vert_color");
    GL.enableVertexAttribArray(index);
    GL.vertexAttribPointer(index, 4, FLOAT, false, 8 * 4, 4 * 4);

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
    GL.bindBuffer(ELEMENT_ARRAY_BUFFER, ib);
    GL.viewport(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
    program.bindGL();
    program.uploadUniformMatGL("mvp_matrix", mvpMatrix);
    GL.drawElements(TRIANGLES, 6 * quads.length, UNSIGNED_SHORT, 0);
    program.unbindGL();
    GL.bindBuffer(ELEMENT_ARRAY_BUFFER, null);
  }

  void toListIndex(int y, int x) {
    return y * MAX_GRID_H + x;
  }

  bool isBetween(int x, int l, int u) {
    return x >= l && x <= u;
  }

  void initTree() {
    quads[toListIndex(12, 0)].setType(Quad.TREE);
    quads[toListIndex(12, 1)].setType(Quad.TREE);
    quads[toListIndex(12, 2)].setType(Quad.TREE);
    for(Quad q in quads) {
      if(q.type != Quad.EMPTY) continue;
      if(q.gy == 1 && !isBetween(q.gx, 10, 14)) {
        int r = rnd.nextInt(10);
        if(r < 2) q.setType(Quad.GRASS);
      }
    }
    for(Quad q in quads) {
      if(q.type != Quad.EMPTY) continue;
      if(q.gy < 1) q.setType(Quad.SKYE);
      if(q.gy == 1) {
        int r = rnd.nextInt(10);
        if(r < 5) q.setType(Quad.SKYE);
      }
      if(q.gy == 2 && !isBetween(q.gx, 10, 14)) {
        int r = rnd.nextInt(10);
        if(r < 1) q.setType(Quad.SKYE);
      }
    }
    for(int i = 0; i < 2; i++) {
      int r = rnd.nextInt(6);
      r = i == 0 ? -r : r;
      int s = rnd.nextInt(8);
      for(Quad q in quads) {
        if(q.gy == 5 && q.gx == 12 + r) q.setType(Quad.WATER);
        if(s == 0 && q.gy == 5 && q.gx == 12 + r - 1) q.setType(Quad.WATER);
      }
    }
    for(Quad q in quads) {
      if(q.type != Quad.EMPTY) continue;
      q.setType(Quad.EARTH);
    }
  }

  bool attemptSpawnRoot() {
    int mgX = (LD29.mouseCoord.x / size).floor();
    int mgY = (LD29.mouseCoord.y / size).floor();
    bool isokay = false;
    if(quads[toListIndex(mgX, mgY)].type == Quad.EARTH && mgY > 2) {
      for(int x = mgX - 1; x <= mgX + 1; x++) {
        for(int y = mgY - 1; y <= mgY + 1; y++) {
          if(x < 0 || y < 0 || x >= MAX_GRID_W || y >= MAX_GRID_H) {
            continue;
          } else {
            if(quads[toListIndex(x, y)].type == Quad.TREE || 
                quads[toListIndex(x, y)].type == Quad.ROOT) isokay = true;
          }
        }
      }
      if(isokay) quads[toListIndex(mgX, mgY)].setType(Quad.ROOT);
    }
    return isokay;
  }

  void doLogic() {
    int mgX = (LD29.mouseCoord.x / size).floor();
    int mgY = (LD29.mouseCoord.y / size).floor();
    for(Quad q in quads) {
      if(q.gy < 3) continue;
      q.checkMouseOver(mgX, mgY);
    }
  }

  int getWaterConnections() {
    int wat = 0;
    List<Quad> water = new List<Quad>();
    for(Quad q in quads) {
      if(q.type == Quad.WATER && !water.contains(q)) water.add(q);
    }
    for(Quad q in quads) {
      for(Quad w in water) {
        if(q.type == Quad.ROOT && q.isAdjacent(w) && !w.watermark) {
          wat++;
          w.watermark = true;
        }
      }
    }
    for(Quad w in water) w.watermark = false;
    return wat;
  }

}
