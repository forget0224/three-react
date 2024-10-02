import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import ToggleColorModeButton from '../common.js/toggleColorModeButton'
import LanguageSwitcher from '../common.js/languageSwitcher'
import ScrollProgress from '../common.js/scrollProgress'
import useIsMobile from '@/hook/useIsMobile'
export default function Footer() {
  const isMobile = useIsMobile()
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          position: 'fixed',
          bottom: isMobile ? '-55px' : 0,
          left: isMobile ? '50%' : 0,
          transform: isMobile ? 'translate(-50%, -50%)' : 0,
          // left: 0,
          padding: isMobile ? '10px 10px' : '20px 40px',
          // padding: '20px 40px',
          height: isMobile ? '80px' : '100px',
        }}
      >
        <ScrollProgress vertical={isMobile ? true : false} />
        {!isMobile && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <ToggleColorModeButton />
            <LanguageSwitcher />
          </Box>
        )}
      </Box>
    </Container>
  )
}
