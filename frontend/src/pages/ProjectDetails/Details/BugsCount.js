import { Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BugProject } from '../../../redux/selectors/bugSelectors';

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: 'auto',
  width: '200px',
  height: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const BugsCount = () => {
  const totalBugInProject = BugProject()
  const criticalBugs = totalBugInProject === undefined ? [] : totalBugInProject
      .filter(bug => bug.priority === 'Critical');
 
  const numberOfCriticalBugs = criticalBugs.length;
  


  return (
    <Fragment>
    <Box display='flex' justifyContent="flex-end"  paddingRight="3px" marginTop={'-300px'}  >
      <Paper elevation={4} sx={{marginBottom: '30px',  width: '305px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
        <Box textAlign="center">
          <Typography variant="h4" component="h2">
           { totalBugInProject === undefined  ? [] : totalBugInProject.length}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Total(s) Bug
          </Typography>
          <Typography variant="h4" component="h2">
           { numberOfCriticalBugs ?? '0'}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            Critical(s) Bug
          </Typography>
        </Box>
        
      </Paper>
     
    </Box>
    
    {/* Reste du contenu */}
  </Fragment>)}