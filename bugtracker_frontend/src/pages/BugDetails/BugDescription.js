
import { BugProject } from "../../redux/selectors/bugSelectors"
import { useParams } from "react-router-dom"
import { Container, Card, CardContent, Typography, Grid,  } from "@mui/material"

export const BugDescription = () => {

  const {projectId, bugId} = useParams() 
  const bugProject = BugProject()
  const searchSelectedBug = bugProject?.filter(bug => bug.id === parseInt(bugId))



  return (
    
  
<Container maxWidth="lg">
<Card elevation={2} style={{ paddingBottom: '40px', marginTop: '16px', marginBottom: '30px', width: '106%', marginLeft:'-20px' }}>
<CardContent >
<Typography style={{marginBottom: '40px' }} variant="h4" gutterBottom>
</Typography>
<Grid item xs={12} sm={4} style={{marginLeft: '30px'}}  >
  <Typography  fontSize={"1.5rem"} align="left" variant="subtitle1">
    <strong>Ticket Description : </strong> 
   <Typography>
   {searchSelectedBug[0]?.description}
   </Typography>
  
  </Typography>
 
</Grid>
  <hr style={{ marginTop: '10px', marginBottom: '10px', borderColor: '#ddd' }} />
<Grid  container spacing={5}  style={{ marginTop: '5px', marginLeft: '-10px' }} >

<Grid item xs={12} sm={4} >
  <Typography align="left" variant="subtitle1" >
    <strong>Title : </strong> {searchSelectedBug[0]?.title}
  </Typography>
</Grid>

<Grid item xs={12} sm={4}>
  <Typography align="left" variant="subtitle1" >
    <strong>Assigned_to : </strong> {searchSelectedBug[0]?.assigned_to_name}
  </Typography>
</Grid>



<Grid item xs={12} sm={4} >
  <Typography align="left" variant="subtitle1">
    <strong>Created : </strong> {searchSelectedBug[0]?.date}
  </Typography>
</Grid> 
</Grid> <hr style={{ marginTop: '10px', marginBottom: '10px', borderColor: '#ddd' }} />
<Grid container spacing={5} style={{ marginTop: '10px',  marginLeft: '-10px' }}>

<Grid item xs={12} sm={4}>
  <Typography align="left" variant="subtitle1">
    <strong>Priority : </strong> {searchSelectedBug[0]?.priority}
  </Typography>
</Grid>
<Grid item xs={12} sm={4}>
  <Typography align="left" variant="subtitle1">
    <strong>Project : </strong>{searchSelectedBug[0]?.project}
  </Typography>
</Grid>
<Grid item xs={12} sm={4}>
    <Typography align="left" variant="subtitle1" >
<strong>Status : </strong>{searchSelectedBug[0]?.status}
</Typography>
</Grid>



</Grid>

</CardContent>
</Card>

</Container>
)
}
 