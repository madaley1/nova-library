import { Button, Container, Grid, Typography } from "@mui/material"

type StepTwoProps = {
  continueFunction: () => void
  active: boolean
}

const StepTwo = (props: StepTwoProps) => {
  return (
    <Container sx={{display: `${props.active ? 'block': 'none'}`}}>
      <Grid container>
        <Grid item>
          <Typography></Typography>
        </Grid>
      </Grid>
      <Button onClick={props.continueFunction}>Continue</Button>
    </Container>
  )
}

export default StepTwo