import { useEffect } from "react"
import { Container } from "../container"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  selectUser,
  selectIsAuthenticated,
} from "../../features/user/userSlice"
import { Header } from "../header"
import { Profile } from "../profile"
import { NavBar } from "../nav-bar"

export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [])

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div className="flex-2 p-4">
          <div className="flex-col flex gap-5">{!user && <Profile />}</div>
        </div>
      </Container>
    </>
  )
}