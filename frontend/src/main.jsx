import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth } from './context/auth.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth>
    <BrowserRouter>
      <React.StrictMode>
        <Layout>
          <App />
          <Toaster
            toastOptions={{
              duration: 2000,
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </Layout>
      </React.StrictMode>
    </BrowserRouter>
  </Auth>
)