import Player from "@/Player";
import { ComputerAi, Keyboard1, Keyboard2 } from "./Keyboard";

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width!: number;
  height!: number;
  player1!: Player;
  player2!: Player;
  computerAi1!: Player;
  computerAi2!: Player;
  cellSize: number;
  columns!: number;
  rows!: number;
  eventTimer: number;
  eventInterval: number;
  eventUpdate: boolean;
  gameObjects!: Player[];
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width;
    this.height;
    this.cellSize = 50;
    this.columns;
    this.rows;

    this.eventTimer = 0;
    this.eventInterval = 200;
    this.eventUpdate = false;

    this.player1;
    this.player2;
    this.computerAi1;
    this.computerAi2;
    this.gameObjects;

    window.addEventListener("resize", (e) => {
      const target = e.currentTarget as Window;
      this.resize(target.innerWidth, target.innerHeight);
    });
    this.resize(window.innerWidth, window.innerHeight);
  }
  drawGrid() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        this.ctx.strokeRect(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }
  }
  resize(width: number, height: number) {
    this.canvas.width = Math.floor(width - (width % this.cellSize));
    this.canvas.height = Math.floor(height - (height % this.cellSize));
    this.width = Math.floor(width);
    this.height = Math.floor(height);
    this.columns = Math.round(this.width / this.cellSize);
    this.rows = Math.round(this.height / this.cellSize);
    this.player1 = new Keyboard1({
      game: this,
      x: this.columns - 1,
      y: 0,
      speedX: 0,
      speedY: 1,
      color: "magenta",
    });
    this.player2 = new Keyboard2({
      game: this,
      x: 0,
      y: 0,
      speedX: 1,
      speedY: 0,
      color: "blue",
    });
    this.computerAi1 = new ComputerAi({
      game: this,
      x: this.columns - 1,
      y: this.rows - 1,
      speedX: -1,
      speedY: 0,
      color: "yellow",
    });
    this.computerAi2 = new ComputerAi({
      game: this,
      x: 0,
      y: this.rows - 1,
      speedX: 0,
      speedY: -1,
      color: "orange",
    });
    this.gameObjects = [
      this.player1,
      this.player2,
      this.computerAi1,
      this.computerAi2,
    ];
  }
  handlePeriodicEvents(deltaTime: number) {
    if (this.eventTimer < this.eventInterval) {
      this.eventTimer += deltaTime;
      this.eventUpdate = false;
    } else {
      this.eventTimer = 0;
      this.eventUpdate = true;
    }
  }
  render(deltaTime: number) {
    this.handlePeriodicEvents(deltaTime);
    if (this.eventUpdate) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.drawGrid();
      for (const player of this.gameObjects) {
        player.draw();
        player.update();
      }
    }
  }
}

export default Game;
