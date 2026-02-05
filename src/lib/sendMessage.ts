"use server";

import { MailtrapClient } from "mailtrap";
import getEnvironmentVariables from "@/lib/getEnvironmentVariables";

interface Data {
  email: string;
  message: string;
  reCaptchaToken: string;
}

export default async function sendMessage(messageData: Data): Promise<boolean> {
  const { MAILTRAP_TOKEN, RECAPTCHA_API_KEY, RECAPTCHA_SITE_KEY } =
    await getEnvironmentVariables();
  const mailtrapClient = new MailtrapClient({
    token: MAILTRAP_TOKEN,
  });

  const url = new URL("https://recaptchaenterprise.googleapis.com");
  url.pathname = "/v1/projects/egidiocaprino-com/assessments";
  url.searchParams.set("key", RECAPTCHA_API_KEY);
  const reCaptchaResponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      event: {
        token: messageData.reCaptchaToken,
        expectedAction: "send_message",
        siteKey: RECAPTCHA_SITE_KEY,
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
