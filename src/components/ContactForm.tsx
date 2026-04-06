import { useState } from "react";
import type { FormEvent } from "react";
import "../styles/ContactForm.css";

const NAME_MAX = 100;
const MESSAGE_MAX = 2000;

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [nameLen, setNameLen] = useState(0);
  const [messageLen, setMessageLen] = useState(0);
  const emailEndpoint = "/api/sendEmail.json";

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHasSubmitted(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch(emailEndpoint, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="top">
        <div className="form-input">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            maxLength={NAME_MAX}
            disabled={hasSubmitted}
            required
            onChange={(e) => setNameLen(e.target.value.length)}
          />
          <span className={`char-counter${nameLen >= NAME_MAX * 0.9 ? " warn" : ""}`}>
            {nameLen} / {NAME_MAX}
          </span>
        </div>
        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" disabled={hasSubmitted} required />
        </div>
      </div>
      <div className="bottom">
        <div className="form-input">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            maxLength={MESSAGE_MAX}
            disabled={hasSubmitted}
            required
            onChange={(e) => setMessageLen(e.target.value.length)}
          ></textarea>
          <span className={`char-counter${messageLen >= MESSAGE_MAX * 0.9 ? " warn" : ""}`}>
            {messageLen} / {MESSAGE_MAX}
          </span>
        </div>
        <button type="submit" disabled={hasSubmitted}>{responseMessage ? "Enviado" : "Enviar"}</button>
      </div>
    </form>
  );
}