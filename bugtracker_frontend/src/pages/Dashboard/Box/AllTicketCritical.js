import React from 'react';
import Badge from '@mui/material/Badge';
import { Typography, Box, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

export const BoxCountTicketsCritical = () => {

  const bugCount = useSelector(state => state.bug.bug)
  const countProject = useSelector(state => state.project.project)
  const projectfilter = countProject?.flatMap(project =>
  bugCount.filter(bug =>
    bug.project === project.name &&
    bug.priority === 'Critical' &&
    project.is_archived === false &&
    !bug.is_archived
  )
);
    
    return(

<Box display="flex" justifyContent="flex-end" paddingRight="22px" paddingLeft='5px'  marginLeft='29px' marginTop= '-100px'>
<Paper elevation={4} sx={{ marginRight: '-20px',marginTop: '190px', width: '500px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'primary.contrastText',  boxShadow: '1px 1px 7px rgba(0.0, 0.0, 0.0, 0.1)' }}>
<Box textAlign="center">
    <Typography color={'blue'}  variant="h4" component="h2">
     {projectfilter?.length ?? '0'}
    </Typography>
 
    <Typography color={'black'} style={{ fontWeight: 'bold', fontFamily: 'inherit'}}>
  Ticket(s) critical

    </Typography>
    
    
    
  </Box>
  
</Paper>

</Box>

    )
}

