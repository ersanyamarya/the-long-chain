import {
  Avatar,
  Box,
  Button,
  CSSObject,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  styled,
  useTheme,
} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { CompassTool, Cpu, DevToLogo, GearSix, SignOut, SquaresFour } from '@phosphor-icons/react'
import { Cube } from '@phosphor-icons/react/dist/ssr'
import { useState } from 'react'
import { NavLink, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import { auth } from '../firebase'
// import { useMasterStore, useWorkspaceStore } from '../global_states'
import { useAuthStore } from '../global_states/auth-store'
const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 16px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 16px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: prop => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }))

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,

  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
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

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <Drawer variant="permanent" open={open} component="nav">
        <DrawerHeader>
          <Button
            variant="text"
            color="inherit"
            sx={{ fontSize: theme.typography.h4, fontWeight: 700, fontFamily: 'Neue Machina' }}
            onClick={() => {
              open ? handleDrawerClose() : handleDrawerOpen()
            }}
          >
            b1
          </Button>
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
      <Box component="main" sx={{ flexGrow: 1 }}>
        {outlet}
      </Box>
    </Box>
  )
}
