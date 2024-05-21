import { Button, Container, Grid, Typography } from "@mui/material"

type StepThreeProps = {
  active: boolean
}

const StepThree = (props: StepThreeProps) => {
  return (
    <Container sx={{display: `${props.active ? 'block': 'none'}`}}>
      <Grid container>
        <Grid item>
          <Typography></Typography>
        </Grid>
      </Grid>
      <Button>Submit New Library</Button>
    </Container>
  )
}

export default StepThree