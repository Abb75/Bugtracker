import { GetCurrentUser, GetTokenUser } from "../../redux/selectors/userSelectors"
import { useDispatch } from "react-redux"
import { BugProject } from "../../redux/selectors/bugSelectors"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { selectedBug } from "../../redux/actions/bugActions"
import { GetBugHistoryApi } from "../../redux/actions/bugActions"
import { Container, Card, CardContent, Typography, Grid, Box } from "@mui/material"
import { BugHistoryData } from "../../redux/selectors/bugSelectors"

 export const BugHistory = () => {

    const [formatDataBug, setFormatDataBug] = useState([])
    const tokenUser = GetTokenUser()  

    const history = BugHistoryData()
    const currentUser = GetCurrentUser()
    const dispatch = useDispatch() 
    const {projectId, bugId} = useParams()
    const bugProject = BugProject()
    const searchSelectedBug = bugProject?.filter(bug => bug.id === parseInt(bugId))
    const formatDataBugHistory = () => {
    const historyBug = history?.data;
    const formatDataBug = historyBug
      ?.map(data => JSON.parse(data[0]?.replaceAll("\"", "&quot;")?.replaceAll("'", "\"")))
      .filter(Boolean); 
  
    setFormatDataBug([formatDataBug]);
  }
  useEffect(() => {
    try{
       dispatch(selectedBug(searchSelectedBug));
       dispatch(GetBugHistoryApi(projectId, bugId, tokenUser));
    }
    catch(error){
      console.error(error)
    }
   
  }, [projectId, bugId]);
  
  useEffect(() => {
    formatDataBugHistory();
  }, [history])
  

return (
    <Container>
          <Box display="flex" justifyContent="space-between" marginTop="5px" marginBottom="10px"  marginLeft='130px' paddingRight='50px' width={"100%"} >

    <Card elevation={2} style={{ maxHeight: '550px',overflowY: 'auto' }}>
                <CardContent>
                <Typography style={{marginBottom: '40px'}} variant="h5" gutterBottom>
              <strong>History(s) :</strong> 
            
            </Typography>
                  {formatDataBug[0]?.map((history) => (
                    <div key={history.id}>
                      <Grid container spacing={2} alignItems="center">
                       
                        <Grid item>
                          <Typography  style= {{ fontSize: '1rem',color: 'black'}} variant="subtitle1">
                            <strong>{history.date} </strong>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1">
                             Status changed on {history.date} to {history.status}
                          </Typography>
                        </Grid>
                      </Grid>
                      <hr style={{ marginTop: '20px', marginBottom: '10px', borderColor: '#ddd' }} />

                    </div>
                  ))}
                </CardContent>
              </Card>
              </Box>
    </Container>
  );
}
