import { useState } from "react";
import type { FormEvent } from "react";
import "../styles/ContactForm.css";


export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
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
          <input type="text" id="name" name="name" disabled={hasSubmitted} required />
        </div>
        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" disabled={hasSubmitted} required />
        </div>
      </div>
      <div className="bottom">
        <div className="form-input">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" disabled={hasSubmitted} required></textarea>
        </div>
        <button type="submit" disabled={hasSubmitted} >{responseMessage ? "Enviado" : "Enviar"}</button>
      </div>
    </form>
  );
}