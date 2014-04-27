part of LD29;

class ShaderProgram {
  
  Program program;
  Shader vert, frag;

  ShaderProgram() {
    
  }

  void initGL(String vertSrc, String fragSrc) {
    vert = GL.createShader(VERTEX_SHADER);
    GL.shaderSource(vert, vertSrc);
    GL.compileShader(vert);
    if(!GL.getShaderParameter(vert, COMPILE_STATUS)) {
      print("Error in compileShader vert: " + GL.getShaderInfoLog(vert));
    }
    frag = GL.createShader(FRAGMENT_SHADER);
    GL.shaderSource(frag, fragSrc);
    GL.compileShader(frag);
    if(!GL.getShaderParameter(frag, COMPILE_STATUS)) {
      print("Error in compileShader frag: " + GL.getShaderInfoLog(frag));
    }
    program = GL.createProgram();
    GL.attachShader(program, vert);
    GL.attachShader(program, frag);
    GL.linkProgram(program);
    if(!GL.getProgramParameter(program, LINK_STATUS)) {
      print("Error in linkProgram: " + GL.getProgramInfoLog(program));
    }
  }

  void bindGL() {
    GL.useProgram(program);
  }

  void unbindGL() {
    GL.useProgram(null);
  }

  UniformLocation getUniformLocationGL(String name) {
    return GL.getUniformLocation(program, name);
  }

  void uploadUniformMatGL(String name, List<double> mat) {
    GL.uniformMatrix4fv(getUniformLocationGL(name), false,
        new Float32List.fromList(mat));
  }

  void uploadUniformSamplerGL(String name, int loc) {
    GL.uniform1i(getUniformLocationGL(name), loc);
  }

}