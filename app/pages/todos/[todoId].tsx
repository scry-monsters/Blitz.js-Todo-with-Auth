import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTodo from "app/todos/queries/getTodo"
import deleteTodo from "app/todos/mutations/deleteTodo"
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

export const Todo = () => {
  const router = useRouter()
  const todoId = useParam("todoId", "number")
  const [deleteTodoMutation] = useMutation(deleteTodo)
  const [todo] = useQuery(getTodo, { id: todoId })

  return (
    <div className="coolContainer">
      <div className="custom__card">
        <Head>
          <title>Todo {todo.id}</title>
        </Head>
        <div style={{ alignItems: "center", justifyContent: "center" }}>
          <Card sx={{ maxWidth: 345 }} style={{ margin: "0 auto" }}>
            <CardMedia
              component="img"
              height="160"
              image="https://repository-images.githubusercontent.com/105165445/b8efdd00-5d13-11e9-902e-3ce3c3d7e548"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {todo.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {todo.status}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                type="button"
                onClick={async () => {
                  if (window.confirm("This will be deleted")) {
                    await deleteTodoMutation({ id: todo.id })
                    router.push(Routes.TodosPage())
                  }
                }}
                style={{ marginLeft: "0.5rem" }}
              >
                Delete
              </Button>
              <Button>
                <Link href={Routes.EditTodoPage({ todoId: todo.id })}>
                  <a>Edit</a>
                </Link>
              </Button>
            </CardActions>
          </Card>
        </div>
        <style jsx global>{`
          .coolContainer {
            height: 70vh;
          }
          .custom__card {
            margin-top: 5%;
          }
        `}</style>
      </div>
    </div>
  )
}

const ShowTodoPage: BlitzPage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Button style={{ paddingTop: "30px" }}>
        <Link href={Routes.TodosPage()}>
          <a style={{ textDecoration: "none" }}>Todos</a>
        </Link>
      </Button>

      <Suspense fallback={<div>Loading...</div>}>
        <Todo />
      </Suspense>
    </div>
  )
}

ShowTodoPage.authenticate = true
ShowTodoPage.getLayout = (page) => <Layout title="Detail Page">{page}</Layout>

export default ShowTodoPage
