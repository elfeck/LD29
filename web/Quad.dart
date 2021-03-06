part of LD29;

class Quad {

  Vec2 position, gridPos;
  Vec3 color;
  int size;

  bool updated;
  bool mouseOver;
  
  Quad(this.position, this.size, this.gridPos) {
    color = new Vec3(255, 255, 255);
    mouseOver = false;
  }

  void fetchGLData(int iboOffs, List<double> vData, List<int> iData) {
    vData.addAll([
      position.x, position.y, 1, 1,
      color.x, color.y, color.z, 1,
      position.x + size, position.y, 1, 1,
      color.x, color.y, color.z, 1,
      position.x + size, position.y + size, 1, 1,
      color.x, color.y, color.z, 1,
      position.x, position.y + size, 1, 1,
      color.x, color.y, color.z, 1
    ]);
    iData.addAll([
      0 + iboOffs, 1 + iboOffs, 2 + iboOffs,
      2 + iboOffs, 3 + iboOffs, 0 + iboOffs
    ]);
    updated = true;
  }

  void setColor(Vec3 ncolor) {
    this.color = ncolor;
    updated = false;
  }

  void addToColor(Vec3 ncolor) {
    this.color.add(ncolor);
    updated = false;
  }

}