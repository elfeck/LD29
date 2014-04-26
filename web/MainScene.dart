part of LD29;

class MainScene extends Scene {

  Quadgrid grid;

  int availableRoot = 5;
  int water = 20;
  int nitro = 10;

  int need_water = 5;
  int need_nitro = 2;
  
  MainScene() {
    grid = new Quadgrid();
    grid.initGL();
    grid.grow();
  }

  void delegateDrawGL(double delta) {
    grid.drawGL();
  }

  void delegateDoLogic(double delta) {
    if((LD29.mouseClicked || LD29.mouseDrag) && availableRoot > 0) {
      if(grid.attemptSpawnRoot()) availableRoot--;
    }
    grid.doLogic();
    grid.getWaterConnections();
  } 

}