import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate, useParams } from 'react-router-dom';
import { PostInvitationApi } from '../../redux/actions/invitationActions';
import { useDispatch } from 'react-redux';
//import { tokenUser } from '../../hooks/useLocalStorage';
import { SendErrorNotification, SendSuccessNotification } from '../Alert';
import { GetCurrentUser, GetTokenUser } from '../../redux/selectors/userSelectors';

const InvitationForm = () => {
  const currentUser = GetCurrentUser()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {id} = useParams()
  const initialFormData = {
    name : '',
    email : '',
    role : '',
    project : id,
    invited_by : currentUser.id
    
   

  }
  //const tokenUser = localStorage.getItem('access_token')
  const tokenUser = GetTokenUser()
  const [formData, setFormData] = useState(initialFormData)
  const {name, email, role } = formData
  const handleChange = (e) => {
 
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    sendInvitation()
    
  };
  
  
  const sendInvitation = async() => {
    try {
      await dispatch(PostInvitationApi(id, formData, tokenUser))
      SendSuccessNotification('Invitation send with success')
    }
    catch(error){
      SendErrorNotification('invitation send failed')
    }
  }

  const handleChangeRole = (e) => {
    setFormData({
      ...formData,
      role: e.target.value,
    });
  };


  

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
        Add member
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            id='name'
            variant="outlined"
            margin="normal"
            name="recipientEmail"
            label="Name"
            value={name}
            onChange={handleChange}
            required
            sx={{ backgroundColor: 'background.paper' }}
          />
          <TextField
            fullWidth
            id='email'
            variant="outlined"
            margin="normal"
            name="recipientEmail"
            label="Email"
            value={email}
            onChange={handleChange}
            required
            sx={{ backgroundColor: 'background.paper' }}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Rôle</InputLabel>
            <Select
           
              name="role"
              label="Rôle"
              value={role}
              onChange={handleChangeRole} 
              sx={{ backgroundColor: 'background.paper' }}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="developer">Developer</MenuItem>
              <MenuItem value="submitter">Submitter</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
           Send invitation
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default InvitationForm;
