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
    background: linear-gradient(117deg, #2c2e4a 0.41%, #240b36 99.22%);
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
        <Typography variant="h1" component="h1" gutterBottom align="center" sx={{ fontFamily: 'Neue Machina' }}>
          beeta one
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontFamily: 'Neue Machina' }}>
          Unleash Data Power.
        </Typography>
      </Stack>
      <Stack spacing={4} alignItems="center" justifyContent="center" className="right">
        {outlet}
      </Stack>
    </TemplateContainer>
  )
}
