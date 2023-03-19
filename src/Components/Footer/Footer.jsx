import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <footer style={styles.footer}>
      <Link to="/">RPIS CHAT</Link>
    </footer>
  );
};

export default Footer;
