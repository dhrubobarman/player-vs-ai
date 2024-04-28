export interface CTXAttributes extends CanvasRenderingContext2D {
  dash: number[];
}

export type Movement = "turnUp" | "turnDown" | "turnLeft" | "turnRight";
