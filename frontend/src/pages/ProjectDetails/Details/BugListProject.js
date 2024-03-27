import { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Container, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch } from 'react-redux';
import { GetBugProjectApi, UpdateUserBugApi, UpdateBugApi,UpdateBugArchivedApi } from '../../../redux/actions/bugActions';
import { BugProject } from '../../../redux/selectors/bugSelectors';
import { ProjectDetails, ProjectDetailsData, SelectedProject } from '../../../redux/selectors/projectSelectors';
import { useParams, Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { GetCurrentUser, GetTokenUser } from '../../../redux/selectors/userSelectors';
import ArchiveIcon from '@mui/icons-material/Archive';
import './BugListProject.css'




export const Bugs = () => {
    
  const currentUser = GetCurrentUser()
  const [openMenuIndexBugId, setOpenMenuIndexBugId] = useState(false);
  const [statusItem, setStatusItem] = useState();
  const [priorityMenuIndexId, setPriorityMenuIndexId] = useState(false);
  const [priority, setPriority] = useState(null)
  const [priorityItem, setPriorityItem] = useState();
  const [assigneeMenuAnchorEl, setAssigneeMenuAnchorEl] = useState(null);
  const [assigneeMenuIndexId, setAssigneeMenuIndexId] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  //const tokenUser = localStorage.getItem('access_token');
  const tokenUser = GetTokenUser()  

  const bugProject = BugProject();
  const { error, loading } = bugProject || {};
  const [bugStates, setBugStates] = useState(bugProject);
  const projectData = ProjectDetailsData();
  const userRole = projectData.invitation.filter(user => user.email === currentUser.email &&
                                                 user.role === 'admin');
  const IsGuestAdmin = userRole[0] ? userRole[0].role : null;
  const IsAdminUser = GetCurrentUser()



  const handlePriorityClose = () => {
    setPriorityMenuIndexId(false)
    
    setPriority()
   
   };


  const handleStatusClick = (event, index) => {
    console.log(event.target)
    setOpenMenuIndexBugId(index);
    setStatusItem(event.currentTarget);
  }; 
  
  const handleStatusClose = (bugId) => {
    console.log(bugId)
    setOpenMenuIndexBugId(false);
    setStatusItem();
  };

  const handleAssigneeClick = (e, index) => {
    console.log( e.target.getAttribute('value'))
      setAssigneeMenuIndexId(index); 
      setAssigneeMenuAnchorEl(e.currentTarget);

      
    }; 
    const handleAssigneeClose = (e, index) => {
        setAssigneeMenuIndexId(index); 
        setAssigneeMenuAnchorEl(null);

        
      }; 


      const handleAssignee = (e, userId, bugId) => {
        const value = e.target.getAttribute('value');
      
        try{    
              dispatch(UpdateUserBugApi(id, bugId , tokenUser, userId))
              setBugStates((bugStates) =>
            
                bugStates.map((bug) => {
                  if (bug.id === bugId ) {
                   
                    return { ...bug, assigned_to_name: value }; 
                   
                  }
                  handleAssigneeClose()
               
                  return bug
                }))
            
              }catch(error){
    
                console.log(error)
              }
             
      };

      const handleUpdateBug =  (property,e, bugId) => {
          
        const value = e.target.getAttribute('value');
              dispatch(UpdateBugApi(id,bugId,tokenUser, value , property ))
              setBugStates((bugStates) =>
              
                  bugStates.map((bug) => {
                    if (bug.id === bugId) {
                      return { ...bug, [property]: value }; 
                    }
                    handleStatusClose()
                    handlePriorityClose()
                    return bug;
                  })
              )}

              const handlePriorityClick = (e, index) => {
                setPriorityMenuIndexId(index)
                setPriorityItem(e.currentTarget)
                
               };
             


  useEffect(() => {
    try {
      dispatch(GetBugProjectApi(id, tokenUser));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, id, tokenUser]);


  
  useEffect(() => {
    setBugStates(bugProject);
  }, [bugProject, projectData.invitation]);


  const handleArchivedBug = async(bugId, shouldArchive) => {
          
          try{
            await UpdateBugArchivedApi(id, bugId, tokenUser, shouldArchive, currentUser.id)
          }catch(error){
        
        }
          setBugStates((bugStates) =>
              bugStates.map((bug) => {
                if (bug.id === bugId) {
                  return { ...bug, is_archived: shouldArchive }; 
                }
               
                return bug;
              })
          )}


  const [openRows, setOpenRows] = useState([]);

  const handleRowToggle = rowId => {
    setOpenRows(prevOpenRows => {
      if (prevOpenRows.includes(rowId)) {
        return prevOpenRows.filter(id => id !== rowId);
      } else {
        return [...prevOpenRows, rowId];
      }
    });
  };


 
    return (

    


    <Container    >
      <TableContainer  className="BugsContainer" style={{ width: '104%', marginRight: '10px',marginTop:'20px', marginLeft: '-20px' }}>
        <Paper  elevation={2} >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Bug</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bugStates?.map((row, index) => (
              row.is_archived === false ? (
              <Fragment key={row.title}>
                <TableRow>
                { currentUser.groups[0] === 'admin' ||
                  IsGuestAdmin === 'admin' ||
                  currentUser?.email === row.created_by || 
                  currentUser?.email === row.assigned_to_email ? 
                       (
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleRowToggle(index)}
                    >
                      {openRows.includes(index) ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell> ) : ( <TableCell> </TableCell>)}
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                  {row.assigned_to_name}
                    {currentUser.id === row.assigned_to_id ||
                    currentUser.groups[0] === 'admin'||
                    IsGuestAdmin === 'admin' ?
                       (
                    <IconButton
                        size='small'
                        aria-label="assignee"
                        aria-controls={row.id}
                        aria-haspopup="true"
                        onClick={(event) => handleAssigneeClick(event, row.id)}
                        aria-expanded={assigneeMenuIndexId === row.id ? 'true' : undefined}
                        value={row.id}
                        >
                        <ArrowDropDownIcon />
                    </IconButton> ) : (null)}
                      <Menu
                              id={row.id}
                              anchorEl={assigneeMenuAnchorEl}
                              open={assigneeMenuIndexId === row.id}
                              onClose={ handleAssigneeClose}
                          
                          >
                          
                          {projectData.invitation?.map((user) => (
                              <MenuItem key={user.id} value={user.name} onClick={(event) => handleAssignee(event, user.user_id, row.id)}>
                                  {user.name}
                              </MenuItem>
                              ))}
                        </Menu> 
                   
                  </TableCell>
                  <TableCell>
                    {row.status}
                    { currentUser.id === row.assigned_to_id ||
                      currentUser.groups[0] === 'admin' ||
                      IsGuestAdmin === 'admin' ?
                       (
                    <IconButton 

                            color='red'
                            size='small'
                            aria-label="status"
                            aria-controls={row.id}
                            aria-haspopup="true"
                            onClick={(event) => handleStatusClick(event, row.id)}
                            aria-expanded={openMenuIndexBugId === row.id ? 'true' : undefined}
                            value={row.id}
                            >
                            <ArrowDropDownIcon />
                            </IconButton> ):(null)}
                            <Menu
                            id={row.id}
                            anchorEl={statusItem}
                            open={openMenuIndexBugId === row.id}
                            onClose={ handleStatusClose}

                            >
                            <MenuItem value="New" onClick={(event) => handleUpdateBug('status',event, row.id)}>New</MenuItem>
                            <MenuItem value="Rejected"  id={row.id} onClick={(event) => handleUpdateBug('status',event, row.id)}>Rejected</MenuItem>
                            <MenuItem value="Fixed"  onClick={(event) => handleUpdateBug('status',event, row.id)}>Fixed</MenuItem>
                            <MenuItem value="In progress" onClick={(event) => handleUpdateBug('status',event, row.id)}>In progress</MenuItem>
                            <MenuItem value="To be tested"  id={row.id} onClick={(event) => handleUpdateBug('status',event, row.id)}>To be tested</MenuItem>
                            <MenuItem value="Closed"  onClick={(event) => handleUpdateBug('status',event, row.id)}>Closed</MenuItem>
                            </Menu>
                                                
                    </TableCell>
                  <TableCell>
                    
                    {row.priority}
                    { currentUser.id === row.assigned_to_id ||
                      currentUser.groups[0] === 'admin' ||
                      IsGuestAdmin === 'admin' ?
                       (
              <IconButton
                    aria-label="priority"
                    aria-controls={row.id}
                    aria-haspopup="true"
                    onClick={(event) => handlePriorityClick(event, row.id)}
                    aria-expanded={priorityMenuIndexId === row.id ? 'true' : undefined}
                    value={row.id}
                  >
                    <ArrowDropDownIcon />
                  </IconButton>  ):(null )}
                  <Menu
                    id={row.id}
                    anchorEl={priorityItem}
                    open={priorityMenuIndexId === row.id}
                    onClose={ handlePriorityClose}
                    
                  >
                      <MenuItem  value='Critical' onClick={(event) => handleUpdateBug('priority',event,  row.id)}>Critical</MenuItem>
                      <MenuItem  value='High' onClick={(event) => handleUpdateBug('priority',event,  row.id)}>High</MenuItem>
                      <MenuItem  value='Normal' onClick={(event) => handleUpdateBug('priority',event,  row.id)}>Normal</MenuItem>
                      <MenuItem  value='Low' onClick={(event) => handleUpdateBug('priority',event,  row.id)}>Low</MenuItem>
                  </Menu>  
                    
                    
                    
                    </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openRows.includes(index)} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                        {
                          IsGuestAdmin === 'admin' ||
                          currentUser.groups[0] === 'admin' ||
                          currentUser?.email === row.created_by || 
                          currentUser?.email === row.assigned_to_email  ? (
                        <Button
                                variant="contained"
                                onClick={() => handleArchivedBug(row.id, true)}
                                startIcon={<ArchiveIcon />}
                                style={{
                                borderRadius: 20,
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                //backgroundColor: 'transparent',
                                color: 'white',
                                textTransform: 'none',
                                padding: '10px 20px',
                                fontSize: '16px',
                                }}
                            > 
                                 Archived
                             
                            </Button>) : (null) }
                          <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SearchIcon />}
                                style={{
                                borderRadius: 20,
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                backgroundColor: 'transparent',
                                color: 'black',
                               textTransform: 'none',
                                padding: '10px 20px',
                                fontSize: '16px',
                                }}
                            > <Link to={`/project/${projectData.id}/bug/${row.id}`} 
                                    style={{textDecoration: 'none', color: 'black'}}>
                                 Details</Link>
                             
                            </Button>
                          
                            
                        </Typography>
                        {/* Contenu pour la section History */}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            ): ( null)))}
          </TableBody>
        </Table>
        </Paper>
      </TableContainer>
    </Container>
  );
}
