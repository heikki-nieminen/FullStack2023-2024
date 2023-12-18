import {
  AppBar,
  Box,
  Button,
  Container,
  Menu,
  Toolbar,
  IconButton,
  MenuItem,
  Typography,
  Tooltip,
} from '@mui/material'
import { MouseEvent, useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate } from 'react-router-dom'
import { AccountCircleRounded } from '@mui/icons-material'
import { Login } from './Login/Login'
import { Register } from './Register/Register'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { logoutUser, selectUser } from '../state/reducers/userSlice'
import axios from 'axios'

export const NavBar = () => {
  const pages = [
    { label: 'Home', link: '/' },
    { label: 'Quizzes', link: 'quizzes' },
  ]
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  useEffect(() => {
    if (!anchorElNav) {
      document.getElementById('nav-button')?.blur()
    }
    if (!anchorElUser) {
      document.getElementById('user-button')?.blur()
    }
  }, [anchorElNav, anchorElUser])

  const handleOpenNavMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleOpenUserMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLoginClick = () => {
    handleCloseUserMenu()
    setLoginOpen(true)
  }

  const handleLogoutClick = () => {
    handleCloseUserMenu()
    const timeout = setTimeout(() => {
      localStorage.removeItem('userToken')
      localStorage.removeItem('adminToken')
      delete axios.defaults.headers.common['Authorization']
      dispatch(logoutUser())
      navigate('/')
      clearTimeout(timeout)
    }, 200)
  }

  const handleRegisterClick = () => {
    handleCloseUserMenu()
    setRegisterOpen(true)
  }

  return (
    <>
      <AppBar position='static' sx={{ width: '100%' }}>
        <Container sx={{ width: 1 }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                id='nav-button'
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign='center'
                      component={Link}
                      to={page.link}
                    >
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={Link}
                  to={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={'User'}>
                <IconButton
                  id='user-button'
                  sx={{ p: 0, mx: 2, cursor: 'pointer' }}
                  onClick={handleOpenUserMenu}
                >
                  <AccountCircleRounded />
                </IconButton>
              </Tooltip>
              <Menu
                id={'menu-appbar'}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{ display: 'block' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {!user.loggedIn ? (
                  <Box>
                    <MenuItem onClick={handleLoginClick}>
                      <Typography>Login</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleRegisterClick}>
                      <Typography>Register</Typography>
                    </MenuItem>
                  </Box>
                ) : (
                  <MenuItem onClick={handleLogoutClick}>
                    <Typography>Logout</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Login open={loginOpen} setOpen={setLoginOpen} />
      <Register open={registerOpen} setOpen={setRegisterOpen} />
    </>
  )
}
