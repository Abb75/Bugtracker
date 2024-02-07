

import {useEffect, useState} from 'react';
import { Container, Typography, Card, CardContent, Button , MenuItem, IconButton, Grid, Menu} from '@mui/material';
import { GetProjectArchivedApi } from '../../redux/actions/projectActions';
import { ArchivedProjectData } from '../../redux/selectors/projectSelectors';
import { useDispatch } from 'react-redux';
import { UpdateProjectArchivedApi } from '../../redux/actions/projectActions';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { SendSuccessNotification } from '../../components/Alert';
import ModalConfirmation from '../../components/dialog/DeleteProject';
import AlertDialog from '../../components/dialog/DeleteProject';
import DeleteProjectDialog from '../../components/dialog/DeleteProject';
import { GetCurrentUser, GetTokenUser } from '../../redux/selectors/userSelectors';

export const ArchivedProject = () => {
  const tokenUser = GetTokenUser()  
  const dispatch = useDispatch()
  //const tokenUser = localStorage.getItem('access_token')
  const [projects, setProjects] = useState([])
  const archivedProjects = ArchivedProjectData()
  console.log(archivedProjects)
  const [anchorEl, setAnchorEl] = useState({});

     
  const handleClick = (event, projectId) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [projectId]: event.currentTarget,
    }));
  };
  
  const handleClose = (projectId) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [projectId]: null,
    }));
  };

  const handleMenuItemClick = async(e, projectId) => {
    console.log(projectId)
    // Add your logic here based on the selected option


    try{

      await UpdateProjectArchivedApi(projectId,tokenUser,false )
      SendSuccessNotification('Project unarchived with success')
      dispatch(GetProjectArchivedApi(tokenUser))
    }catch(error){
      console.error(error)
    }
   
    handleClose();
  };

  

  useEffect(() => {
    try {
      dispatch(GetProjectArchivedApi(tokenUser))

    }
    catch(error){
      console.error(error)
    }
  }, [tokenUser] )

  useEffect(() => {
    
    setProjects(archivedProjects)
    
  }, [archivedProjects] )


  return (

   
      <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Archived project(s)
      </Typography>

      {projects?.map((project) => (
        <Card style={{ height: '160px', width: '900px' }} key={project.id} sx={{ mb: 2 }}>
          <CardContent>
            <Grid marginLeft={'10px'} container justifyContent='space-between' alignItems="center">
              {/* Titre du projet, centré */}
              <Typography marginLeft={'50px'} variant="h6" component="div" sx={{ mb: 1, textAlign: 'center', flex: 1 }}>
                <strong>{project.name}</strong>
              </Typography>

              {/* Icônes à droite du titre */}
              <Grid>
                <IconButton onClick={(event) => handleClick(event, project.id)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl[project.id]}
                  open={Boolean(anchorEl[project.id])}
                  onClose={() => handleClose(project.id)}
                >
                  <MenuItem
                    value={project.id}
                    onClick={(event) => handleMenuItemClick(event, project.id)}
                  >
                    unarchive
                  </MenuItem>
                </Menu>
              </Grid>

              <Grid>
               <DeleteProjectDialog project={project.id} />
               
              </Grid>
             
            </Grid>

            {/* Autres informations */}
            <Typography variant="body2" color="text.secondary">
            
            </Typography>
          </CardContent>
        </Card>
      ))}

      {projects?.length === 0 && (
        <Typography variant="body1" sx={{ mt: 3 }}>
          No archived projects at the moment.
        </Typography>
      )}
    </Container>


    
   
  );
};