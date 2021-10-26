import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTodo from "app/todos/mutations/createTodo"
import { TodoForm, FORM_ERROR } from "app/todos/components/TodoForm"
import { Card, CardContent, CardMedia, Typography } from "@mui/material"

const NewTodoPage: BlitzPage = () => {
  const router = useRouter()
  const [createTodoMutation] = useMutation(createTodo)

  return (
    <div className="coolContainer">
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
        <h1 style={{ padding: "20px 0" }}>Create New Todo</h1>
        <Card sx={{ maxWidth: 345 }} style={{ margin: "0 auto" }}>
          <CardMedia
            component="img"
            height="160"
            image="https://repository-images.githubusercontent.com/105165445/b8efdd00-5d13-11e9-902e-3ce3c3d7e548"
            alt="green iguana"
          />
          <CardContent>
            <TodoForm
              submitText="Create Todo"
              // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              // schema={CreateTodo}
              // initialValues={{}}
              onSubmit={async (values) => {
                try {
                  const todo = await createTodoMutation(values)
                  router.push(Routes.ShowTodoPage({ todoId: todo.id }))
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

NewTodoPage.authenticate = true
NewTodoPage.getLayout = (page) => <Layout title={"Create New Todo"}>{page}</Layout>

export default NewTodoPage
