import { Resend } from 'resend';
import { SendEmail } from './SendEmail';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Integral Information <support@connect.integralinformation.com>',
      to: body.emailRecipients,
      subject: `Pet Information from ${body.account.first_name} ${body.account.last_name}`,
      react: SendEmail(body),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
