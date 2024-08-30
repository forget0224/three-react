import React from 'react'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

function ToggleColorModeButton({ mode, toggleMode }) {
  return (
    <IconButton onClick={toggleMode} color="inherit">
      {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  )
}

export default ToggleColorModeButton
