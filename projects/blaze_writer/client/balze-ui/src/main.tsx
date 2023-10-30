import { ThemeContainer } from '@ersanyamarya/blazer-ui'
import { CssBaseline } from '@mui/material'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import Routing from './routing'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <ThemeContainer>
      <CssBaseline />
      <Routing />
    </ThemeContainer>
  </StrictMode>
)
