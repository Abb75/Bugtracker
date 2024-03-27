import * as React from 'react';
import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Button, MenuItem, IconButton, Grid, Menu, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { GetProjectArchivedApi } from '../../redux/actions/projectActions';
import { ArchivedProjectData } from '../../redux/selectors/projectSelectors';
import { useDispatch } from 'react-redux';
import { UpdateProjectArchivedApi } from '../../redux/actions/projectActions';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { SendSuccessNotification } from '../../components/Alert';
import { GetTokenUser } from '../../redux/selectors/userSelectors';
import { DeleteProjectById } from '../../redux/actions/projectActions';


export const ArchivedProject = () => {
  const tokenUser = GetTokenUser();
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const archivedProjects = ArchivedProjectData();
  const [anchorEl, setAnchorEl] = useState({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);

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

  const handleMenuItemClick = async (e, projectId) => {
    try {
      await UpdateProjectArchivedApi(projectId, tokenUser, false);
      SendSuccessNotification('Project unarchived with success');
      dispatch(GetProjectArchivedApi(tokenUser));
    } catch (error) {
      console.error(error);
    }

    handleClose(projectId);
  };

  const handleDeleteProject = async (projectId) => {
    setProjectIdToDelete(projectId);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = async (confirmed) => {
    if (confirmed) {
      try { 
        await DeleteProjectById(tokenUser, projectIdToDelete)  
        // Ajoutez ici la logique de suppression du projet
        dispatch(GetProjectArchivedApi(tokenUser));
        SendSuccessNotification('Project delete with success');
      } catch (error) {
        console.error(error);
      }
    }

    setDeleteConfirmationOpen(false);
  };

  useEffect(() => {
    try {
      dispatch(GetProjectArchivedApi(tokenUser));
    } catch (error) {
      console.error(error);
    }
  }, [tokenUser]);

  useEffect(() => {
    setProjects(archivedProjects);
  }, [archivedProjects]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Archived project(s)
      </Typography>

      {projects?.map((project) => (
        <Card style={{ height: '160px', width: '900px' }} key={project.id} sx={{ mb: 2 }}>
          <CardContent>
            <Grid marginLeft={'10px'} container justifyContent='space-between' alignItems="center">
              <Typography marginLeft={'50px'} variant="h6" component="div" sx={{ mb: 1, textAlign: 'center', flex: 1 }}>
                <strong>{project.name}</strong>
              </Typography>

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
                <Button
                  onClick={() => handleDeleteProject(project.id)}
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      {projects?.length === 0 && (
        <Typography variant="body1" sx={{ mt: 3 }}>
          No archived projects at the moment.
        </Typography>
      )}

      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => handleDeleteConfirmationClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete projet definitely?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your project will definitely be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDeleteConfirmationClose(false)}>Disagree</Button>
          <Button onClick={() => handleDeleteConfirmationClose(true)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
