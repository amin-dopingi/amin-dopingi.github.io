import { gravity } from "~/constant";
import Position from "./Position";

class Platform {
  width: number;
  height: number;
  position: Position;
  image: HTMLImageElement;

  canvas?: HTMLCanvasElement;

  constructor(
    position: Position,
    image: HTMLImageElement,
    width: number,
    height: number
  ) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.position = position;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  static isOnPlatform({
    object,
    platform,
  }: {
    object: {
      width: number;
      height: number;
      position: Position;
      velocity?: { x: number; y: number };
    };
    platform: Platform;
  }) {
    // gravity is imporant!
    if (
      object.position.y + object.height <= platform.position.y &&
      // @ts-ignore
      object.position.y + object.height + object.velocity.y + gravity >=
        platform.position.y &&
      object.position.x + object.width >= platform.position.x &&
      object.position.x <= platform.position.x + platform.width
    ) {
      return true;
    }
    return false;
  }

  draw() {
    const ctx = this.canvas?.getContext("2d");

    ctx?.drawImage(this.image, this.position.x, this.position.y);
  }
}

export { Platform };
