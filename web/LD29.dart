library LD29;

import 'dart:html';
import 'dart:async';
import 'dart:math';
import 'dart:typed_data';
import 'dart:web_gl';

part 'Scene.dart';
part 'MainScene.dart';

part 'Vecd.dart';
part 'Quad.dart';
part 'Quadgrid.dart';
part 'ShaderProgram.dart';
part 'ShaderSource.dart';

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


class LD29 {

  CanvasElement canvas;
  Scene activeScene;
  double last;

  static bool mouseClicked = false;
  static bool mouseDrag = false;
  static Vec2 mouseCoord = new Vec2(0, 0);

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

    activeScene = new MainScene();
  }

  void nextFrame(num now) {
    double delta = now - last;
    last = now;
    
    execDoLogic(delta);
    execDrawGL(delta);
    
    mouseClicked = false;
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