part of LD29;

String quadShaderVert = '''
precision mediump float;

attribute vec4 vert_position;
attribute vec4 vert_color;

uniform mat4 mvp_matrix;

varying vec4 frag_color;

void main() {
  frag_color = vec4(vert_color);
  gl_Position = mvp_matrix * vert_position;
}
''';


String quadShaderFrag = '''
precision mediump float;

varying vec4 frag_color;

void main() {
  gl_FragColor = vec4(frag_color.xyz / 255.0, 1.0);
}
''';
