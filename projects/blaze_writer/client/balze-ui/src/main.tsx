import { ApolloProvider } from '@apollo/client/react/context'
import { ThemeContainer } from '@ersanyamarya/blazer-ui'
import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { NotiStackComponents } from './StyledMaterialDesignContent'
import { client } from './client'
import Routing from './routing'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <ThemeContainer>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        preventDuplicate
        autoHideDuration={3000}
        Components={NotiStackComponents}
      >
        <ApolloProvider client={client}>
          <Routing />
        </ApolloProvider>
      </SnackbarProvider>
    </ThemeContainer>
  </StrictMode>
)
