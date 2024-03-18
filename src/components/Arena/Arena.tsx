import { LegacyRef, useEffect, useRef } from "react";
import Player from "~/class/Player";

import spritsRunningRight from "~/assets/spriteRunRight.png";
import spritsRunningLeft from "~/assets/spriteRunLeft.png";
import spritsStandRight from "~/assets/spriteStandRight.png";
import spritsStandLeft from "~/assets/spriteStandLeft.png";
import { Keyboard } from "~/class/Keyboard";

const Arena = () => {
  const arenaRef: LegacyRef<HTMLCanvasElement> | null = useRef(null);

  useEffect(() => {
    const canvas = arenaRef.current!;
    const ctx = canvas.getContext("2d")!;
    const player = new Player(canvas, { x: 0, y: 0 }, 66, 150);

    player.setSprits(
      spritsRunningRight,
      spritsRunningLeft,
      "run",
      341,
      127,
      29
    );
    player.setSprits(spritsStandRight, spritsStandLeft, "stand", 177, 66, 59);
    player.setCurrentSpirt("stand", "right");

    function animate() {
      requestAnimationFrame(animate);
      ctx.fillStyle = "#111";
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
