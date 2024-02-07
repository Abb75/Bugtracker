import React, { useEffect, useState, Fragment } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { GetCurrentUser } from '../../redux/selectors/userSelectors';
import { UpdateUserBugApi } from '../../redux/actions/bugActions';
import { UpdateUserInfoApi } from '../../redux/actions/userActions';
import { SendErrorNotification, SendSuccessNotification } from '../Alert';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GetUserApi } from '../../redux/actions/userActions';
import { UpdateUserPasswordApi } from '../../redux/actions/userActions';
import { GetTokenUser } from '../../redux/selectors/userSelectors';

export const UserPassword = () => {

  const tokenUser = GetTokenUser()
  const currentUser = GetCurrentUser()
  const [inputError, setInputError] = useState([])
  const initialFormData = Object.freeze({
    password : '',
    confirm_password : ''
  
  })

  const [formData, setFormData] = useState(initialFormData);
  const {password, confirm_password} = formData

  const handleChange = (e) => {
    setFormData({
      ...formData,[e.target.id]: e.target.value
  })
  };


    
  const handleSubmit = async(e) => {
    e.preventDefault();
      try{
          await UpdateUserPasswordApi(currentUser.id, formData, tokenUser)
          SendSuccessNotification('Password updated ! ')
    }catch(error){
           console.error(error.response.data)
           SendErrorNotification('Update password failed !')
           const new_error = Object.values(error.response.data);
           setInputError([new_error])
         
          
         }
       

   } 

   useEffect(() => {
    setInputError([])
   }, [])
  

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '1.5rem' }}>
       New password
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
          label='password'
          type='password'
          variant="outlined"
          name="firstName"
          id='password'
          value={password}
          onChange={handleChange}
          sx={{ backgroundColor: 'background.paper' }}
        />
        <TextField
          type='password'
          label="confirm password"
          id='confirm_password'
          variant="outlined"
          name="firstName"
          value={confirm_password}
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


