import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTodo = z.object({
  id: z.number(),
  title: z.string(),
  status: z.enum(["TODO", "DOING", "DONE"]),
})

export default resolver.pipe(
  resolver.zod(UpdateTodo),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    await db.todo.updateMany({ where: { id, authorId: ctx.session.userId }, data })
    const todo = await db.todo.findUnique({ where: { id } })
    return todo
  }
)
