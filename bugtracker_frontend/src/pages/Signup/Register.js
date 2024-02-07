import { Fragment, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { json } from 'react-router-dom';
import { Autocomplete, DialogContentText , } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Email } from '@mui/icons-material';
import { checkPassword } from '../../utils/checkPassword';
import { SendSuccessNotification } from '../../components/Alert';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const theme = createTheme();

export default function SignUp() {

  const navigate = useNavigate()
  
  const initialFormData = Object.freeze({
    email : '',
    first_name : '',
    last_name : '',
    phone : '',
    password : '',
    password2 : ''

  })

  const [formData, setFormData] = useState(initialFormData);
  const {email, first_name, last_name,phone, password2, password, } = formData
  const [inputError, setInputError] = useState([])


  const submitData = async() => {
    console.log(email, first_name, last_name, phone, password)
    try{
      await axios.post(process.env.REACT_APP_API_URL + 'users/' , {
          email : email,
          first_name : first_name, 
          last_name: last_name,
          phone : phone, 
          password : password ,
          confirm_password: password2,
          groups : [],

         
    }  );
      SendSuccessNotification('Register success !')
      navigate('/login')
    } catch (error) {
      console.error(error)
      console.log(error.response.data)
      const data_error = error.response.data
      const new_errors = Object.values(error.response.data)
      console.log(new_errors);
      setInputError(new_errors);
     
    }
  }
     const handleChange = e => {
     
      setFormData({
          ...formData,[e.target.id]: e.target.value
         
      })
  }
 

    
      
  const handleSubmit = (event) => { 
   
    event.preventDefault();
    
    formData.email = event.target[0].value
    formData.password1 = event.target[8].value
    formData.password2 = event.target[10].value
    formData.phoneNumber = event.target[6].value
    //checkValidation( password1, password2)
    submitData()
    };

useEffect(() => {
  setInputError([])
}, [])



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inscription 
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="email"
                  autoFocus
                  onChange={handleChange}
                  sx={{ backgroundColor: 'background.paper' }}
                
                />
              </Grid>
             
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  name="FirstName"
                  autoComplete="family-name"
                  onChange={handleChange}
                  sx={{ backgroundColor: 'background.paper' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last name"
                  autoComplete="last_name"
                  onChange={handleChange}
                  sx={{ backgroundColor: 'background.paper' }}
                />
              </Grid>
             
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="phone"
                  name="phone"
                  autoComplete="phone"
                  onChange={handleChange}
                  sx={{ backgroundColor: 'background.paper' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  sx={{ backgroundColor: 'background.paper' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Password confirm"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  onChange={handleChange}
                  sx={{ backgroundColor: 'background.paper' }}
                />
              </Grid>
             
              <Box sx={{ mt: 3 }}>
    
    <ul>
      {inputError?.map((error, index) => (
        <Fragment>
          <Typography alignItems={'center'} variant="body2" color="error">
      
          {error}
        </Typography> 
    
      </Fragment>))}
    </ul>
  </Box>
                          
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            
           
             <Button
           
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button> 
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};