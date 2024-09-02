import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState('ZH')

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    // 語言切換邏輯
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        onClick={() => handleLanguageChange('EN')}
        sx={{
          color: language === 'EN' ? 'error.main' : 'text.secondary',
          fontWeight: language === 'EN' ? '700' : '500',
          padding: '4px 8px',
          minWidth: 'auto',
        }}
      >
        EN
      </Button>
      <Typography sx={{}}>|</Typography>
      <Button
        onClick={() => handleLanguageChange('ZH')}
        sx={{
          color: language === 'ZH' ? 'error.main' : 'text.secondary',
          fontWeight: language === 'ZH' ? '700' : '500',
          padding: '4px 8px',
          minWidth: 'auto',
        }}
      >
        ZH
      </Button>
    </Box>
  )
}
