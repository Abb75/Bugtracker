import React from 'react';
import Badge from '@mui/material/Badge';
import { Typography, Box, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { Allbug } from '../../../redux/selectors/bugSelectors';
import { GetCurrentUser } from '../../../redux/selectors/userSelectors';
import { SettingsBrightnessRounded } from '@mui/icons-material';

export const BoxCountTickets = () => {

    const bugCount = Allbug()
    const countProject = useSelector(state => state.project.project)

    //const filterBugCount = bugCount?.filter(bug => bug.is_archived === false)
    const projectfilter = countProject?.flatMap(project =>
      bugCount.filter(bug =>
        bug.project === project.name &&
        project.is_archived === false &&
        !bug.is_archived
      )
    );
    return(



<Box display="flex" justifyContent="center" marginLeft="-170px" marginTop='40px' style={{paddingRight: '15px', paddingLeft: '5px'}}>
<Paper elevation={4} sx={{marginLeft: '180px',marginBottom: '-50px', width: '345px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'primary.contrastText',  boxShadow: '1px 1px 7px rgba(0.0, 0.0, 0.0, 0.1)' }}>
  <Box textAlign="center">
  <Typography color={'blue'} variant="h4" component="h2">
     {projectfilter?.length ??  '0'}
    </Typography>
 
    <Typography color={'black'} style={{ fontWeight: 'bold', fontFamily: 'inherit'}}>
   Total Ticket(s)

    </Typography>
    
    
    
  </Box>
  
</Paper>

</Box>

    )
}

