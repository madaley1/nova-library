// import templates from '@/utils/libraries/templates'
import { Button, Container, Grid, Typography } from "@mui/material"
import { useContext } from "react"
import { AddNewLibraryContext } from "./AddNewLibraryContext"
type StepOneProps = {
  continueFunction: () => void
  active: boolean
}

const StepOne = (props: StepOneProps) => {
  const formData = useContext(AddNewLibraryContext)
  return (
    <Container sx={{display: `${props.active ? 'block': 'none'}`}}>
      <Typography variant="h5" sx={{marginBottom: '1em'}}>Select Desired Template</Typography>
      <Container>
        <Grid container sx={{marginBottom: '1em'}}>
          <Grid item sx={{marginRight: '1em'}}>
            <Button variant="outlined" onClick={()=> {formData.libraryType = "book"}}>Book Library</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined">Game Library</Button>
          </Grid>
        </Grid>
        <Grid container sx={{marginBottom: '1em'}}>
          <Grid item sx={{marginRight: '1em'}}>
            <Button variant="outlined">Movie Library</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined">TV Show Library</Button>
          </Grid>
        </Grid>
        <Grid container sx={{marginBottom: '1em'}}>
          <Grid item sx={{marginRight: '1em'}}>
            <Button variant="outlined">Custom Library</Button>
          </Grid>
        </Grid>
      </Container>
      <Button onClick={props.continueFunction}>Continue</Button>
    </Container>
  )
}

export default StepOne