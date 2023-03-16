import React from "react";
import styles from "./Main.module.scss";
import { Link } from "react-router-dom";

const FIELDS = {
  NAME: "NAME",
  ROOM: "ROOM",
};

export const Main = () => {
  const { NAME, ROOM } = FIELDS;

  const [values, setValues] = React.useState({ [NAME]: "", [ROOM]: "" });
  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };
  const onClick = (event) => {
    const isDisabled = Object.values(values).some((v) => !v);

    if (isDisabled) event.preventDefault();
  };
  return (
    <section className={styles.main}>
      <h1>Вход</h1>
      <form>
        <div className={styles.inputs}>
          <input
            placeholder="NAME"
            type="text"
            name="NAME"
            value={values[NAME]}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputs}>
          <input
            placeholder="ROOM"
            value={values[ROOM]}
            type="text"
            name="ROOM"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
      </form>

      <Link
        onClick={onClick}
        to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
      >
        Войти
      </Link>
    </section>
  );
};

export default Main;
