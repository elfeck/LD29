part of LD29;

class TextureGL {
  
  Texture tex;
  int width, height;
  bool loaded;

  TextureGL.fromImage(ImageElement img) {
    tex = GL.createTexture();
    loaded = false;
    img.onLoad.listen((e) {
      GL.bindTexture(TEXTURE_2D, tex);
      GL.texImage2DImage(TEXTURE_2D, 0, RGBA, RGBA, UNSIGNED_BYTE, img);
      GL.texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST);
      GL.texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST);
      GL.bindTexture(TEXTURE_2D, null);
      width = img.width;
      height = img.height;
      loaded = true;
    });
  }

  TextureGL.empty() {

  }
  
  void bindGL() {
    GL.bindTexture(TEXTURE_2D, tex);
  }
  
  void unbindGL() {
    GL.bindTexture(TEXTURE_2D, null);
  }

}