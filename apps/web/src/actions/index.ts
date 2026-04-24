import { email as emailSchema, z } from 'astro/zod'
import { ActionError, defineAction } from 'astro:actions'
import { Resend } from 'resend'

export const server = {
  contact: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(1),
      email: emailSchema(),
      message: z.string().min(1),
    }),
    handler: async ({ name, email, message }) => {
      const resend = new Resend(process.env.RESEND_API_KEY)

      const { error } = await resend.emails.send({
        from: `Portfolio <${process.env.RESEND_FROM_EMAIL}>`,
        to: process.env.RESEND_TO_EMAIL as string,
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      })

      if (error) {
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: error.message })
      }
    },
  }),
}
