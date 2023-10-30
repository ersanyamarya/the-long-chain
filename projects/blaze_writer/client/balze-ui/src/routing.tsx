import { BlazerLoader } from '@ersanyamarya/blazer-ui'
import { Typography } from '@mui/material'
import { useUserPostLoginCheckMutation } from '@the-long-chain/api-operations'
import { onAuthStateChanged } from 'firebase/auth'
import { enqueueSnackbar } from 'notistack'
import { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { auth } from './firebase'
import { useAuthStore } from './global_states/auth-store'
import { AppLayout } from './layouts/app'
import { LandingLayout } from './layouts/landing'
import { LoginPage } from './pages'
function LazyLoaded({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<BlazerLoader size={100} />}>{children}</Suspense>
}

function AuthRoute({ children, isAuthenticated }: { children: React.ReactNode; isAuthenticated: boolean }) {
  if (!isAuthenticated) return <Navigate to="/" />
  return <LazyLoaded>{children}</LazyLoaded>
}

function PublicRoute({ children, isAuthenticated }: { children: React.ReactNode; isAuthenticated: boolean }) {
  if (isAuthenticated) return <Navigate to="/app" />
  return <LazyLoaded>{children}</LazyLoaded>
}

export default function Routing() {
  const { user, setToken, token, setUser, clear } = useAuthStore(state => state)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unsubscribe = () =>
      onAuthStateChanged(auth, async fbUser => {
        if (fbUser) {
          console.info('------------------> User is logged in <------------------')
          const fbToken = await fbUser.getIdToken()

          if (user._id === '' || token !== fbToken) {
            console.info('------------------> Need to update user <------------------')
            setToken(fbToken)
            console.info('--------------------> Post login check <-------------------')
            await userPostLoginCheck()
          } else setLoading(false)
        } else {
          clear()
          setLoading(false)
        }
      })
    return unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [userPostLoginCheck] = useUserPostLoginCheckMutation({
    onCompleted: data => {
      console.info('------------------> User post login check <------------------')
      if (data.userPostLoginCheck) {
        setUser(data.userPostLoginCheck)
        //  if (auth.currentUser?.photoURL)
        //    uploadUrlToImageFile(data.userPostLoginCheck._id, auth.currentUser?.photoURL.replace('s96-c', 's800-c'))
        //  loadMasterData()
      }
    },
    onError: e => {
      console.log('Error in userPostLoginCheck')
      console.log(e)

      enqueueSnackbar(e.message, { variant: 'error' })
    },
  })
  if (loading) return <BlazerLoader size={100} />
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute isAuthenticated={user._id !== ''}>
              <LandingLayout />
            </PublicRoute>
          }
        >
          <Route path="/" element={<LoginPage />} />
        </Route>
        <Route
          path="/app"
          element={
            <AuthRoute isAuthenticated={user._id !== ''}>
              <AppLayout />
            </AuthRoute>
          }
        >
          <Route path="/app" element={<Typography variant="h1">Hello World Engineering</Typography>} />

          <Route path="/app/*" element={<Navigate to="/app" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
