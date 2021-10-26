import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTodo from "app/todos/queries/getTodo"
import updateTodo from "app/todos/mutations/updateTodo"
import { TodoForm, FORM_ERROR } from "app/todos/components/TodoForm"
import { Card, CardContent, CardMedia } from "@mui/material"

export const EditTodo = () => {
  const router = useRouter()
  const todoId = useParam("todoId", "number")
  const [todo, { setQueryData }] = useQuery(
    getTodo,
    { id: todoId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTodoMutation] = useMutation(updateTodo)

  return (
    <div className="coolContainer">
      <Head>
        <title>Edit Todo {todo.id}</title>
      </Head>

      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingTop: "30px",
        }}
      >
        <p>
          <Link href={Routes.TodosPage()}>
            <a style={{ textDecoration: "none" }}>Todos</a>
          </Link>
        </p>
        <h1 style={{ padding: "20px 0" }}>Edit Todo {todo.id}</h1>
        <Card sx={{ maxWidth: 345 }} style={{ margin: "0 auto" }}>
          <CardMedia
            component="img"
            height="160"
            image="https://repository-images.githubusercontent.com/105165445/b8efdd00-5d13-11e9-902e-3ce3c3d7e548"
            alt="green iguana"
          />
          <CardContent>
            <TodoForm
              submitText="Update Todo"
              // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              // schema={UpdateTodo}
              initialValues={todo}
              onSubmit={async (values) => {
                try {
                  const updated = await updateTodoMutation({
                    id: todo.id,
                    ...values,
                  })
                  if (updated) {
                    await setQueryData(updated)
                    router.push(Routes.ShowTodoPage({ todoId: updated.id }))
                  }
                } catch (error: any) {
                  console.error(error)
                  return {
                    [FORM_ERROR]: error.toString(),
                  }
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      <style jsx global>{`
        .coolContainer {
          height: 85vh;
        }
      `}</style>
    </div>
  )
}

const EditTodoPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTodo />
      </Suspense>
    </div>
  )
}

EditTodoPage.authenticate = true
EditTodoPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTodoPage
