part of LD29;

class MainScene extends Scene {

  Quadgrid grid;

  static List<Vec2> growthList = [
    new Vec2(11, 2),  new Vec2(11, 1), new Vec2(13, 2),
    new Vec2(11, 0), new Vec2(10, 2), new Vec2(13, 1),
    new Vec2(14, 2), new Vec2(10, 1), new Vec2(9, 2),
    new Vec2(13, 0), new Vec2(14, 1), new Vec2(10, 0),
    new Vec2(8, 2), new Vec2(14, 0), new Vec2(9, 1),
    new Vec2(15, 2),  new Vec2(15, 1), new Vec2(16, 2),
    new Vec2(15, 0), new Vec2(16, 1), new Vec2(9, 0),
    new Vec2(7, 2), new Vec2(8, 1), new Vec2(8, 0),
  ];

  List<List<Entity>> allEntities;
  List<Water> allWater;
  List<Nitro> allNitro;
  List<Tree> allTree;

  FontRendering waterText;
  FontRendering nitroText;
  FontRendering rootText;

  List<FontRendering> tut = new List<FontRendering>(7);
  FontRendering f1, f2, f3, f4, f5;

  int availableRoot = 5;
  double water = 20;
  double nitro = 5;
  int growth = 0;
  
  bool once = true;

  int waterSpawnTime = 5 * 1000;
  int nitroSpawnTime = 10 * 1000;
  int rootSpawnTime = 2 * 1000;
  int growthSpawnTime = 2.5 * 1000;

  int wTimePassed = 0;
  int nTimePassed = 0;
  int rTimePassed = 0;
  int gTimePassed = 0;

  double waterPerMs = 0.45 * 0.001;
  double nitroPerMs = 0.1 * 0.001;
  
  bool started = false;
  bool begin = false;
  bool end = false;
  bool won = false;
  bool donedone = false;
  double scrollspeed = (5.0 / Quadgrid.size) * 0.001;
  
  MainScene() {
    grid = new Quadgrid();
    grid.initGL();

    allWater = new List<Water>();
    allNitro = new List<Nitro>();
    allTree = new List<Tree>();

    waterText = new FontRendering(new Vec2(345, 2), "h2o:     ", 16, 1);
    nitroText = new FontRendering(new Vec2(10, 2), "n2:     ", 16, 2);
    rootText = new FontRendering(new Vec2(190, 2), "root:     ", 16, 3);

    waterText.initGL();
    nitroText.initGL();
    rootText.initGL();

    allEntities = new List<List<Entity>>(grid.MAX_GRID_W);
    for(int i = 0; i < grid.MAX_GRID_W; i++) {
      allEntities[i] = new List<Entity>(grid.MAX_GRID_H);
    }
    initScene();
    initAbove();
    initTut();
  }

  void delegateDrawGL(double delta) {
    grid.drawGL();
    if(donedone && !once) {
      f1.drawGL();
      f2.drawGL();
      f3.drawGL();
      if(f4 != null) f4.drawGL();
      if(f5 != null) f5.drawGL();
      return;
    }
    if(!started) {
      for(FontRendering f in tut) {
        if(f != null) f.drawGL();
      }
    }
    if(begin && !end) {
      waterText.drawGL();
      nitroText.drawGL();
      rootText.drawGL();
    }
  }

