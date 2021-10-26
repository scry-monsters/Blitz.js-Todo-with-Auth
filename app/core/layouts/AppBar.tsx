import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Button } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { Link, Routes, useMutation } from "blitz"
import { useCurrentUser } from "../hooks/useCurrentUser"
import logout from "../../auth/mutations/logout"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PersonIcon from "@mui/icons-material/Person"

interface AppBarProps {
  title: string
}

export default function ButtonAppBar({ title }: AppBarProps) {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link href={Routes.Home()}>
              <Typography
                style={{ cursor: "pointer" }}
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                {title}
              </Typography>
            </Link>
            <Link href={Routes.Home()}>
              <LogoutIcon
                onClick={async () => {
                  await logoutMutation()
                }}
              >
                LOGOUT
              </LogoutIcon>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    )
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link href={Routes.Home()}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {title}
              </Typography>
            </Link>
            <Link href={Routes.LoginPage()}>
              <PersonIcon>
                <a>LOGIN</a>
              </PersonIcon>
            </Link>
            |
            <Link href={Routes.SignupPage()}>
              <PersonAddIcon>
                <a>SIGN UP</a>
              </PersonAddIcon>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
}
