import { gravity, offsetScroll } from "~/constant";
import Position from "./Position";
import { createImage } from "~/utils";
import { Key, Keyboard } from "./Keyboard";
import { Platform } from "./Platform";
import { Decoration } from "./Decoration";

class Player {
  speed: number = 5;
  velocity: Position;
  position: Position;
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  platforms: Platform[] = [];
  decorations: Decoration[] = [];
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

  originalPlatformsXs: number[] = [];
  originalDecorationsXs: number[] = [];

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

  setPlatform(platforms: Platform[]) {
    this.platforms = platforms;
    this.originalPlatformsXs = platforms.map((platform) => platform.position.x);
  }

  setDecorations(decorations: Decoration[]) {
    this.decorations = decorations;
    this.originalDecorationsXs = decorations.map(
      (decoration) => decoration.position.x
    );
  }

  reset() {
    this.platforms.forEach((platform, index) => {
      platform.position.x = this.originalPlatformsXs[index];
    });
    this.decorations.forEach((decoration, index) => {
      decoration.position.x = this.originalDecorationsXs[index];
    });
    console.log(this.originalPlatformsXs, this.originalDecorationsXs);
    this.position.x = 100;
    this.position.y = 100;
    offsetScroll.value = 0;
  }

  handleLeftMovement() {
    this.setCurrentSpirt("run", "left");

    if (offsetScroll.value === 0 || this.position.x >= 100) {
      if (this.position.x === 0) {
        this.velocity.x = 0;
      } else {
        this.velocity.x = -this.speed;
      }
    } else {
      this.velocity.x = 0;
      offsetScroll.value -= this.speed;
      this.platforms.forEach((platform) => {
        platform.position.x += this.speed / 2.5;
      });
      this.decorations.forEach((genericObject) => {
        genericObject.position.x += this.speed / 2.5;
      });
    }
  }

  handleRightMovement() {
    this.setCurrentSpirt("run", "right");

    if (this.position.x < 400) {
      this.velocity.x = this.speed;
    } else {
      this.velocity.x = 0;
      offsetScroll.value += this.speed;
      this.platforms.forEach((platform) => {
        platform.position.x -= this.speed / 2.5;
      });
      this.decorations.forEach((decoration) => {
        decoration.position.x -= this.speed / 2.5;
      });
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
    this.position.y -= 20;
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
    let isOnPlatform = false;

    this.platforms.forEach((platform) => {
      if (Platform.isOnPlatform({ object: this, platform })) {
        isOnPlatform = true;
      }
    });
    if (isOnPlatform) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
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

  handleGameOver() {
    if (this.position.y > this.canvas.height) {
      this.reset();
    }
  }

  handleDrawPlatforms() {
    this.platforms.forEach((platform) => {
      platform.draw();
    });
  }

  handleDrawDecorations() {
    this.decorations.forEach((decoration) => decoration.draw());
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
    this.handleGameOver();

    this.handleDrawDecorations();
    this.draw();
    this.handleDrawPlatforms();
  }
}

export default Player;
