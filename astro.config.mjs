// @ts-check
import { defineConfig, envField } from 'astro/config';

import icon from "astro-icon";

import node from "@astrojs/node";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://alejoide.com",
  integrations: [icon(), react()],

  env: {
    schema: {
      // referencia: 
      // context: "server" | "client": define dónde se puede acceder a la variable de entorno. "server" significa que solo estará disponible en el servidor, mientras que "client" significa que estará disponible tanto en el servidor como en el cliente.
      // access: "secret" | "public": define si la variable de entorno es secreta o pública. Las variables de entorno secretas no se incluirán en el bundle del cliente, mientras que las públicas sí lo estarán.
      SEND_EMAIL_FROM: envField.string({ context: "server", access: "secret" }),
      SEND_EMAIL_TO: envField.string({ context: "server", access: "secret" }),
      PUBLIC_EMAIL: envField.string({ context: "client", access: "public" }),
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
    }
  },

  output: "server",

  adapter: node({
    mode: "standalone"
  })
});