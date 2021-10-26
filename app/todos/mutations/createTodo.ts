import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateTodo = z.object({
  title: z.string(),
  status: z.enum(["TODO", "DOING", "DONE"]),
})

export default resolver.pipe(resolver.zod(CreateTodo), resolver.authorize(), async (input, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const todo = await db.todo.create({
    data: {
      ...input,
      authorId: ctx.session.userId,
    },
  })

  return todo
})
