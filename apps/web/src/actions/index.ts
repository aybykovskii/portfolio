import { email as emailSchema, z } from 'astro/zod'
import { ActionError, defineAction } from 'astro:actions'
import { RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL } from 'astro:env/server'
import { Resend } from 'resend'

const resend = new Resend(RESEND_API_KEY)

export const server = {
  contact: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(1),
      email: emailSchema(),
      message: z.string().min(1),
    }),
    handler: async ({ name, email, message }) => {
      const { error } = await resend.emails.send({
        from: `Portfolio <${RESEND_FROM_EMAIL}>`,
        to: RESEND_TO_EMAIL,
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      })

      if (error) {
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: error.message })
      }
    },
  }),
}
