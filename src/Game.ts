class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;

    window.addEventListener("resize", (e) => {
      const target = e.currentTarget as Window;
      this.resize(target.innerWidth, target.innerHeight);
    });
  }
  resize(width: number, height: number) {
    this.canvas.width = Math.floor(width);
    this.canvas.height = Math.floor(height);
    this.width = Math.floor(width);
    this.height = Math.floor(height);
  }
  render() {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(100, 100, 100, 150);
  }
}

export default Game;
