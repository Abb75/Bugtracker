

import {useEffect, useState} from 'react';
import { Container, Typography, Card, CardContent, Button , MenuItem, IconButton, Grid, Menu} from '@mui/material';
import { useDispatch } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { SendSuccessNotification } from '../../components/Alert';
import { GetCurrentUser, GetTokenUser } from '../../redux/selectors/userSelectors';
import { GetBugArchivedApi } from '../../redux/actions/bugActions';
import { UpdateBugArchivedApi } from '../../redux/actions/bugActions';
import { GetBugArchived } from '../../redux/selectors/bugSelectors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DeleteBugApi ,GetBugProjectApi } from '../../redux/actions/bugActions';



export const ArchivedBug = () => {
  const currentUser = GetCurrentUser()
  const dispatch = useDispatch()
  const tokenUser = GetTokenUser()
  const [bugs, setBugs] = useState([])
  const bugsArchived = GetBugArchived()
  const [anchorEl, setAnchorEl] = useState({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [bugIdToDelete, setBugIdToDelete] = useState(null);
  const [projectId, setProjectId] = useState(null)





  const handleDeleteConfirmationClose = async (confirmed) => {
    if (confirmed) {
      try { 
        await  DeleteBugApi(bugIdToDelete, projectId, tokenUser)
        dispatch(GetBugProjectApi(projectId, tokenUser))
        dispatch(GetBugArchivedApi(tokenUser))
        SendSuccessNotification('Bug delete with success !')

      } catch (error) {
        console.error(error);
      }
    }

    setDeleteConfirmationOpen(false);
  };

  const handleDeleteBug = async (bug, project) => {
    setBugIdToDelete(bug)
    setProjectId(project);
    setDeleteConfirmationOpen(true);
  };

     
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

  const handleMenuItemClick = async( projectId, bugId) => {
    console.log(bugId, projectId)
    // Add your logic here based on the selected option

    try{
      await UpdateBugArchivedApi(projectId, bugId,tokenUser,false, null )
      SendSuccessNotification('Bug unarchived with success')
      dispatch(GetBugArchivedApi(tokenUser))
    }catch(error){
      console.error(error)
    }
   
    handleClose();
  };

  

  useEffect(() => {
    try {
      dispatch(GetBugArchivedApi(tokenUser))

    }
    catch(error){
      console.error(error)
    }
  }, [tokenUser] )

  useEffect(() => {
    
    setBugs(bugsArchived)
    
  }, [bugsArchived] )


  return (

   
      <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Archived Bug(s)
      </Typography>

      {bugs?.map((bug) => (
        <Card style={{ height: '140px', width: '900px' }} key={bug.id} sx={{ mb: 2 }}>
          <CardContent>
            <Grid marginLeft={'10px'} container justifyContent='space-between' alignItems="center">
              {/* Titre du projet, centré */}
              <Typography marginLeft={'20px'} variant="h6" component="div" sx={{ mb: 1, textAlign: 'center', flex: 1 }}>
              <strong>{bug.title}</strong>
              </Typography>

              {/* Icônes à droite du titre */}
              <Grid>
                <IconButton onClick={(event) => handleClick(event, bug.id)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl[bug.id]}
                  open={Boolean(anchorEl[bug.id])}
                  onClose={() => handleClose(bug.id)}
                >
                  <MenuItem
                    value={bug.id}
                    onClick={(event) => handleMenuItemClick( bug.project_id, bug.id)}
                  >
                    unarchive
                  </MenuItem>
                </Menu>
              </Grid>

              <Grid>
              
              <Grid>
                <Button
                  onClick={() => handleDeleteBug(bug.id, bug.project_id)}
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Grid>
              </Grid>
             
            </Grid>

            {/* Autres informations */}
          
            <Typography variant="body2" color="text.secondary">
              Archivé le ; <strong>{bug.date}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Archivé par:  <strong>{bug.archived_by}</strong>
              </Typography>
            <Typography variant="body2" color="text.secondary">
              Project :  <strong>{bug.project}</strong>
            </Typography>
          </CardContent>
        </Card>
      ))}

      {bugs?.length === 0 && (
        <Typography variant="body1" sx={{ mt: 3 }}>
          No archived bugs at the moment.
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
            Your bug will definitely be deleted.
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