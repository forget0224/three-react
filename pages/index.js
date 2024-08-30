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
          backgroundImage: `url('/img/hugo/album-切片之一.jpg')`,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(50%)',
        }}
      ></Box>
      <Layout
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100dvw',
          height: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
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
              xs: '5rem', // 手机屏幕
              sm: '6rem', // 平板
              md: '7rem', // 桌面
              lg: '8rem', // 更大桌面
            },
            lineHeight: {
              xs: 1.2, // 手机屏幕
              sm: 1.3, // 平板
              md: 1.4, // 桌面
              lg: 1.5, // 更大桌面
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
                xs: '150px', // 手机屏幕
                sm: '200px', // 平板
                md: '250px', // 桌面
              },
              height: 'auto', // 自动调整高度以保持图像比例
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
              layout="responsive" // 或者 'fill', 這取決於你的需求
              objectFit="cover"
              priority // 高優先級加載，用於優化首屏顯示
            />
          </Box>
        </div>
      </Layout>
    </>
  )
}
