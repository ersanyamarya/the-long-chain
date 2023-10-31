import { Box, Stack, Typography, styled } from '@mui/material'
import { useOutlet } from 'react-router-dom'

const TemplateContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;

  .left {
    color: white;
    background: linear-gradient(154deg, rgba(253, 165, 53, 0.17) -67.73%, rgba(252, 91, 61, 0.62) 133.92%);
  }

  .right {
    padding: 2rem;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    .left {
      display: none;
    }
  }
`

export function LandingLayout() {
  const outlet = useOutlet()
  return (
    <TemplateContainer>
      <Stack spacing={0.2} alignItems="center" justifyContent="center" className="left">
        <Typography variant="h1" component="h1" gutterBottom align="center">
          Blaze Writer
        </Typography>
        <Typography variant="h3" component="h2" gutterBottom align="center">
          Write Smarter and Faster
        </Typography>
      </Stack>
      <Stack spacing={4} alignItems="center" justifyContent="center" className="right">
        {outlet}
      </Stack>
    </TemplateContainer>
  )
}
