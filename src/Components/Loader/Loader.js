import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.ring}>
      <span className={styles.loading}></span>
      <div>Loading</div>
    </div>
  );
};

export default Loader;
