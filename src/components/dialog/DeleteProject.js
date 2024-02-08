import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteProjectById } from '../../redux/actions/projectActions';
import { SendSuccessNotification } from '../Alert';
import { GetTokenUser } from '../../redux/selectors/userSelectors';

export default function DeleteProjectDialog(project) {
    //const  tokenUser = localStorage.getItem('access_token')
    console.log(project)
    //const tokenUser = localStorage.getItem('access_token')
    const tokenUser = GetTokenUser()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DeleteProject = async() => {
    try{
        await DeleteProjectById(tokenUser, project.project)  
        handleClose()
        SendSuccessNotification('Project delete with success')
     
    }
    catch(error){
        console.error(error)
    }
  }

  return (
    <React.Fragment>
         <IconButton onClick={handleClickOpen} title="Permanently Delete">
                  <DeleteIcon style={{ color: 'red' }} />
                </IconButton> 
    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete projet definitely?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Your project will definitely be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => DeleteProject()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}