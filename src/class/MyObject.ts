import Position from "./Position";

abstract class MyObject {
  width: number;
  height: number;
  position: Position;
  image: HTMLImageElement;
  canvas?: HTMLCanvasElement;

  constructor(
    position: Position,
    image: HTMLImageElement,
    width: number,
    height: number,
    canvas?: HTMLCanvasElement
  ) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.position = position;

    this.canvas = canvas;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  draw() {
    const ctx = this.canvas?.getContext("2d");

    ctx?.drawImage(this.image, this.position.x, this.position.y);
  }
}

export { MyObject };
