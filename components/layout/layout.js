import Header from './header'
import Container from '@mui/material/Container'
import Footer from './footer'
export default function Layout({ children }) {
  return (
    <>
      <Container maxWidth="xl">
        <Header />
        <main>{children}</main>
        <Footer />
      </Container>
    </>
  )
}
