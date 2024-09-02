import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import NavBar from '@/components/common.js/navBar'
import Box from '@mui/material/Box'
import { Paper } from '@mui/material'
import Layout from '@/components/layout/layout'
import Typography from '@mui/material/Typography'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { t } = useTranslation('common')
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/img/hugo/album-切片之一.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px) brightness(0.7)',
            zIndex: -1,
          },
        }}
      >
        <Layout
          sx={{
            width: '100dvw',
            height: '100dvh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            zIndex: 1,
            position: 'relative',
          }}
        >
          <Typography
            variant="h1"
            color="error.main"
            sx={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              whiteSpace: 'nowrap',
              fontSize: {
                xs: '5rem',
                sm: '6rem',
                md: '7rem',
                lg: '8rem',
              },
              lineHeight: {
                xs: 1.2,
                sm: 1.3,
                md: 1.4,
                lg: 1.5,
              },
            }}
          >
            Midnight In Nowhere
          </Typography>

          <div>
            <Box
              sx={{
                backgroundColor: 'primary.main',
                width: {
                  xs: '150px',
                  sm: '200px',
                  md: '250px',
                },
                height: 'auto',
                position: 'fixed',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Image
                src="/img/hugo/album-切片之一.jpg"
                alt="Logo"
                width={150}
                height={50}
                layout="responsive"
                objectFit="cover"
                priority
              />
            </Box>
          </div>
        </Layout>
      </Box>
    </>
  )
}
