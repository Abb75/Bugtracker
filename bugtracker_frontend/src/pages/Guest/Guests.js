import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, IconButton, Menu } from '@mui/material';
//import { GetUserProjectApi } from '../../../store/actions/projectActions';
import { ListProjectByUser } from '../../redux/selectors/projectSelectors';
import { GetGuestUsersByAdmin } from '../../redux/selectors/userSelectors';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch } from 'react-redux';
import { UpdateBugApi } from '../../redux/actions/bugActions';
import { UpdateRoleUserByProjectApi } from '../../redux/actions/userActions';
import DeleteGuestUserDialog from '../../components/dialog/DeleteGuestUser';
import { GetUserProjectApi } from '../../redux/actions/projectActions';
import { GetTokenUser } from '../../redux/selectors/userSelectors';
// Exemple de données de projets et d'utilisateurs invités
import './Guests.css'

export const GuestsUser = () => {

  //const tokenUser = localStorage.getItem('access_token')
  const tokenUser = GetTokenUser()  

  const dispatch  = useDispatch()
  const projects = ListProjectByUser()
  console.log(projects)
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectUsers, setProjectUsers] = useState(null);
  const [openMenuRole, setOpenMenuRole] = useState(false);
  const [projectState, setProjectState] = useState(projects)
  const [role, setRole] = useState(false);

  const handleRoleClose = (bugId) => {
    console.log(bugId)
    setOpenMenuRole(false);
    setRole();
  };


  const handleUpdateRole = async (value, projectId, invitationId) => {
    try {
      await UpdateRoleUserByProjectApi(value, projectId, invitationId, tokenUser);

          setProjectState((projectState) =>
            projectState.map((project) => {
              if (project.id === projectId) {
                const updatedInvitations = project.invitation.map((invitation) => {
                  if (invitation.id === invitationId) {

                    return { ...invitation , role: value };
                  }
                  return invitation;
                });
                setProjectUsers(updatedInvitations)
                return { ...project, invitation: updatedInvitations };
              }
              return project;
        })  
      );
    
    } catch (error) {
      console.error(error);
    }
  };

  


  useEffect(() => {
    // Chargez les utilisateurs invités pour le projet sélectionné
    
      if(selectedProject){
        const guestUser = selectedProject
        setProjectUsers(guestUser.invitation)
      }
  }, [selectedProject]);


  useEffect(() => {
    // Chargez les utilisateurs invités pour le projet sélectionné
    setProjectState(projects)
    
    
  }, [ projects]);




  const handleRoleClick = (event, index) => {
    console.log(event.target)
    setOpenMenuRole(index);
    setRole(event.currentTarget);
  }; 



  return (
    <Container>
      <Typography variant="h4" gutterBottom>
       Management of roles for each user
      </Typography>
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <Grid style={{ width:'200%', marginTop: '20px', marginBottom: '50px'}} item xs={12} sm={10}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom du Projet</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projectState?.map(project => (
                  <TableRow key={project.id}>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>
                    <Button
                        variant="outlined"
                        onClick={() => setSelectedProject(project)}
                        sx={{
                          marginRight : '0px',
                          marginBottom: '10px',
                          borderColor: '#3f51b5',
                          color: '#3f51b5',
                          '&:hover': {
                            backgroundColor: '#3f51b5',
                            color: '#fff',
                          },
                    }}>
Check users</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid   item xs={12} sm={10}>
          {selectedProject && (
            <div>
              <Typography variant="h5" gutterBottom>
                Guest user for {selectedProject.name}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>First name</TableCell>
                      <TableCell>email</TableCell>
                      <TableCell>Rôle</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {projectUsers?.map(user => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}
                        <IconButton 

                         onClick={(event) => handleRoleClick(event, user.id)}
                         aria-expanded={openMenuRole === user.id ? 'true' : undefined}
                         value={user.id}>
                          <ArrowDropDownIcon />
                          </IconButton> 
                          <Menu
                           id={user.id}
                           anchorEl={role}
                           open={openMenuRole === user.id}
                           onClose={ handleRoleClose}

                          >
                          <MenuItem value="admin" onClick={() => handleUpdateRole('admin', selectedProject.id, user.id)}>Admin</MenuItem>
                          <MenuItem value="developer"   onClick={() => handleUpdateRole('developer', selectedProject.id, user.id)}>Developer</MenuItem>
                          <MenuItem value="submitter"  onClick={() => handleUpdateRole('submitter', selectedProject.id, user.id)}>Submitter</MenuItem>
                         
                          </Menu>
                       
                          </TableCell> 
                          
                            <DeleteGuestUserDialog  project={selectedProject.id} 
                            user={user.id}
                             />
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
