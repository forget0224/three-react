import NavBar from '../common.js/navBar'
import Box from '@mui/material/Box'
import Logo from '../common.js/logo'

export default function Header() {
  return (
    <header>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%', // 让 Box 占满整个宽度
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          zIndex: 1000, // 确保导航栏在其他内容之上
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 添加阴影效果
        }}
      >
        <Logo />
        <NavBar />
      </Box>
    </header>
  )
}
