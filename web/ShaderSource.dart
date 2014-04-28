part of LD29;

String quadShaderVert = '''
precision mediump float;

attribute vec4 vert_position;
attribute vec4 vert_color;

uniform mat4 mvp_matrix;
uniform float offset;
uniform vec2 fixed_offs;

varying vec4 frag_color;

void main() {
  frag_color = vec4(vert_color);
  vec4 pos = vec4((vert_position.x + fixed_offs.x),
                  -(vert_position.y + fixed_offs.y - offset),
                  vert_position.zw);
  gl_Position = mvp_matrix * pos;
}
''';

String quadShaderFrag = '''
precision mediump float;

varying vec4 frag_color;

void main() {
  gl_FragColor = vec4(frag_color.xyz / 255.0, 1.0);
}
''';

String textShaderVert = '''
precision mediump float;

attribute vec4 vert_position;
attribute vec4 vert_tex_coord;

uniform mat4 mvp_matrix;

varying vec4 frag_tex_coord;

void main() {
  frag_tex_coord = vec4(vert_tex_coord.xyzw);
  gl_Position = mvp_matrix * vert_position;
}
''';

String textShaderFrag = '''
precision mediump float;

uniform sampler2D tex_sampler;

const vec3 color0 = vec3(0.0, 0.0, 0.0);
const vec3 color1 = vec3(0.266, 0.329, 0.663) * 0.8;
const vec3 color2 = vec3(0.743, 0.763, 0.267) * 0.5;
const vec3 color3 = vec3(0.663, 0.267, 0.267) * 0.8;

varying vec4 frag_tex_coord;

void main() {
  vec3 color;
  if(frag_tex_coord.z == 0.0) color = vec3(color0);
  if(frag_tex_coord.z == 1.0) color = vec3(color1);
  if(frag_tex_coord.z == 2.0) color = vec3(color2);
  if(frag_tex_coord.z == 3.0) color = vec3(color3);
  vec3 tex_color = texture2D(tex_sampler, frag_tex_coord.xy).xyz;
  if(tex_color != vec3(1.0, 0.0, 1.0)) gl_FragColor = vec4(color.xyz, 1.0);
  else discard;
}
''';