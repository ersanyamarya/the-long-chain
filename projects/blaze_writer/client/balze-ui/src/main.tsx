import { ApolloProvider } from '@apollo/client/react/context'
import { ThemeContainer } from '@ersanyamarya/blazer-ui'
import { CssBaseline } from '@mui/material'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { client } from './client'
import Routing from './routing'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <ThemeContainer>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Routing />
      </ApolloProvider>
    </ThemeContainer>
  </StrictMode>
)
