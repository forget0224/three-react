import React, { useEffect, useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { glassmorphismStyle } from '../styles/glass'
const VerticalLinearProgress = styled(LinearProgress)(
  ({ theme, vertical }) => ({
    height: '100%',
    width: '10px',
    transform: vertical ? 'rotate(-90deg)' : 'rotate(0deg)',
    ...glassmorphismStyle,
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#3f51b5',
    },
  }),
)

function ScrollProgress({ vertical = false }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const scrollPosition = window.scrollY
      const progress = (scrollPosition / totalHeight) * 100
      setProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Box
      sx={{
        zIndex: 1300,
      }}
    >
      <VerticalLinearProgress
        variant="determinate"
        vertical={vertical}
        value={progress}
      />
    </Box>
  )
}

export default ScrollProgress
