// pages/_app.js
import { Provider, useSelector, useDispatch } from 'react-redux'
import { appWithTranslation } from 'next-i18next'
import { Noto_Sans_TC, Courier_New } from '@next/font/google'

import '@/styles/globals.css'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { store } from '@/store'
import { toggleMode } from '@/store/themeSlice'
const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '700'],
})

const theme = createTheme({
  palette: {
    primary: {
      main: '#081A40', // 自定义 primary 颜色
    },
    secondary: {
      main: '#BF925A', // 自定义 secondary 颜色
    },

    success: {
      main: '#B7D3B8', // 自定义 success 颜色
    },
    error: {
      main: '#BF4C41', // 自定义 error 颜色
    },
    info: {
      main: '#2196f3', // 自定义 info 颜色
    },
    text: {
      main: '#202B40', // 自定义 warning 颜色
    },
    inherit: {
      main: '#F2E6D8', // 自定义 inherit 颜色
    },
  },
  typography: {
    fontFamily: `${notoSansTC.className}, 'Courier New', monospace, sans-serif`,
  },
})

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
