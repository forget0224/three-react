import React from 'react'
import Layout from '@/components/layout/layout'
import Image from 'next/image'
import { Box, Container, Typography } from '@mui/material'
import { glassmorphismStyle } from '@/components/styles/glass'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Grid from '@mui/material/Grid2'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import { SiApplemusic as AppleIcon } from 'react-icons/si'
import { SiSoundcloud as SoundcloudIcon } from 'react-icons/si'
import { SiSpotify as SpotifyIcon } from 'react-icons/si'
import { useMediaQuery } from '@mui/material'
import dynamic from 'next/dynamic'
const NoiseScene2 = dynamic(() => import('@/components/noise3'), {
  ssr: false,
})
export default function Albums() {
  const isDesktop = useMediaQuery('(min-width:960px)')
  const albumData = {
    title: {
      en: 'Digital Enclave',
      zh: '文化飛地',
    },
    description: {
      en: `We were torn into all kind of enclaves by rapid information,
      infiltrating individuals.Digital communities in turn solidified
      the boundaries of various enclaves.We have lost our connection
      in physical space.When the process of re-embedding into society
      turns arrogant, reality and form disintegrate in us, bring only
      anger.`,
      zh: '一個受中國經典小說啟發的音樂之旅。',
    },
    tracks: [
      {
        title: { en: 'Mr.Bauman', zh: 'Mr.Bauman' },
        duration: '2:02',
        isTitleSong: true,
      },
      {
        title: { en: 'simple complex', zh: 'simple complex' },
        duration: '2:14',
      },
      {
        title: { en: 'SAMO', zh: 'SAMO' },
        duration: '3:22',
      },
      {
        title: {
          en: 'digital enclave w/ Zashō',
          zh: 'digital enclave w/ Zashō',
        },
        duration: '1:58',
      },
      {
        title: { en: '.U.N.I', zh: '.U.N.I' },
        duration: '3:36',
      },
    ],
    albumCover: '/img/hugo/album-文化飛地.jpg',
    albumColor: '#b9e3f9',
    recordingYear: 2023,
    releaseDate: '08-15-2023',
    producer: 'Hugo Lin',
    coverDesign: 'Hugo Lin',
    totalDuration: '42:17',
  }
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        <NoiseScene2 color={'#22526e'} />
      </Box>
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Layout>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '60px 0',
                gap: '20px',
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: 250,
                    sm: 300,
                    md: 550,
                  },
                  height: {
                    xs: 250,
                    sm: 300,
                    md: 550,
                  },
                }}
              >
                <Image
                  width={550}
                  height={550}
                  src={albumData.albumCover}
                  alt={albumData.title.zh}
                />
              </Box>

              <Box
                sx={{
                  ...glassmorphismStyle,
                  width: { sm: '800px', xs: '350px' },
                  borderRadius: { sm: '70px', xs: '30px' },
                  minHeight: { sm: '500px', xs: '300px' },
                  display: 'flex',
                  flexDirection: 'column',
                  padding: { sm: '20px 80px', xs: '20px' },
                }}
              >
                <Typography
                  align="justify"
                  paragraph
                  sx={{ fontSize: { sm: '16px', xs: '12px' } }}
                >
                  {albumData.description.en}
                </Typography>
                <Box>
                  <List sx={{ padding: { sm: '0 20px', xs: '0 ' } }}>
                    {albumData.tracks.map((track, index) => (
                      <div key={index}>
                        <ListItem
                          key={index}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: { sm: '16px', xs: '14px' },
                          }}
                        >
                          <Box sx={{ flex: '0 0 auto' }}>{index + 1}.</Box>
                          <Box sx={{ flex: '1', textAlign: 'center' }}>
                            {track.title.zh}
                          </Box>
                          <Box sx={{ flex: '0 0 auto', textAlign: 'right' }}>
                            {track.duration}
                          </Box>
                        </ListItem>
                      </div>
                    ))}
                  </List>
                  <Box
                    sx={{
                      width: '100%',
                      padding: 2,
                      textAlign: 'center',
                      fontSize: '12px',
                    }}
                  >
                    <Grid container columnSpacing={2} rowSpacing={2}>
                      {/* 第一列 */}
                      <Grid item size={6}>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { sm: '16px', xs: '12px' } }}
                        >
                          錄音日期
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { sm: '16px', xs: '12px' } }}
                        >
                          {' '}
                          {albumData.recordingYear}
                        </Typography>
                      </Grid>
                      <Grid item size={6}>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { sm: '16px', xs: '12px' } }}
                        >
                          發行日期
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { sm: '16px', xs: '12px' } }}
                        >
                          {' '}
                          {albumData.releaseDate}
                        </Typography>
                      </Grid>

                      {/* 第二列 */}
                      <Grid item size={6}>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { sm: '16px', xs: '12px' } }}
                        >
                          製作人
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { sm: '16px', xs: '12px' } }}
                        >
                          {' '}
                          {albumData.producer}
                        </Typography>
                      </Grid>
                      <Grid item size={6}>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { sm: '16px', xs: '12px' } }}
                        >
                          封面設計
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { sm: '16px', xs: '12px' } }}
                        >
                          {albumData.coverDesign}
                        </Typography>
                      </Grid>

                      <Grid item size={6}>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { sm: '16px', xs: '12px' } }}
                        >
                          總時長
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { sm: '16px', xs: '12px' } }}
                        >
                          {' '}
                          {albumData.totalDuration}
                        </Typography>
                      </Grid>
                      <Grid size={6}>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { sm: '16px', xs: '12px' } }}
                        >
                          音樂平台
                        </Typography>
                        <Typography>
                          <IconButton
                            component={Link}
                            href="https://music.apple.com"
                            target="_blank"
                            rel="noopener"
                          >
                            <AppleIcon />
                          </IconButton>
                          <IconButton
                            component={Link}
                            href="https://spotify.com"
                            target="_blank"
                            rel="noopener"
                          >
                            <SpotifyIcon />
                          </IconButton>
                          {/* 
                      <IconButton
                        component={Link}
                        href="https://spotify.com"
                        target="_blank"
                        rel="noopener"
                      >
                        <SoundcloudIcon />
                      </IconButton> */}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Layout>
      </Box>
    </Box>
  )
}
