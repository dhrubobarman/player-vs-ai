import Game from "@/Game";
import Player from "@/Player";
import { CTXAttributes } from "@/types/types";

class Keyboard1 extends Player {
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
    super({
      game,
      x,
      y,
      speedX,
      speedY,
      color,
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") this.movementQues.enqueue("turnUp");
      if (e.key === "ArrowDown") this.movementQues.enqueue("turnDown");
      if (e.key === "ArrowLeft") this.movementQues.enqueue("turnLeft");
      if (e.key === "ArrowRight") this.movementQues.enqueue("turnRight");
    });
  }
}

class Keyboard2 extends Player {
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
    super({
      game,
      x,
      y,
      speedX,
      speedY,
      color,
    });
    window.addEventListener("keydown", (e) => {
      if (e.key.toLocaleLowerCase() === "w")
        this.movementQues.enqueue("turnUp");
      if (e.key.toLocaleLowerCase() === "s")
        this.movementQues.enqueue("turnDown");
      if (e.key.toLocaleLowerCase() === "a")
        this.movementQues.enqueue("turnLeft");
      if (e.key.toLocaleLowerCase() === "d")
        this.movementQues.enqueue("turnRight");
    });
  }
}

class ComputerAi extends Player {
  turnTimer: number;
  turnInterval: number;
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
    super({
      game,
      x,
      y,
      speedX,
      speedY,
      color,
    });
    this.turnTimer = 0;
    this.turnInterval = Math.floor(Math.random() * this.game.columns + 1);
  }
  turn() {
    if (this.speedY === 0) {
      Math.random() > 0.5
        ? this.movementQues.enqueue("turnUp")
        : this.movementQues.enqueue("turnDown");
    } else if (this.speedX === 0) {
      Math.random() > 0.5
        ? this.movementQues.enqueue("turnLeft")
        : this.movementQues.enqueue("turnRight");
    }
  }
  update() {
    super.update();
    if (this.turnTimer < this.turnInterval) {
      this.turnTimer++;
    } else {
      this.turnInterval = Math.floor(Math.random() * this.game.columns + 1);
      this.turnTimer = 0;
      this.turn();
    }
  }
}

export { Keyboard1, Keyboard2, ComputerAi };
