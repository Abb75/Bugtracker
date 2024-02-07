import { useState, useEffect, Fragment} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import axiosInstance from '../../axios';
import {  useNavigate } from "react-router-dom"
//import { LoginDemoApi } from '../../api/test';
import { LabelImportant} from '@mui/icons-material'; 
import { useDispatch, useSelector } from 'react-redux';
import { GetUserApi } from '../../redux/actions/userActions';
import deskImage from '../../assets/img/desk.png'
import { GetCurrentUser, GetTokenUser } from '../../redux/selectors/userSelectors';
import { SendSuccessNotification } from '../../components/Alert';
import '../../App.css';
import { LoginApi } from '../../redux/actions/userActions';

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

const theme = createTheme()

export  const Login = () => {

  
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const [isAuthenticated, setIsAuthenticated] = useState(false)  
  const initialFormData = Object.freeze({
    email : '',
    password : ''   }) 
  const [formData, setFormData] = useState(initialFormData);
  const [inputError, setInputError] = useState([])
  const {email, password}  = formData

  const handleLoginDemoApi = async(email, password) => {
    try{ 
     
        await dispatch(LoginApi(email, password)) 
        //setIsAuthenticated(true)

    }catch(error){
      console.log(error)
  }
  }

  useEffect(() => {
    setInputError([])
  }, [])




  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
            await dispatch(LoginApi(email, password))
            setIsAuthenticated(true)
            SendSuccessNotification('Login with success')
    }catch(error){
      setInputError([error.response.data])
  }
  }

  const handleChange = e => {
    setFormData({
        ...formData,[e.target.id]: e.target.value
    })
}
 

const userLoginDemoInfo = {
  'Admin': { email: 'demoadmin@example.com', password: 'passwordadmin1' },
  'Developer': { email: 'demodeveloper@example.com', password: 'passworddev1' },
  'Submitter': { email: 'demosubmitter@example.com', password: 'passwordsub1' }
};

const handleSubmitLoginDemo = async (user) => {
  try {
    if (user in userLoginDemoInfo) {
      const { email, password } = userLoginDemoInfo[user];
      await handleLoginDemoApi(email, password);
      ///await dispatchUserData()  ²
      setIsAuthenticated(true);
     
      SendSuccessNotification('Login with success')
    } else {
      console.log('Utilisateur non valide');
    }
  } catch (error) {
    console.log('Erreur lors de la connexion de démonstration :', error);
  }
};
          
useEffect(() => {
 console.log(isAuthenticated)
  if (isAuthenticated){
    navigate('/dashboard');
  } else {
   
    navigate('/login');
  }
}, [isAuthenticated]);

return (
  
    <ThemeProvider   theme={theme}>
      <Box 
           sx={{
            backgroundImage: `url(${deskImage})`,
            backgroundSize: 'cover',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
       //className='login-page-background'
        
        
      />
      <Container  
          component="main" maxWidth="xs" >
        <CssBaseline />
        
        <Box

    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
      zIndex: 1,
    }}

>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            {inputError?.map((error, index) => (
              <Fragment>
                  <Typography alignItems={'center'} variant="body2" color="error">
      
                      {error.detail}
                  </Typography> 
    
              </Fragment>
              )
              )
            }

          
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Connexion
            </Button>
            <Button
              onClick={() => handleSubmitLoginDemo('Admin')}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Démo Admin
            </Button>
            <Button
              onClick={() => handleSubmitLoginDemo('Developer')}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Démo Developer
            </Button>
            <Button
              onClick={() => handleSubmitLoginDemo('Submitter')}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Démo Submitter
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                Forgot your password?
                </Link>
              </Grid>
              <Grid item>
                <Link to={'/register'} variant="body2">
                  {"Don't have an account? Sign up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};





