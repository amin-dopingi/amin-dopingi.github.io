import { FC, LegacyRef, useEffect, useRef } from "react";
import Player from "~/class/Player";

import { Keyboard } from "~/class/Keyboard";
import { Platform } from "~/class";
import { Decoration } from "~/class/Decoration";

export interface ArenaProps {
  platforms: Platform[];
  decorations: Decoration[];
  playerImage: {
    standRight: string;
    standLeft: string;
    runningRight: string;
    runningLeft: string;
  };
  backgroundImage: HTMLImageElement;
}

const Arena: FC<ArenaProps> = (props) => {
  const arenaRef: LegacyRef<HTMLCanvasElement> | null = useRef(null);

  useEffect(() => {
    const canvas = arenaRef.current!;
    const ctx = canvas.getContext("2d")!;
    const player = new Player(canvas, { x: 100, y: 100 }, 66, 150);

    player.setSprits(
      props.playerImage.runningRight,
      props.playerImage.runningLeft,
      "run",
      341,
      127,
      29
    );
    player.setSprits(
      props.playerImage.standRight,
      props.playerImage.standLeft,
      "stand",
      177,
      66,
      59
    );
    player.setCurrentSpirt("stand", "right");

    const decorations = props.decorations.map((decoration) => {
      decoration.setCanvas(canvas);
      return decoration;
    });

    const backgroundDecoration = new Decoration(
      { x: -1, y: -1 },
      props.backgroundImage,
      11643,
      732,
      canvas
    );

    decorations.unshift(backgroundDecoration);

    player.setPlatform(
      props.platforms.map((platform) => {
        platform.setCanvas(canvas);
        return platform;
      })
    );
    player.setDecorations(decorations);

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#1b1b1b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      player.update();
    }

    animate();

    window.addEventListener("keydown", Keyboard.handleKeyDown);
    window.addEventListener("keyup", Keyboard.handleKeyUp);
    () => {
      window.removeEventListener("keyup", Keyboard.handleKeyUp);
      return window.removeEventListener("keydown", Keyboard.handleKeyDown);
    };
  }, []);

  return <canvas ref={arenaRef} width="1024" height="576"></canvas>;
};

export default Arena;
