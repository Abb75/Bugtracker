import React, { useEffect, useState, Fragment } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { GetCurrentUser } from '../../redux/selectors/userSelectors';
import { UpdateUserBugApi } from '../../redux/actions/bugActions';
import { UpdateUserInfoApi } from '../../redux/actions/userActions';
import { SendErrorNotification, SendSuccessNotification } from '../Alert';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GetUserApi } from '../../redux/actions/userActions';
import { GetTokenUser } from '../../redux/selectors/userSelectors';

export const UserProfile = () => {
 
  const dispatch = useDispatch()
  const navigate = useNavigate() 
  const tokenUser = GetTokenUser()
  const [inputError, setInputError] = useState([])
  const currentUser = GetCurrentUser()

  const initialFormData = Object.freeze({

    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    email : currentUser.email,
    
  
  })

  const [formData, setFormData] = useState(initialFormData);
  const {first_name, last_name, email} = formData

  const handleChange = (e) => {
    setFormData({
      ...formData,[e.target.id]: e.target.value
  })
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      await UpdateUserInfoApi(currentUser.id, formData, tokenUser)
      await dispatch(GetUserApi(localStorage.getItem('id'))); 
      SendSuccessNotification('Update profile with success !')
      navigate('/dashboard')
    }catch(error){
      const new_error = Object.values(error.response.data);
      setInputError([new_error])
      SendErrorNotification('Update profile failed !')
    }
   }
   
  useEffect(() => {
    setInputError([])
  }, [])

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '1.5rem' }}>
        User Profile
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          label='first name'
          variant="outlined"
          name="firstName"
          id='first_name'
          value={first_name}
          onChange={handleChange}
          sx={{ backgroundColor: 'background.paper' }}
        />
        <TextField
          label="Last Name"
          id='last_name'
          variant="outlined"
          name="firstName"
          value={last_name}
          onChange={handleChange}
          sx={{ backgroundColor: 'background.paper' }}
        />
        <TextField
          label="Email"
          id='email'
          variant="outlined"
          name="firstName"
          value={email}
          onChange={handleChange}
          sx={{ backgroundColor: 'background.paper' }}
        />
         {inputError?.map((error, index) => (
              <Fragment>
                  <Typography alignItems={'center'} variant="body2" color="error">
      
                      {error}
                  </Typography> 
    
              </Fragment>
              )
              )
            }
        
       
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: '1rem' }}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

