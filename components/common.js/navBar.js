import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import { CiMenuBurger as MenuIcon } from 'react-icons/ci'
import { GoX as CloseIcon } from 'react-icons/go'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import ToggleColorModeButton from './toggleColorModeButton'
import LanguageSwitcher from './languageSwitcher'
import { glassmorphismStyle } from '../styles/glass'
import useIsMobile from '@/hook/useIsMobile'
function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isMobile = useIsMobile()
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setDrawerOpen(open)
  }

  const list = () => (
    <Box
      sx={{ width: '100%', height: '100%' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Home', 'About', 'Services', 'Contact'].map((text) => (
          <ListItem
            button
            key={text}
            sx={{ textAlign: 'center', cursor: 'pointer' }}
          >
            <ListItemText
              primary={text}
              primaryTypographyProps={{
                sx: {
                  fontSize: {
                    xs: '4rem', // 手机屏幕
                    sm: '6rem', // 平板
                    md: '8rem', // 桌面
                  },
                  fontWeight: '900',
                  // fontFamily: 'Inria Sans, sans-serif',
                  fontFamily: 'Coda,  system-ui',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar
        sx={{
          width: '50px',
          height: '50px',
          // backdropFilter: 'blur(20px)',
          // background:
          //   'linear-gradient(164deg, rgba(242, 230, 216, 0.40) 6.87%, rgba(140, 133, 125, 0.10) 93.09%)',
          // border: '1px solid rgba(242, 230, 216, 0.30)',
          // boxShadow: '0px 4px 25px -1px rgba(0, 0, 0, 0.25)',
          ...glassmorphismStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          zIndex: 1400,
          position: 'initial',
        }}
      >
        <IconButton
          color="text"
          aria-label={drawerOpen ? 'close' : 'menu'}
          onClick={toggleDrawer(!drawerOpen)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            width: '100%',
            height: '100%',
            fontSize: '1.5rem',
          }}
        >
          <MenuIcon />
        </IconButton>
      </AppBar>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'primary.main',
            color: 'error.main',
            position: 'relative',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ fontSize: '1.5rem', color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {list()}

        {isMobile && (
          <Box>
            <ToggleColorModeButton />
            <LanguageSwitcher />
          </Box>
        )}
      </Drawer>
    </>
  )
}

export default NavBar