  void delegateDoLogic(double delta) {
    if(donedone) initEnd();
    if(!started) {
      if(LD29.enterPressed) {
        started = true;
      }
      return;
    }
    if(!begin) {
      scrollDown(delta);
    }
    if(end) {
      scrollUp(delta);
      return;
    }
    if(begin) {
      /* mosue shit */
      int mX = (LD29.mouseCoord.x / Quadgrid.size).floor();
      int mY = (LD29.mouseCoord.y / Quadgrid.size).floor() + grid.scroll;
      if(LD29.mouseDrag && availableRoot > 0 && mX >= 0 && mY >= 0) {
        if(allEntities[mX][mY - grid.offset].checkRoot(allTree)) {
          addTree(mX, mY - grid.offset, true);
          availableRoot--;
        }
      }
      for(List<Entity> le in allEntities) {
        for(Entity e in le) {
          e.checkMouseOver(mX, mY);
          e.doLogic(delta);
        }
      }
      /* consume shit */
      consume(delta);
      handleSpawn(delta);
      handleRoot(delta);
      retrieveWater(delta);
      retrieveNitro(delta);
      if(water <= 0) {
        water = 0.0;
        end = true;
      }
      if(nitro <= 0) {
        nitro = 0.0;
        end = true;
      }
      /** removal */
      handleGrowth(delta);
      Entity e;
      for(int j = 0; j < allEntities.length; j++) {
        for(int i = 0; i < allEntities[j].length; i++) {
          e = allEntities[j][i];
          if(e.dead) {
            if(e is Water) allWater.remove(e);
            if(e is Nitro) allNitro.remove(e);
            if(e is Tree) allTree.remove(e);
            allEntities[j][i] = new Earth(grid.quadAt(j, i));
            int l = allWater.length;
          }
        }
      }
      /** TeXT */
      updateText();
    }
  } 

  void initScene() {
    int r = 0;
    addTree(12, 0, false);
    addTree(12, 1, false);
    addTree(12, 2, false);
    for(int y = 1; y < 3; y++) {
      for(int x = 0; x < grid.MAX_GRID_W; x++) {
        if(x > 8 && x < 16) continue;
        r = rnd.nextInt(10);
        if(r < 3 && allEntities[x][y] == null) {
          allEntities[x][y] = new Green(grid.quadAt(x, y));
        }
      }
    }
    for(int y = 0; y < 2; y++) {
      for(int x = 0; x < grid.MAX_GRID_W; x++) {
        if(allEntities[x][y] == null) allEntities[x][y] = 
                                        new Skye(grid.quadAt(x, y));
      }   
    }
    for(int x = 0; x < grid.MAX_GRID_W; x++) {
      r = rnd.nextInt(10);
      if(r < 5 && allEntities[x][2] == null && (x < 10 || x > 14)) {
        allEntities[x][2] = new Skye(grid.quadAt(x, 2));
      }
    }
    /* Below 2  FIXED */
    int fixedX = rndBet(8, 17);
    int fixedY = rndBet(4, 6);
    for(int i = 0; i < 3; i++) {
      int x = fixedX + i;
      int y = fixedY;
      Water w = new Water(grid.quadAt(x, y));
      allEntities[x][y] = w;
      allWater.add(w);
    }
    fixedX = rndBet(4, grid.MAX_GRID_W - 4);
    fixedY = rndBet(8, 14);
    Nitro n = new Nitro(grid.quadAt(fixedX, fixedY));
    allEntities[fixedX][fixedY] = n;
    allNitro.add(n);
    
    n = new Nitro(grid.quadAt(fixedX - 1, fixedY));
    allEntities[fixedX - 1][fixedY] = n;
    allNitro.add(n);

    for(int y = 0; y < grid.MAX_GRID_H; y++) {
      for(int x = 0; x < grid.MAX_GRID_W; x++) {
        if(allEntities[x][y] == null) allEntities[x][y] = 
                                        new Earth(grid.quadAt(x, y));
      }
    }
  }

  void addTree(int x, int y, bool root) {
    allEntities[x][y] = new Tree(grid.quadAt(x, y), root);
    allTree.add(allEntities[x][y]);
  }

  void handleSpawn(double delta) {
    if(wTimePassed >= waterSpawnTime) {
      wTimePassed = 0;
      spawnWater();
      waterSpawnTime = rndBet(5, 11) * 1000;
    }
    if(nTimePassed >= nitroSpawnTime) {
      nTimePassed = 0;
      spawnNitro();
      nitroSpawnTime = rndBet(8, 14) * 1000;
    }
    wTimePassed += delta;
    nTimePassed += delta;
  }

