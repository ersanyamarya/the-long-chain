import { Typography } from '@mui/material'
import { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function LazyLoaded({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<h1> Loading </h1>}>{children}</Suspense>
}

export default function Routing() {
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
