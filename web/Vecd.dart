part of LD29;

class Vec2 {
  
  double x, y;

  Vec2(this.x, this.y);

  Vec2 copy() {
    return new Vec2(x, y);
  }

  String toString() {
    return "[$x $y]";
  }

  bool operator==(Vec2 other) {
    return x == other.x && y == other.y;
  }

}


class Vec3 {
  
  double x, y, z;

  Vec3(this.x, this.y, this.z);
  
  Vec3 copy() {
    return new Vec3(x, y, z);
  }
  
  String toString() {
    return "[$x $y $z]";
  }

  void add(Vec3 other) {
    x += other.x;
    y += other.y;
    z += other.z;
  }

}
