import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './routes/Error-page.jsx'
import RecorderContainer from './components/RecorderContainer'
import AppContextProvider from './components/context'
import Root from './routes/root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: '/recorder/:id',
    element: <RecorderContainer />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </>
)
