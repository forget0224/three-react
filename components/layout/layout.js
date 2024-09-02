import Header from './header'
import Container from '@mui/material/Container'
export default function Layout({ children }) {
  return (
    <>
      <Container maxWidth="sm">
        <Header />
        <main>{children}</main>
      </Container>
    </>
  )
}
