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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AddInvitationApi, PostCreateGuestUserApi } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { SendSuccessNotification } from '../../components/Alert';
import { GetTokenUser } from '../../redux/selectors/userSelectors';

export const RegisterInvitationForm= () => {
   
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {uuid} = useParams()
  const tokenUser = GetTokenUser()  

 
  const initialFormData = {
   
    email : '',
    password : '',
    confirm_password : '',
    first_name : '',
    last_name: '',
    phone: '',
   
  }
  const [formData, setFormData] = useState(initialFormData)
  const { email, password , confirm_password,  first_name, last_name, phone} = formData


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    addGuestUser()
    
  };



  const addGuestUser = async() => {
    try {
      await dispatch(PostCreateGuestUserApi(formData, tokenUser, uuid))
      SendSuccessNotification('Register with success !')
      navigate('https://abb75.github.io/bugtracker_frontend/#/login')
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            id='email'
            variant="outlined"
            margin="normal"
            name="recipientEmail"
            label="email"
            value={email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            type='password'
            id='password'
            variant="outlined"
            margin="normal"
            name="recipientEmail"
            label="password"
            value={password}
            onChange={handleChange}
            required
          />
           <TextField
            fullWidth
            type='password'
            id='confirm_password'
            variant="outlined"
            margin="normal"
            name="recipientEmail"
            label="confirm password"
            value={confirm_password}
            onChange={handleChange}
            required
          />
           <TextField
            fullWidth
            type='text'
            id='first_name'
            variant="outlined"
            margin="normal"
            name="recipientEmail"
            label="First name"
            value={first_name}
            onChange={handleChange}
            required
          />
           <TextField
            fullWidth
            type='text'
            id='last_name'
            variant="outlined"
            margin="normal"
            name="recipientEmail"
            label="Last name"
            value={last_name}
            onChange={handleChange}
            required
          />
           <TextField
            fullWidth
            id='phone'
            variant="outlined"
            margin="normal"
            name="recipientEmail"
            label="phone"
            value={phone}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

