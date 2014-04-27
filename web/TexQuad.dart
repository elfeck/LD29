part of LD29;

class TexQuad {

  Vec2 position;
  List<Vec3> texCoord;
  int size;

  bool updated;
  
  TexQuad(this.position, this.size, List<Vec3> this.texCoord) {

  }

  void fetchGLData(int iboOffs, List<double> vData, List<int> iData) {
    vData.addAll([
      position.x, position.y, 1, 1,
      texCoord[0].x, texCoord[0].y, texCoord[0].z, 0,
      position.x + size, position.y, 1, 1,
      texCoord[1].x, texCoord[1].y, texCoord[1].z, 0,
      position.x + size, position.y + size, 1, 1,
      texCoord[2].x, texCoord[2].y, texCoord[2].z, 0,
      position.x, position.y + size, 1, 1,
      texCoord[3].x, texCoord[3].y, texCoord[3].z, 0,
    ]);
    iData.addAll([
      0 + iboOffs, 1 + iboOffs, 2 + iboOffs,
      2 + iboOffs, 3 + iboOffs, 0 + iboOffs
    ]);
    updated = true;
  }

  void setTexCoords(List<Vec3> texCoo) {
    texCoord = texCoo;
    updated = false;
  }

}
