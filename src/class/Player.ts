import { gravity } from "~/constant";
import Position from "./Position";
import { createImage } from "~/utils";
import { Key, Keyboard } from "./Keyboard";

class Player {
  speed: number = 5;
  velocity: Position;
  position: Position;
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  sprits: {
    stand: {
      right: CanvasImageSource;
      left: CanvasImageSource;
      cropWidth: number;
      width: number;
      countFrames: number;
    };
    run: {
      right: CanvasImageSource;
      left: CanvasImageSource;
      cropWidth: number;
      width: number;
      countFrames: number;
    };
  };
  currentSpirt: CanvasImageSource;
  currentSpirtType: "stand" | "run";
  frames: number;

  constructor(
    canvas: HTMLCanvasElement,
    position: Position,
    width: number,
    height: number
  ) {
    this.velocity = { x: 0, y: 0 };
    this.position = position;
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.sprits = {
      stand: {
        right: createImage(""),
        left: createImage(""),
        cropWidth: 0,
        width: 0,
        countFrames: 0,
      },
      run: {
        right: createImage(""),
        left: createImage(""),
        cropWidth: 0,
        width: 0,
        countFrames: 0,
      },
    };
    this.currentSpirt = createImage("");
    this.currentSpirtType = "stand";

    this.frames = 1;
  }

  setSprits(
    rightImageSprit: string,
    leftImageSprit: string,
    type: "stand" | "run",
    cropWidth: number,
    width: number,
    countFrames: number
  ) {
    this.sprits[type] = {
      right: createImage(rightImageSprit),
      left: createImage(leftImageSprit),
      cropWidth,
      width,
      countFrames,
    };
  }

  setCurrentSpirt(type: "stand" | "run", direction: "right" | "left") {
    this.currentSpirt = this.sprits[type][direction];
    this.currentSpirtType = type;
  }

  handleLeftMovement() {
    this.setCurrentSpirt("run", "left");
    if (this.position.x >= 0) {
      this.velocity.x = -this.speed;
    } else {
      this.velocity.x = 0;
    }
  }

  handleRightMovement() {
    this.setCurrentSpirt("run", "right");
    if (this.position.x <= 400) {
      this.velocity.x = this.speed;
    } else {
      this.velocity.x = 0;
    }
  }

  handleStandMovement() {
    const lastKey = Keyboard.lastKey.key;
    this.velocity.x = 0;

    if (lastKey === Key.LEFT) {
      this.setCurrentSpirt("stand", "left");
    } else {
      this.setCurrentSpirt("stand", "right");
    }
  }

  handleUpMovement() {
    this.position.y -= 30;
  }

  handlePlayerMovement() {
    const keys = Keyboard.keys;
    if (keys.left.pressed) {
      this.handleLeftMovement();
    } else if (keys.right.pressed) {
      this.handleRightMovement();
    } else {
      this.handleStandMovement();
    }

    if (keys.up.pressed) {
      this.handleUpMovement();
    }
  }

  handleGravity() {
    if (this.position.y + this.height + this.velocity.y < this.canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
      this.position.y = this.canvas.height - this.height;
    }
  }

  handleChangeFrames() {
    this.frames++;

    if (this.frames > this.sprits[this.currentSpirtType].countFrames)
      this.frames = 0;
  }

  handleChangePosition() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  draw() {
    const ctx = this.canvas.getContext("2d")!;
    const currentSpirt = this.sprits[this.currentSpirtType];
    ctx.drawImage(
      this.currentSpirt,
      currentSpirt.cropWidth * this.frames,
      0,
      currentSpirt.cropWidth,
      400,
      this.position.x,
      this.position.y,
      currentSpirt.width,
      this.height
    );
    ctx.closePath();
  }

  update() {
    this.handleChangeFrames();
    this.handleChangePosition();

    this.handlePlayerMovement();
    this.handleGravity();

    this.draw();
  }
}

export default Player;
