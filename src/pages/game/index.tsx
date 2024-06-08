import Arena, { ArenaProps } from "~/components/Arena/Arena";
import styles from "./Game.module.scss";

import spritsRunningRight from "~/assets/spriteRunRight.png";
import spritsRunningLeft from "~/assets/spriteRunLeft.png";
import spritsStandRight from "~/assets/spriteStandRight.png";
import spritsStandLeft from "~/assets/spriteStandLeft.png";
import platfromImage from "~/assets/platform.png";
import backgroundImage from "~/assets/background.png";
import hills from "~/assets/hills.png";
import { createImage } from "~/utils";
import { Platform } from "~/class";
import { Decoration } from "~/class/Decoration";

const platformImage1 = createImage(platfromImage);
const widthPlatformImage1 = 580;
const heightPlatformImage1 = 125;
const normalSpacePlatform = 100;

const decorationImage1 = createImage(hills);
const widthDecorationImage1 = 7545;
const heightDecorationImage1 = 592;

const createPlatform1 = (x: number, y: number = 470) => {
  return new Platform(
    { x, y },
    platformImage1,
    widthPlatformImage1,
    heightPlatformImage1
  );
};

const createDecoration1 = (x: number, y: number = 0) => {
  return new Decoration(
    { x, y },
    decorationImage1,
    widthDecorationImage1,
    heightDecorationImage1
  );
};

const arena1Data: ArenaProps = {
  platforms: [
    createPlatform1(-1),
    createPlatform1(-3 + widthPlatformImage1),
    createPlatform1(-1 + 2 * (widthPlatformImage1 + normalSpacePlatform)),
    createPlatform1(-1 + 3 * (widthPlatformImage1 + normalSpacePlatform)),
    createPlatform1(-1 + 3 * widthPlatformImage1, 300),
    createPlatform1(-1 + 4 * (widthPlatformImage1 + normalSpacePlatform)),
  ],
  decorations: [createDecoration1(-1)],
  backgroundImage: createImage(backgroundImage),
  playerImage: {
    standRight: spritsStandRight,
    standLeft: spritsStandLeft,
    runningRight: spritsRunningRight,
    runningLeft: spritsRunningLeft,
  },
};

const GamePage = () => {
  return (
    <div className={styles.GameWrapper}>
      <Arena {...arena1Data} />
    </div>
  );
};

export default GamePage;
