import { signInWithPopup } from 'firebase/auth'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { auth, googleProvider } from '../../../firebase'
interface LoginStateReturn {
  loading: boolean
  loginWithGoogle: () => void
}

export function useLoginState(): LoginStateReturn {
  const [loading, setLoading] = useState(false)

  async function loginWithGoogle() {
    setLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (e: Error | any) {
      console.log('Error in loginWithGoogle')
      console.log(e)

      enqueueSnackbar(e.message, { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    loginWithGoogle,
  }
}
