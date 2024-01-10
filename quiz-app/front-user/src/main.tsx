import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './state/store.ts'
import { theme } from './theme.ts'
import { ThemeProvider } from '@emotion/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
