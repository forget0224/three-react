import NavBar from '../common.js/navBar'
import Box from '@mui/material/Box'
import Logo from '../common.js/logo'
import Container from '@mui/material/Container'
import ToggleColorModeButton from '../common.js/toggleColorModeButton'
import LanguageSwitcher from '../common.js/languageSwitcher'
import useIsMobile from '@/hook/useIsMobile'
export default function Header() {
  const isMobile = useIsMobile()
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '10px' : '20px 40px',
          zIndex: 1000,
        }}
        // sx={{
        //   display: 'flex',
        //   alignItems: 'center',
        //   justifyContent: 'space-between',
        //   padding: '8px',
        //   zIndex: 1000,
        //   width: '100%',
        // }}
      >
        <Logo />
        <NavBar />
      </Box>
    </Container>
  )
}