  void spawnWater() {
    int size = rndBet(1, 7);
    print("spawn water");
    int ry = rndBet(4, grid.MAX_GRID_H - 1);
    int rx = rndBet(0, grid.MAX_GRID_W);
    while(!(allEntities[rx][ry] is Earth)) {
      rx = rndBet(0, grid.MAX_GRID_W);
      ry = rndBet(4, grid.MAX_GRID_H);
    }
    for(int i = (rx - size / 2.0).floor(); i < (rx + size / 2.0).floor(); i++) {
      if(i > 0 && i < grid.MAX_GRID_W) {
        if(allEntities[i][ry] is Earth) {
          Water w = new Water(grid.quadAt(i, ry));
          allEntities[i][ry] = w; 
          allWater.add(w);
        }
      }
    }
  }
  
  void spawnNitro() {
    int size = rndBet(1, 5);
    print("spawn nitro");
    int ry = rndBet(7, grid.MAX_GRID_H - 1);
    int rx = rndBet(0, grid.MAX_GRID_W);
    while(!(allEntities[rx][ry] is Earth)) {
      rx = rndBet(0, grid.MAX_GRID_W);
      ry = rndBet(4, grid.MAX_GRID_H);
    }
    for(int i = (rx - size / 2.0).floor(); i < (rx + size / 2.0).floor(); i++) {
      if(i > 0 && i < grid.MAX_GRID_W) {
        if(allEntities[i][ry] is Earth) {
          Water w = new Nitro(grid.quadAt(i, ry));
          allEntities[i][ry] = w; 
          allNitro.add(w);
        }
      }
    }
  }

  void handleRoot(double delta) {
    if(rTimePassed >= rootSpawnTime) {
      rTimePassed = 0;
      availableRoot += 1;
    }
    rTimePassed += delta;
  }

  void updateText() {
    String t = numberToString(water);
    waterText.updateText("h2o: " + t);

    t = numberToString(nitro);
    nitroText.updateText("n2: " + t);
    
    t = numberToString(availableRoot);
    rootText.updateText("root: " + t);
  }

  String numberToString(num number) {
    String s = "";
    String numb = "$number";
    for(int i = 0; i < min(numb.length, 4); i++) {
      s = s + numb[i];
    }
    while(s.length < 4) {
      /** FUCCKKKCKCKCKK THIS HSIIITIHTIHSAI */
      s = s + " ";
    }
    return s;
  }

  void consume(double delta) {
    water -= waterPerMs * delta * sqrt(1.0 + growth * 2);
    nitro -= nitroPerMs * delta * sqrt(1.0 + growth * 2);;
  }

  void retrieveWater(double delta) {
    for(Water w in allWater) {
      for(Tree t in allTree) {
        if(w.attachedTo(t)) water += w.retrieve(delta);
      }
    }
  }
  
  void retrieveNitro(double delta) {
    for(Nitro w in allNitro) {
      for(Tree t in allTree) {
        if(w.attachedTo(t)) nitro += w.retrieve(delta);
      }
    }
  }

  void handleGrowth(double delta) {
    if(water >= 10 && nitro >= 10) {
      if(gTimePassed >= growthSpawnTime) {
        gTimePassed = 0;
        grow();
      }
      gTimePassed += delta; 
    }
  }

  void grow() {
    print("$grow");
    water -= 5;
    nitro -= 5;
    if(growth < growthList.length) {
      allEntities[growthList[growth].x][growthList[growth].y] = new Tree(grid.quadAt(
              growthList[growth].x,
              growthList[growth].y),
              false
                                                                         );
      growth++;
    } else {
      end = true;
      won = true;
    }
  }

  void initAbove() {
    int r;
    for(int y = 0; y < grid.offset; y++) {
      for(int x = 0; x < grid.MAX_GRID_W; x++) {
        r = rnd.nextInt(2);
        grid.quadAtOffs(x, y).setColor(Skye.colors[r].copy());
      }
    }
    for(int x = 11; x < 13; x++) {
      for(int y = grid.offset - 2; y < grid.offset; y++) {
        r = rnd.nextInt(2);
        grid.quadAtOffs(x, y).setColor(Green.colors[r].copy());
      }
    }
  }

  void scrollDown(double delta) {
    grid.scroll += grid.offset * scrollspeed * delta;
    if(grid.scroll >= grid.offset) {
      grid.scroll = grid.offset;
      begin = true;
      for(int x = 11; x < 13; x++) {
        for(int y = grid.offset - 2; y < grid.offset; y++) {
          int r = rnd.nextInt(2);
          grid.quadAtOffs(x, y).setColor(Skye.colors[r].copy());
        }
      }
    }
  }

