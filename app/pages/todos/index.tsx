import { Suspense } from "react"
import { Image, Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTodos from "app/todos/queries/getTodos"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import TodoItem from "./TodoItem"
import { useMemo } from "react"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import slime from "public/slime.png"
import { Button } from "@mui/material"
import getMyTodos from "app/todos/queries/getMyTodos"

const ITEMS_PER_PAGE = 6

export const TodosList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ todos, hasMore }] = usePaginatedQuery(getMyTodos, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  console.log(todos)

  const todoTodos = useMemo(() => {
    return todos.filter((todo) => todo.status === "TODO")
  }, [todos])

  const doingTodos = useMemo(() => {
    return todos.filter((todo) => todo.status === "DOING")
  }, [todos])

  const doneTodos = useMemo(() => {
    return todos.filter((todo) => todo.status === "DONE")
  }, [todos])

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TodoItem data={todoTodos} title="TODO: " />
        <TodoItem data={doingTodos} title="DOING: " />
        <TodoItem data={doneTodos} title="DONE: " />
      </div>
      <div style={{ textAlign: "center", paddingTop: "20px" }}>
        <Button
          style={{ margin: "20px 10px 0 10px" }}
          disabled={page === 0}
          onClick={goToPreviousPage}
        >
          Previous
        </Button>

        <Button style={{ margin: "20px 10px 0 10px" }} disabled={!hasMore} onClick={goToNextPage}>
          Next
        </Button>
      </div>
    </div>
  )
}

const TodosPage: BlitzPage = () => {
  return (
    <div className="coolContainer">
      <div style={{ textAlign: "center", paddingTop: "30px" }}>
        <Link href={Routes.NewTodoPage()}>
          <AddCircleIcon>
            <a>Create Todo</a>
          </AddCircleIcon>
        </Link>
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <TodosList />
        </Suspense>
      </div>
      <style jsx global>{`
        .coolContainer {
          height: 85vh;
        }
      `}</style>
    </div>
  )
}

TodosPage.authenticate = true
TodosPage.getLayout = (page) => <Layout title="Todos">{page}</Layout>

export default TodosPage
