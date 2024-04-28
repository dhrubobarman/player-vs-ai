import Game from "@/Game";
import { CTXAttributes, Movement } from "@/types/types";
import Queue from "./utils/Queue";

class Player {
  game: Game;
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  speedX: number;
  speedY: number;
  width: number;
  height: number;
  color: CTXAttributes["fillStyle"];
  movementQues: Queue<Movement>;
  moving: boolean;
  constructor({
    game,
    x,
    y,
    speedX,
    speedY,
    color = "red",
  }: {
    game: Game;
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    color?: CTXAttributes["fillStyle"];
  }) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.ctx = this.game.ctx;
    this.speedX = speedX;
    this.speedY = speedY;
    this.width = this.game.cellSize;
    this.height = this.game.cellSize;
    this.color = color;
    this.movementQues = new Queue<Movement>();
    this.moving = true;
  }
  update() {
    this.callQues();
    // Boundary Check
    if (
      (this.x <= 0 && this.speedX < 0) ||
      (this.x >= this.game.columns - 1 && this.speedX > 0) ||
      (this.y <= 0 && this.speedY < 0) ||
      (this.y >= this.game.rows - 1 && this.speedY > 0)
    ) {
      this.moving = false;
    }

    if (this.moving) {
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x * this.game.cellSize,
      this.y * this.game.cellSize,
      this.width,
      this.height
    );
    this.ctx.fill();
  }
  turnUp() {
    this.speedX = 0;
    this.speedY = -1;
  }
  turnDown() {
    this.speedX = 0;
    this.speedY = 1;
  }
  turnLeft() {
    this.speedX = -1;
    this.speedY = 0;
  }
  turnRight() {
    this.speedX = 1;
    this.speedY = 0;
  }
  callQues() {
    this.moving = true;
    if (!this.movementQues.isEmpty()) {
      let movement = this.movementQues.dequeue();
      if (this.movementQues.size() > 4) {
        movement = this.movementQues.peek();
        this.movementQues.clear();
      }
      switch (movement) {
        case "turnUp":
          this.turnUp();
          break;
        case "turnDown":
          this.turnDown();
          break;
        case "turnLeft":
          this.turnLeft();
          break;
        case "turnRight":
          this.turnRight();
          break;
      }
    }
  }
}

export default Player;
