import type { APIRoute } from "astro";
import { Resend } from "resend";
import { RESEND_API_KEY, SEND_EMAIL_FROM, SEND_EMAIL_TO } from "astro:env/server";

const resend = new Resend(RESEND_API_KEY);
const SUBJECT = "ALEJOIDE | Contacto";

const NAME_MAX = 100;
const EMAIL_MAX = 254;
const MESSAGE_MAX = 2000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return new Response(
      JSON.stringify({ message: "Solicitud inválida." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ message: "Faltan campos obligatorios." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const nameStr = String(name).trim();
  const emailStr = String(email).trim();
  const messageStr = String(message).trim();

  if (nameStr.length === 0 || nameStr.length > NAME_MAX) {
    return new Response(
      JSON.stringify({ message: `El nombre debe tener entre 1 y ${NAME_MAX} caracteres.` }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (emailStr.length === 0 || emailStr.length > EMAIL_MAX) {
    return new Response(
      JSON.stringify({ message: `El email debe tener entre 1 y ${EMAIL_MAX} caracteres.` }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!EMAIL_REGEX.test(emailStr)) {
    return new Response(
      JSON.stringify({ message: "El formato del email es inválido." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (messageStr.length === 0 || messageStr.length > MESSAGE_MAX) {
    return new Response(
      JSON.stringify({ message: `El mensaje debe tener entre 1 y ${MESSAGE_MAX} caracteres.` }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const text = [
    "NUEVO CONTACTO",
    "",
    `Nombre:  ${nameStr}`,
    `Email:   ${emailStr}`,
    `Mensaje: ${messageStr}`,
  ].join("\n");

  const send = await resend.emails.send({
    from: SEND_EMAIL_FROM,
    to: SEND_EMAIL_TO,
    subject: SUBJECT,
    text,
  });

  if (send.data) {
    return new Response(
      JSON.stringify({ message: "Mensaje enviado correctamente." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } else {
    return new Response(
      JSON.stringify({ message: "Error al enviar el mensaje." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
