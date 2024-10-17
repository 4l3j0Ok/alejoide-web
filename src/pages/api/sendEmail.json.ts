import type { APIRoute } from "astro";
import { Resend } from "resend";
import { RESEND_API_KEY, SEND_EMAIL_FROM, SEND_EMAIL_TO } from "astro:env/server";

const resend = new Resend(RESEND_API_KEY)
const subject = "ALEJOIDE | Contacto"
const from = SEND_EMAIL_FROM
const to = SEND_EMAIL_TO


export const POST: APIRoute = async ({ params, request }) => {
  const data = await request.formData()
  const name = data.get("name")
  const email = data.get("email")
  const message = data.get("message")
  console.log("Enviando mail con los siguientes datos:")
  console.log({ name, email, message })
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Faltan campos obligatorios."
      }),
      {
        status: 400,
        statusText: "Bad Request",
      }
    )
  }

  let html = `
    <h1>NUEVO CONTACTO</h1>
    <p><b>Nombre:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Mensaje:</b> ${message}</p>
  `

  const send = await resend.emails.send({
    from,
    to,
    subject,
    html
  })
  if (send.data) {
    return new Response(
      JSON.stringify({
        message: send.data
      }),
      {
        status: 200,
        statusText: "OK",
      }
    )
  } else {
    return new Response(
      JSON.stringify({
        message: send.error
      }),
      {
        status: 500,
        statusText: "Error interno del servidor.",
      }
    )
  }
}