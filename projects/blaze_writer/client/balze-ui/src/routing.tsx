import { Typography } from '@mui/material'
import { useUserPostLoginCheckMutation } from '@the-long-chain/api-operations'
import { onAuthStateChanged } from 'firebase/auth'
import { Suspense, useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { auth } from './firebase'
import { useAuthStore } from './global_states/auth-store'
function LazyLoaded({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<h1> Loading </h1>}>{children}</Suspense>
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
      //  enqueueSnackbar(e.message, { variant: 'error' })
    },
  })
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LazyLoaded>
              <Typography variant="h1">Hello World</Typography>
            </LazyLoaded>
          }
        />
      </Routes>
    </Router>
  )
}
