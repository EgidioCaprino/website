"use client";

import assert from "assert";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import sendMessage from "@/lib/sendMessage";

declare global {
  interface Window {
    onReCaptchaSubmit?: (token: string) => void;
  }
}

interface Props {
  siteKey: string;
}

const schema = z.object({
  email: z.email().trim(),
  message: z.string().trim().min(20),
});

export default function ContactForm({ siteKey }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [userEmailAddress, setUserEmailAddress] = useState("");
  const [sent, setSent] = useState<boolean | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    window.onReCaptchaSubmit = async (reCaptchaToken: string) => {
      setSending(true);
      try {
        assert(formRef.current);
        const formData = new FormData(formRef.current);
        const parseResult = schema.safeParse({
          email: formData.get("email")?.toString(),
          message: formData.get("message")?.toString(),
        });
        if (!parseResult.success) {
          console.debug(parseResult.error);
          setSent(false);
          return;
        }
        const { email, message } = parseResult.data;
        try {
          const sent = await sendMessage({
            email,
            message,
            reCaptchaToken,
          });
          setUserEmailAddress(email);
          setSent(sent);
        } catch (error) {
          console.debug(error);
          setSent(false);
        }
      } finally {
        setSending(false);
      }
    };
    return () => {
      delete window.onReCaptchaSubmit;
    };
  });

  let successAlert = null;
  let errorAlert = null;
  if (sent !== null) {
    if (sent) {
      successAlert = (
        <div className="alert alert-success" role="alert">
          <strong>Success!</strong> Your message has been sent. I will reply to{" "}
          <em>{userEmailAddress}</em> as soon as possible.
        </div>
      );
    } else {
      errorAlert = (
        <div className="alert alert-danger" role="alert">
          <strong>Error!</strong> It is not possible to send your message.
          Please check your data and try again.
        </div>
      );
    }
  }

  return (
    <form ref={formRef}>
      <h2>Contact me</h2>
      {successAlert ? (
        successAlert
      ) : (
        <>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Password
            </label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              required
              rows={3}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary g-recaptcha"
            data-sitekey={siteKey}
            data-callback="onReCaptchaSubmit"
            data-action="send_message"
            disabled={sending}
          >
            Submit{" "}
            <span
              className={sending ? "visually-hidden" : ""}
              aria-hidden="true"
            ></span>
          </button>
          {sent === false && errorAlert}
        </>
      )}
    </form>
  );
}
