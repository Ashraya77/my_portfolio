type ContactPayload = {
  email?: unknown;
  message?: unknown;
  name?: unknown;
  website?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function errorResponse(error: string, status = 400) {
  return Response.json({ error }, { status });
}

function wasAccepted(payload: unknown) {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "success" in payload &&
    payload.success === true
  );
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return errorResponse("Please send a valid request.");
  }

  const name = asTrimmedString(payload.name);
  const email = asTrimmedString(payload.email);
  const message = asTrimmedString(payload.message);
  const website = asTrimmedString(payload.website);

  if (website) {
    return errorResponse("Invalid submission.");
  }

  if (!name || !email || !message) {
    return errorResponse("Please complete every field.");
  }

  if (name.length > 120 || email.length > 254 || message.length > 2000) {
    return errorResponse("Your message is too long. Please keep it under 2,000 characters.");
  }

  if (!emailPattern.test(email)) {
    return errorResponse("Please enter a valid email address.");
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.error("WEB3FORMS_ACCESS_KEY is not configured.");
    return errorResponse("The contact form is temporarily unavailable. Please email me directly.", 503);
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      body: JSON.stringify({
        access_key: accessKey,
        botcheck: false,
        email,
        from_name: "Portfolio contact form",
        message,
        name,
        subject: `New portfolio message from ${name}`,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result: unknown = await response.json().catch(() => null);

    if (!response.ok || !wasAccepted(result)) {
      console.error("Web3Forms submission failed.", { status: response.status });
      return errorResponse("Your message could not be sent. Please try again or email me directly.", 502);
    }
  } catch {
    return errorResponse("Your message could not be sent. Please try again or email me directly.", 502);
  }

  return Response.json({ success: true });
}
