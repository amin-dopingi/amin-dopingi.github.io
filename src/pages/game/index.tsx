import Arena from "~/components/Arena/Arena";
import styles from "./Game.module.scss";

const GamePage = () => {
  return (
    <div className={styles.GameWrapper}>
      <Arena />
    </div>
  );
};

export default GamePage;
