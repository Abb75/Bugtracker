import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SendSuccessNotification } from '../Alert';
import Delete from '@mui/icons-material/Delete';
import { DeleteBugApi, GetBugArchivedApi, GetBugProjectApi } from '../../redux/actions/bugActions';
import { useDispatch } from 'react-redux';
import { GetTokenUser } from '../../redux/selectors/userSelectors';

export default function DeleteBugDialog({bug, project}) {
  //const tokenUser = localStorage.getItem('access_token')
const tokenUser = GetTokenUser()
  
 const dispatch = useDispatch()
 //const  tokenUser = localStorage.getItem('access_token')
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const bugDelete = async() => {
    console.log(bug, project)
    try{
       await  DeleteBugApi(bug, project, tokenUser)
       SendSuccessNotification('Bug delete with success !')
       dispatch(GetBugProjectApi(project, tokenUser))
       dispatch(GetBugArchivedApi(tokenUser))
       handleClose()
    }catch(error){
        console.error(error)
    }
  }


  return (
    <React.Fragment>
         <Button
            onClick={handleClickOpen}           
            variant="contained"
            color="primary"
            startIcon={<Delete />}
            style={{
            borderRadius: 20,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'transparent',
            color: 'red',
            textTransform: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            }}
            
        >Delete</Button>

    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete bug definitely ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Your bug will definitely be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => bugDelete()} autoFocus>
            Agree
          </Button>
        </DialogActions>s
      </Dialog>
    </React.Fragment>
  );
}