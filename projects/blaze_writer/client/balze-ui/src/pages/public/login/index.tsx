import { BlazerLoader } from '@ersanyamarya/blazer-ui'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { GoogleLogo, LinkedinLogo, SignIn } from '@phosphor-icons/react'
import { useLoginState } from './login-state'
export function LoginPage() {
  const { loading, loginWithGoogle } = useLoginState()

  if (loading) return <BlazerLoader size={100} containerSize="100vh" />

  return (
    <Stack spacing={4} alignItems="center" justifyContent="center" sx={{ width: '100%', px: 4, pb: 12, pt: 8 }}>
      <Typography variant="h4">Login</Typography>
      <TextField disabled label="Email" variant="outlined" fullWidth />
      <TextField disabled label="Password" variant="outlined" fullWidth />
      <Button
        disabled
        variant="outlined"
        color="primary"
        startIcon={<SignIn size={24} />}
        onClick={loginWithGoogle}
        sx={{ width: '100%' }}
      >
        Login
      </Button>
      <br />
      <Stack direction="column" spacing={2} width={'100%'} alignItems="center">
        <Button
          variant="outlined"
          color="primary"
          startIcon={<GoogleLogo size={24} />}
          onClick={loginWithGoogle}
          sx={{ width: '100%' }}
        >
          Login with Google
        </Button>
        <Button
          disabled
          variant="outlined"
          color="primary"
          startIcon={<LinkedinLogo size={24} />}
          onClick={loginWithGoogle}
          sx={{ width: '100%' }}
        >
          Login with LinkedIn
        </Button>
        <Button disabled variant="text" color="primary" sx={{ alignSelf: 'flex-end', textDecoration: 'underline' }}>
          Forgot Password?
        </Button>
      </Stack>
      {/* <Button disabled variant="contained" color="primary" onClick={logout}>
        Logout
      </Button> */}
    </Stack>
  )
}
