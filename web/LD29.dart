library LD29;

import 'dart:html';
import 'dart:async';
import 'dart:math';
import 'dart:typed_data';
import 'dart:web_gl';

part 'Scene.dart';
part 'MainScene.dart';
part 'Entities.dart';

part 'Vecd.dart';
part 'Quad.dart';
part 'TexQuad.dart';
part 'QuadGrid.dart';
part 'ShaderProgram.dart';
part 'ShaderSource.dart';
part 'TextureGL.dart';
part 'FontRendering.dart';

RenderingContext GL;
Random rnd = new Random();

int DISPLAY_WIDTH = 500;
int DISPLAY_HEIGHT = 600;

List<double> mvpMatrix = new List.from([
  2.0 / DISPLAY_WIDTH, 0, 0, 0,
  0, 2.0 / DISPLAY_HEIGHT, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]);

int rndBet(int x, int y) {
  return rnd.nextInt(y - x) + x;
}

int rn(int x) {
  return rnd.nextInt(x);
}


class LD29 {

  CanvasElement canvas;
  Scene activeScene;
  double last;

  static bool enterPressed = false;
  static bool mouseClicked = false;
  static bool mouseDrag = false;
  static Vec2 mouseCoord = new Vec2(-1, -1);

  LD29() {
    last = 0.0;
  }

  bool initGL() {
    canvas = document.query('#canvas');
    GL = canvas.getContext("experimental-webgl");
    if(GL == null) {
      query("#footer").text = 
        "Sorry but you need WebGL Support for your browser";
      return false;
    }
    GL.clearColor(0.7, 0.3, 0.3, 1.0);
    // GL.enable(BLEND);
    // GL.blendFunc(SRC_ALPHA, ONE_MINUS_SRC_ALPHA);
    return true;
  }

  void initGame() {
    canvas.width= DISPLAY_WIDTH;
    canvas.height = DISPLAY_HEIGHT;

    query("#canvas").onClick.listen((MouseEvent e) {
      mouseClicked = true;
    });
    query("#canvas").onMouseMove.listen((MouseEvent e) {
      mouseCoord.x = e.offset.x;
      mouseCoord.y = e.offset.y;
    });
    query("#canvas").onMouseDown.listen((MouseEvent e) {
      mouseDrag = true;
    });
    query("#canvas").onMouseUp.listen((MouseEvent e) {
      mouseDrag = false;
    });

    window.onKeyUp.listen((KeyboardEvent e) {
      if(e.keyCode == KeyCode.ENTER) enterPressed = true;
    });

    activeScene = new MainScene();
  }

  void nextFrame(num now) {
    double delta = now - last;
    last = now;
    
    execDoLogic(delta);
    execDrawGL(delta);
    
    mouseClicked = false;
    enterPressed = false;
  }
  
  void execDoLogic(double delta) {
    activeScene.delegateDoLogic(delta);
  }

  void execDrawGL(double delta) {
    GL.clear(COLOR_BUFFER_BIT);
    activeScene.delegateDrawGL(delta);
    display();
  }
  
  void display() {
    window.animationFrame.then(nextFrame);
  }
}

void main() {
  LD29 game = new LD29();
  if(!game.initGL()) {
    print("could not init GL");
    return;
  }  
  game.initGame();
  game.execDrawGL(0.0);
}