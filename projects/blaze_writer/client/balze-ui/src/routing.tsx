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
              {' '}
              <h1> Hello</h1>{' '}
            </LazyLoaded>
          }
        />
      </Routes>
    </Router>
  )
}
