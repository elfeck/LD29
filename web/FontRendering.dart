part of LD29;

class FontRendering {
  
  List<TexQuad> quads;
  double stepX, stepY;
  int attribLoc_1, attribLoc_2, colorConst;
  
  TextureGL letterMap;
  Buffer vb, ib;
  ShaderProgram program;

  FontRendering(Vec2 pos, String text, int size, int this.colorConst) {
    letterMap = new TextureGL.fromImage(
        new ImageElement(src: "letterMap.png"));
    stepX = (8.0 / 64);
    stepY = (8.0 / 16);
    quads = new List<TexQuad>();
    for(int i = 0; i < text.length; i++) {
      quads.add(new TexQuad(new Vec2(pos.x + i * size - DISPLAY_WIDTH * 0.5, 
                  pos.y - DISPLAY_HEIGHT * 0.5),
              size,
              generateTexCoord(text[i])
                            ));
    }
  }

  void initGL() {
    program = new ShaderProgram();
    program.initGL(textShaderVert, textShaderFrag);
    
    vb = GL.createBuffer();
    ib = GL.createBuffer();

    GL.bindBuffer(ELEMENT_ARRAY_BUFFER, ib);
    GL.bindBuffer(ARRAY_BUFFER, vb);

    attribLoc_1 = GL.getAttribLocation(program.program, "vert_position");
    GL.enableVertexAttribArray(attribLoc_1);
    GL.vertexAttribPointer(attribLoc_1, 4, FLOAT, false, 8 * 4, 0);

    attribLoc_2 = GL.getAttribLocation(program.program, "vert_tex_coord");
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

  void uploadVboDataGL(List<double> vData) {
    GL.bindBuffer(ARRAY_BUFFER, vb);
    GL.bufferDataTyped(ARRAY_BUFFER, new Float32List.fromList(vData), STATIC_DRAW);
    GL.bindBuffer(ARRAY_BUFFER, null);
  }
  
  void uploadIboDataGL(List<int> iData) {
    GL.bindBuffer(ELEMENT_ARRAY_BUFFER, ib);
    GL.bufferDataTyped(ELEMENT_ARRAY_BUFFER, new Int16List.fromList(iData), 
        STATIC_DRAW);
    GL.bindBuffer(ELEMENT_ARRAY_BUFFER, null);
  }

  void drawGL() {
    updateDataGL();
    bindGL();
    GL.viewport(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
    program.bindGL();
    program.uploadUniformMatGL("mvp_matrix", mvpMatrix);
    program.uploadUniformSamplerGL("tex_sampler", 0);
    if(letterMap.loaded) letterMap.bindGL();
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

  void updateDataGL() {
    int lower = quads.length;
    int upper = -1;
    for(TexQuad q in quads) {
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

  void updateText(String text) {
    for(int i = 0; i < text.length; i++) {
      quads[i].setTexCoords(generateTexCoord(text[i]));
    }
  }

  List<Vec3> generateTexCoord(String s) {
    double offset = 0;
    double step = 1.0 / 64;
    switch(s) {
      case "a": offset = 0 * step; break;
      case "b": offset = 1 * step; break;
      case "c": offset = 2 * step; break;
      case "d": offset = 3 * step; break;
      case "e": offset = 4 * step; break;
      case "f": offset = 5 * step; break;
      case "g": offset = 6 * step; break;
      case "h": offset = 7 * step; break;
      case "i": offset = 8 * step; break;
      case "j": offset = 9 * step; break;
      case "k": offset = 10 * step; break;
      case "l": offset = 11 * step; break;
      case "m": offset = 12 * step; break;
      case "n": offset = 13 * step; break;
      case "o": offset = 14 * step; break;
      case "p": offset = 15 * step; break;
      case "q": offset = 16 * step; break;
      case "r": offset = 17 * step; break;
      case "s": offset = 18 * step; break;
      case "t": offset = 19 * step; break;
      case "u": offset = 20 * step; break;
      case "v": offset = 21 * step; break;
      case "w": offset = 22 * step; break;
      case "x": offset = 23 * step; break;
      case "y": offset = 24 * step; break;
      case "z": offset = 25 * step; break;

      case "1": offset = 26 * step; break;
      case "2": offset = 27 * step; break;
      case "3": offset = 28 * step; break;
      case "4": offset = 29 * step; break;
      case "5": offset = 30 * step; break;
      case "6": offset = 31 * step; break;
      case "7": offset = 32 * step; break;
      case "8": offset = 33 * step; break;
      case "9": offset = 34 * step; break;
      case "0": offset = 35 * step; break;

      case "-": offset = 36 * step; break;
      case "+": offset = 37 * step; break;
      case " ": offset = 38 * step; break;
      case ":": offset = 39 * step; break;
      case ".": offset = 40 * step; break;
    }
    List<Vec3> texCoord = new List<Vec2>();
    texCoord.add(new Vec3(0 + offset, 1, colorConst));
    texCoord.add(new Vec3(step + offset, 1, colorConst));
    texCoord.add(new Vec3(step + offset, 0, colorConst));
    texCoord.add(new Vec3(0 + offset, 0, colorConst));
    return texCoord;
  }

}