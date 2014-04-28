part of LD29;

class Entity {
  
  Quad quad;
  bool mouseOver;

  Vec2 gridPos;

  bool dead;

  Entity(Quad this.quad) {
    mouseOver = false;
    gridPos = quad.gridPos;
    dead = false;
  }

  void checkMouseOver(int x, int y) {
    if(gridPos.x == x && gridPos.y == y) {
      if(!mouseOver) {
        mouseOver = true;
        quad.addToColor(new Vec3(50, 50, 50));
      }
    } else {
      if(mouseOver) {
        quad.addToColor(new Vec3(-50, -50, -50));
        mouseOver = false;
      }
    }
  }

  void doLogic(double delta) {

  }

  bool checkRoot(List<Tree> trees) {
    return false;
  }

  bool attachedTo(Entity e) {
    return (e.gridPos.x - gridPos.x).abs() < 2 && 
      (e.gridPos.y - gridPos.y).abs() < 2 &&
      e != this;
  }

}


class Water extends Entity {

  static Vec3 color = new Vec3(68, 84, 169);
  
  bool wasRetrieved = false;
  int capacity;
  double slowDecay = 0.1 * 0.001;
  double retrieveRate = 0.75 * 0.001;

  Water(Quad quad) : super(quad) {
    quad.setColor(color.copy());
    capacity = rndBet(5, 20);
  }

  void doLogic(double delta) {
    capacity -= slowDecay * delta;
    if(capacity <= 0) dead = true;
    wasRetrieved = false;
  }

  double retrieve(double delta) {
    if(wasRetrieved) return 0;
    wasRetrieved = true;
    double v = retrieveRate * delta;
    capacity -= v;
    return v;
  }

}


class Nitro extends Entity {
  
  bool wasRetrieved = false;
  static Vec3 color = new Vec3(198, 200, 81);
  double retrieveRate = 0.5 * 0.001;

  int capacity;
  double slowDecay = 0.05 * 0.001;

  Nitro(Quad quad) : super(quad) {
    quad.setColor(color.copy());
    capacity = rndBet(6, 12);
  }

  void doLogic(double delta) {
    capacity -= slowDecay * delta;
    if(capacity <= 0) dead = true;
    wasRetrieved = false;
  }

  dobule retrieve(double delta) {
    if(wasRetrieved) return 0;
    wasRetrieved = true;
    double v = retrieveRate * delta;
    capacity -= v;
    return v;
  }

}

class Earth extends Entity {

  static List<Vec3> colors = [
    new Vec3(169, 146, 68),
    new Vec3(169, 129, 68),
    new Vec3(169, 137, 68)
  ];

  Earth(Quad quad) : super(quad) {
    int r = rnd.nextInt(3);
    quad.setColor(colors[r].copy());
  }

  void doLogic(double delta) {

  }

  bool checkRoot(List<Tree> trees) {
    for(Tree t in trees) {
      int x = gridPos.x - t.gridPos.x;
      int y = gridPos.y - t.gridPos.y;
      if(x.abs() < 2 && y.abs() < 2) {
        return true;
      }
    }
    return false;
  }

}

class Tree extends Entity {
  
  static List<Vec3> colors = [
    new Vec3(169, 94, 68),
    new Vec3(169, 68, 68)
  ];
  bool root;

  Tree(Quad quad, this.root) : super(quad) {
    if(root) quad.setColor(colors[0].copy());
    else quad.setColor(colors[1].copy());
  }

  void doLogic(double delta) {

  }

}

class Skye extends Entity {

  static List<Vec3> colors = [
    new Vec3(163, 200, 204),
    new Vec3(162, 193, 204)
  ];
  
  Skye(Quad quad) : super(quad) {
    int r = rnd.nextInt(2);
    quad.setColor(colors[r].copy());
  }

  void doLogic(double delta) {

  }

}

class Green extends Entity {
  
  static List<Vec3> colors = [
    new Vec3(117, 169, 68),
    new Vec3(68, 169, 75)
  ];

  Green(Quad quad) : super(quad) {
    int r = rnd.nextInt(2);
    quad.setColor(colors[r].copy());
  }

  void doLogic(double delta) {

  }

}