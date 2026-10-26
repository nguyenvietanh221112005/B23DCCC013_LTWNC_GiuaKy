import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useAppDispatch } from './app/hooks'
import { AppHeader } from './components/AppHeader'
import { SpinnerIcon } from './components/icons'
import { fetchBooksThunk } from './features/books/booksSlice'
import { useTheme } from './features/theme/useTheme'
import { HomePage } from './pages/HomePage'

const StatsPage = lazy(() => import('./pages/StatsPage'))

function App() {
  const dispatch = useAppDispatch()
  const { theme } = useTheme()

  useEffect(() => {
    const shouldFail = new URLSearchParams(window.location.search).has('fail')
    dispatch(fetchBooksThunk({ shouldFail }))
  }, [dispatch])

  return (
    <div className="app" data-theme={theme}>
      <AppHeader />
      <main className="container main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/stats"
            element={
              <Suspense
                fallback={
                  <p className="loading-label" role="status">
                    <SpinnerIcon size={16} className="spin" />
                    Đang tải...
                  </p>
                }
              >
                <StatsPage />
              </Suspense>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
