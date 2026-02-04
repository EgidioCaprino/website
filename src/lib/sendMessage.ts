"use server";

import assert from "assert";
import { MailtrapClient } from "mailtrap";

interface Data {
  email: string;
  message: string;
  reCaptchaToken: string;
}

assert(process.env.MAILTRAP_TOKEN);
const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

export default async function sendMessage(messageData: Data): Promise<boolean> {
  assert(process.env.RECAPTCHA_API_KEY);
  const url = new URL("https://recaptchaenterprise.googleapis.com");
  url.pathname = "/v1/projects/egidiocaprino-com/assessments";
  url.searchParams.set("key", process.env.RECAPTCHA_API_KEY);
  const reCaptchaResponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      event: {
        token: messageData.reCaptchaToken,
        expectedAction: "send_message",
        siteKey: process.env.RECAPTCHA_SITE_KEY,
      },
    }),
  });
  const { tokenProperties } = await reCaptchaResponse.json();
  if (!tokenProperties.valid) {
    return false;
  }
  const { success } = await mailtrapClient.send({
    from: { email: "website@egidiocaprino.com" },
    to: [{ email: "egidio.caprino@ik.me" }],
    subject: `Message from ${messageData.email}`,
    text: messageData.message,
  });
  return success;
}
