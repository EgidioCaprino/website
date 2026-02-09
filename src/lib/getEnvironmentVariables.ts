"use server";

import { z } from "zod";

const schema = z.object({
  RECAPTCHA_SITE_KEY: z.string().trim().nonempty(),
  RECAPTCHA_API_KEY: z.string().trim().nonempty(),
  MAILTRAP_TOKEN: z.string().trim().nonempty(),
});
type Schema = z.infer<typeof schema>;

let environmentVariables: Schema;
export default async function getEnvironmentVariables() {
  if (!environmentVariables) {
    environmentVariables = schema.parse(process.env);
  }
  return environmentVariables;
}

export const getSecureEnvironmentVariables = async (): Promise<
  Pick<Schema, "RECAPTCHA_SITE_KEY">
> => {
  const { RECAPTCHA_SITE_KEY } = await getEnvironmentVariables();
  return { RECAPTCHA_SITE_KEY };
};
