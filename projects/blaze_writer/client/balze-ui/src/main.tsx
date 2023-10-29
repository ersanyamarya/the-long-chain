import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import Routing from './routing'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <Routing />
  </StrictMode>
)
