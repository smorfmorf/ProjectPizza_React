import React from "react";
import styles from "./NotFountBlock.module.scss";

const NotFountBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        <h1>Ничего не найдено</h1>
      </h1>
      <p className={styles.description}>
        К сожалению данная страница отсутсвует в нашем интернет-магазине{" "}
      </p>
    </div>
  );
};

export default NotFountBlock;
