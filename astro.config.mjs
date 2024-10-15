// @ts-check
import { defineConfig, envField } from 'astro/config';

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://alejoide.com",
  integrations: [icon()],
  env: {
    schema: {
      SEND_EMAIL_FROM: envField.string({ context: "server", access: "secret" }),
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
      GOOGLE_ANALYTICS_TAG: envField.string({ context: "client", access: "public" }),
    }
  }
});