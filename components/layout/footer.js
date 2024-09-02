import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import ToggleColorModeButton from '../common.js/toggleColorModeButton'
import LanguageSwitcher from '../common.js/languageSwitcher'
import ScrollProgress from '../common.js/scrollProgress'
import { useMediaQuery } from '@mui/material'
export default function Footer() {
  const isDesktop = useMediaQuery('(min-width:960px)')
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          position: 'fixed',
          bottom: isDesktop ? 0 : '-55px',
          left: isDesktop ? 0 : '50%',
          transform: isDesktop ? 0 : 'translate(-50%, -50%)',
          // left: 0,
          padding: isDesktop ? '20px 40px' : '10px 10px',
          // padding: '20px 40px',
          height: isDesktop ? '100px' : '80px',
        }}
      >
        <ScrollProgress vertical={isDesktop ? false : true} />
        {isDesktop && (
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
