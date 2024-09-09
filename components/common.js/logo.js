import Image from 'next/image'
import Link from 'next/link'
import Box from '@mui/material/Box'

export default function Logo() {
  return (
    <Link href="/">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: {
            xs: 50,
            sm: 65,
            md: 80,
          },
          height: 'auto',
        }}
      >
        <Image
          src="/img/hugo/logo.jpg"
          alt="Logo"
          width={100}
          height={50}
        
          priority
        
          style={{ objectFit: 'cover' }}

        />
      </Box>
    </Link>
  )
}
