part of LD29;

class Quad {

  const static int EMPTY = -1;
  const static int EARTH = 0;
  const static int SKYE = 1;
  const static int TREE = 2;
  const static int GRASS = 3;
  const static int ROOT = 4;
  const static int WATER = 5;
  const static int NITRO = 6;

  Vec2 position;
  int gx, gy;
  Vec3 color;
  int size;

  bool updated;
  bool mouseOver;
  bool watermark;

  int type;
  
  
  Quad(this.position, Vec2 gridPosition, this.size, int type) {
    gx = gridPosition.x;
    gy = gridPosition.y;
    color = null;
    setType(type);
    mouseOver = false;
    watermark = false;
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

  void setType(int type) {
    this.type = type;
    switch(type) {
      case Quad.EARTH: 
        color = new Vec3(100 + rnd.nextInt(20), 70 + rnd.nextInt(5), 50);
        break;
      case Quad.SKYE:
        color = new Vec3(120, 120, 200 + rnd.nextInt(40));
        break;
      case Quad.TREE: 
        color = new Vec3(50, 40, 20);
        break;
      case Quad.GRASS:
        color = new Vec3(80, 200 + rnd.nextInt(40), 120);
        break;
      case Quad.ROOT:
        color = new Vec3(139, 117, 34);
        break;
      case Quad.WATER:
        color = new Vec3(40, 60, 220 + rnd.nextInt(36));
        break;
      default:
        color = new Vec3(200, 40, 40);
        break;
    }
    if(mouseOver) color.add(new Vec3(50, 50, 50));
    updated = false;
  }

  void checkMouseOver(int gix, int giy) {
    if(gix == gx && giy == gy) {
      if(!mouseOver) {
        mouseOver = true;
        color.add(new Vec3(50, 50, 50));
        updated = false;
      }
    } else {
      if(mouseOver) {
        mouseOver = false;
        color.add(new Vec3(-50, -50, -50));
        updated = false;
      }
    }
  }
  
  bool isAdjacent(Quad q) {
    return (q.gx - gx).abs() <= 1 && (q.gy - gy).abs() <= 1 && q != this;
  }
}