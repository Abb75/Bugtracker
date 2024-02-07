import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {  GetUserProjectApi } from '../../redux/actions/projectActions';
import { SendSuccessNotification } from '../Alert';
import { DeleteGuestUserInvitationProjectApi } from '../../redux/actions/invitationActions';
import { useDispatch } from 'react-redux';
import { GetTokenUser } from '../../redux/selectors/userSelectors';

export default function DeleteGuestUserDialog({project, user }) {
  //const  tokenUser = localStorage.getItem('access_token')
  const tokenUser = GetTokenUser()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DeleteGuestUser = async() => {
    
    try{
        await DeleteGuestUserInvitationProjectApi(project, user, tokenUser)  
        dispatch(GetUserProjectApi(tokenUser))
        
       
        handleClose()
        SendSuccessNotification('User delete with success')
    }
    catch(error){
        console.error(error)
    }
  }

  return (
    <React.Fragment>
         <IconButton onClick={handleClickOpen} title="Permanently Delete">
                  <DeleteIcon style={{ color: 'red',  marginTop: '20px' }} />
                </IconButton> 
    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete guest user definitely ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This user will be definitely delete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => DeleteGuestUser()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}