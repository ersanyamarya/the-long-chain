import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import {
  CaretLeft,
  CompassTool,
  Cpu,
  DevToLogo,
  GearSix,
  List as ListIcon,
  SignOut,
  SquaresFour,
} from '@phosphor-icons/react'
import { Cube } from '@phosphor-icons/react/dist/ssr'
import { useState } from 'react'
import { NavLink, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import { auth } from '../firebase'
// import { useMasterStore, useWorkspaceStore } from '../global_states'
import { useAuthStore } from '../global_states/auth-store'
const drawerWidth = 240
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(1, 8),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}))

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  overflowX: 'hidden',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}))

const NavigationLink = styled(NavLink, { shouldForwardProp: prop => prop !== 'state' })(({ theme, state }) => ({
  textDecoration: 'none',
  width: '100%',
  borderRadius: 10,
  transition: theme.transitions.create(['background-color', 'color', 'box-shadow'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: state.isActive ? theme.palette.background.paper : 'inherit',
  color: state.isActive ? theme.palette.primary.dark : theme.palette.background.paper,
  boxShadow: state.isActive ? `0px 4px 10px 0px ${theme.palette.primary.dark}` : 'none',
  ...(!state.isActive && {
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  '.MuiListItemButton-root': {
    minHeight: 48,
    justifyContent: state.open ? 'initial' : 'center',
    padding: theme.spacing(0, 2.5),
  },
  '.MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: state.open ? '1rem' : 'auto',
    justifyContent: 'center',
    color: state.isActive ? theme.palette.primary.dark : theme.palette.background.paper,
  },
  '.MuiListItemText-root': {
    opacity: state.open ? 1 : 0,
  },
}))

interface NavigationItemProps {
  icon: React.ReactNode
  text: string
  link: string
  developer?: boolean
}

const topMenuItems: NavigationItemProps[] = [
  {
    icon: <SquaresFour size={32} />,
    text: 'Dashboard',
    link: '/app',
  },
  {
    icon: <Cpu size={32} />,
    text: 'Nodes',
    link: '/app/devices',
  },
  {
    icon: <Cube size={32} />,
    text: 'Modules',
    link: '/app/modules',
  },
  {
    icon: <CompassTool size={32} />,
    text: 'Edge Applications',
    link: '/app/edge-applications',
  },
  {
    icon: <GearSix size={32} />,
    text: 'Settings',
    link: '/app/settings',
  },
  {
    icon: <DevToLogo size={32} />,
    text: 'DeviceType',
    link: '/app/device-type',
    developer: true,
  },
]
const pathRegexp = (route: string): RegExp => new RegExp(`^${route.replace(/\/:[^/]+/g, '/[^/]+')}$`)
export function AppLayout() {
  const { user, clear } = useAuthStore(state => state)
  const location = useLocation()
  // const { clear: workspaceClear } = useWorkspaceStore(state => state)
  // const { clear: masterClear } = useMasterStore(state => state)
  const theme = useTheme()
  const outlet = useOutlet()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setOpen(!open)
            }}
            edge="start"
            sx={{
              ...(open && { opacity: 0 }),

              borderRadius: '0.4rem',
            }}
          >
            <ListIcon size={32} />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            Blaze Writer
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer open={open} component="nav" onClose={() => setOpen(false)}>
        <DrawerHeader>
          <Typography variant="h3" color="inherit">
            Blaze
          </Typography>
          <IconButton color="inherit" aria-label="open drawer" onClick={() => setOpen(false)} edge="start">
            <CaretLeft size={32} />
          </IconButton>
        </DrawerHeader>
        <List
          sx={{
            padding: 1.5,
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            gap: 2,
          }}
        >
          {topMenuItems.map((item, index) => {
            const isActive = location.pathname.match(pathRegexp(item.link))
            if (item.developer && !user.developer) return null
            return (
              <ListItem disablePadding key={item.text}>
                <NavigationLink to={item.link} state={{ isActive, open }}>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </NavigationLink>
              </ListItem>
            )
          })}
        </List>

        <List
          sx={{
            padding: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 2,
          }}
        >
          <ListItem disablePadding>
            <NavigationLink to="/app/profile" state={{ isActive: window.location.pathname === '/app/profile', open }}>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar
                    sx={{
                      border: `3px solid ${theme.palette.primary.contrastText}`,
                      width: 48,
                      height: 48,
                    }}
                    src={`${import.meta.env.VITE_FILE_SERVICE_HOST}/profile/${user._id}.jpeg` || ''}
                  />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </NavigationLink>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={async () => {
                await auth.signOut()
                clear()
                // workspaceClear()
                // masterClear()
                navigate('/')
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: theme.palette.primary.contrastText,
                }}
              >
                <SignOut size={32} />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {outlet}
      </Main>
    </Box>
  )
}
