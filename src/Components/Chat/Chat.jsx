import React from "react";

import { useEffect } from "react";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Chat.module.scss";
import { Messages } from "../Messages/Messages";
const socket = io.connect("https://server-ehr6.onrender.com/");

export const Chat = () => {
  const navigate = useNavigate();
  const [state, setState] = React.useState([]);
  const { search } = useLocation();
  const [params, setParams] = React.useState({ room: "", user: "" });
  const [message, setMessage] = React.useState("");
  const [users, setUsers] = React.useState();
  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);

    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  useEffect(() => {
    socket.on("room", ({ data: { users } }) => {
      setUsers(users.length);
    });
  }, []);

  const logout = () => {
    socket.emit("leftRoom", { params });
    navigate("/");
  };
  const handleChange = ({ target: { value } }) => {
    setMessage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit("sendMessage", { message, params });

    setMessage("");
  };

  return (
    <section className={styles.Chat}>
      <header className={styles.header}>
        <span className={styles.users}>{`Пользователей в чате: ${users}`}</span>
        <p className={styles.room}>{params.room}</p>
        <button onClick={logout}>Выйти из комнаты</button>
      </header>
      <div className={styles.messages}>
        <Messages messages={state} name={params.name} />
      </div>

      <div className={styles.bottom}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.text}
            placeholder="Введите сообщение"
            type="text"
            name="message"
            value={message}
            autoComplete="off"
            onChange={handleChange}
            required
          />
          <input className={styles.submit} type="submit" value="Отправить" />
        </form>
      </div>
    </section>
  );
};

export default Chat;