  void scrollUp(double delta) {
    grid.scroll -= grid.offset * scrollspeed * 2 * delta;
    if(grid.scroll <= 0) {
      grid.scroll = 0;
      donedone = true;
    }
  }

  void initTut() {
    List<String> s = new List<String>(7);
    s[0] = "grow little tree. grow";
    s[1] = "a game for ludum dare 29 by sebastian kreisel";
    s[2] = "-- connect the roots to water or ammonium --";
    s[3] = "-- if your tree has was it needs. it grows --";
    s[4] = "-- if your tree  lacks something. it dies --";
    s[5] = "give your tree a long and happy life";
    s[6] = "press enter to start";
    
    tut[0] = new FontRendering(new Vec2((DISPLAY_WIDTH - s[0].length * 18 / 2.0) -
            DISPLAY_WIDTH / 2.0, 500),  s[0], 18, 0);
    tut[1] = new FontRendering(new Vec2((DISPLAY_WIDTH - s[1].length * 8 / 2.0) -
            DISPLAY_WIDTH / 2.0, 470),  s[1], 8, 0);
    tut[2] = new FontRendering(new Vec2((DISPLAY_WIDTH - s[2].length * 10 / 2.0) -
            DISPLAY_WIDTH / 2.0, 420),  s[2], 10, 0);
    tut[3] = new FontRendering(new Vec2((DISPLAY_WIDTH - s[3].length * 10 / 2.0) -
            DISPLAY_WIDTH / 2.0, 405),  s[3], 10, 0);
    tut[4] = new FontRendering(new Vec2((DISPLAY_WIDTH - s[4].length * 10 / 2.0) -
            DISPLAY_WIDTH / 2.0, 390),  s[4], 10, 0);
    tut[5] = new FontRendering(new Vec2((DISPLAY_WIDTH - s[5].length * 13 / 2.0) -
            DISPLAY_WIDTH / 2.0, 350),  s[5], 13, 0);    
    tut[6] = new FontRendering(new Vec2((DISPLAY_WIDTH - s[6].length * 20 / 2.0) -
            DISPLAY_WIDTH / 2.0, 200),  s[6], 20, 0);
    tut[0].initGL();
    tut[1].initGL();
    tut[2].initGL();
    tut[3].initGL();
    tut[4].initGL();
    tut[5].initGL();
    tut[6].initGL();
  }

  void initEnd() {
    if(!once) return;
    String s1, s3;
    if(won) {
      s1 = "your tree had a fulfilled life";
      s3 = "it died happy and in peace";
      String s4 = "here you should see your tree. but 48h were not enough.";
      String s5 =  "i am sorry";
      f4 = new FontRendering(new Vec2((DISPLAY_WIDTH - s4.length * 8 / 2.0) -
            DISPLAY_WIDTH / 2.0, 300),  s4, 8, 0);  
      f4.initGL();
      f5 = new FontRendering(new Vec2((DISPLAY_WIDTH - s5.length * 8 / 2.0) -
            DISPLAY_WIDTH / 2.0, 290),  s5, 8, 0);  
      f5.initGL();
    } else {
      s1 = "your tree lived fast and died young";
      s3 = "they say he perished way too soon";
    }
    String s2 = "thanks for playing. reload the page to play again";
    f1 = new FontRendering(new Vec2((DISPLAY_WIDTH - s1.length * 13 / 2.0) -
            DISPLAY_WIDTH / 2.0, 550),  s1, 13, 0);    
    f3 = new FontRendering(new Vec2((DISPLAY_WIDTH - s3.length * 13 / 2.0) -
            DISPLAY_WIDTH / 2.0, 530),  s3, 13, 0);
    f2 = new FontRendering(new Vec2((DISPLAY_WIDTH - s2.length * 8 / 2.0) -
            DISPLAY_WIDTH / 2.0, 490),  s2, 8, 0);
    f1.initGL();
    f2.initGL();
    f3.initGL();
    once = false;
  }

}