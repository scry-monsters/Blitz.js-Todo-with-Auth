import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { Link, Router, Routes } from "blitz"
import { Todo } from "db"
import React from "react"

interface TodoItemProps {
  data: Todo[]
  title: string
}

function TodoItem({ data, title }: TodoItemProps) {
  return (
    <ul style={{ marginTop: "20px" }}>
      {data.map((todo) => (
        <li style={{ listStyle: "none", padding: "10px 0" }} key={todo.id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {todo.status}
              </Typography>
              <Typography
                style={todo.status === "DONE" ? { textDecoration: "line-through" } : null}
                variant="h5"
                component="div"
              >
                {todo.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={Routes.ShowTodoPage({ todoId: todo.id })}>
                <Button size="small">Details</Button>
              </Link>
            </CardActions>
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default TodoItem
