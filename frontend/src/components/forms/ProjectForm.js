import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PostProjectApi } from '../../redux/actions/projectActions';
import { GetCurrentUser, GetTokenUser } from '../../redux/selectors/userSelectors';
import { Toaster, toast } from 'sonner'
import { SendSuccessNotification } from '../Alert';

export const ProjectForm = () => {  
  //const tokenUser = localStorage.getItem('access_token')
  const tokenUser = GetTokenUser()
  const currentUser = GetCurrentUser()
  const {id} = useParams()
  const dispatch = useDispatch()
  const initialFormData = {
    name: '',
    description: '',
    submission_date: '',
    project_duration: '',
    admin: currentUser.id,
    project_lead: '',
    status: '',

  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const date = new Date();
  const actualDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const { name, description, submission_date, project_duration, project_lead, status } = formData;

  const handleChange = (e) => {
  
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeStatus = (e) => {
   
    setFormData({
      ...formData,
      status: e.target.value,
    });
  };

  const handleChangeDescription = (e) => {
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    AddProject();
  };

  const AddProject = async() => {
    try{
      formData.submission_date = actualDate
      await dispatch(PostProjectApi(formData, tokenUser))
      SendSuccessNotification('Project created with success')
      navigate(`/project`)
    }catch(error){
      console.error(error)
    }
  }
   

  return (
  
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
           Ajouter un projet
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
              id='submission_date'
              variant="outlined"
              margin="normal"
              helperText="Date of creation"
              label="Submission date"
              defaultValue={actualDate}
              sx={{ backgroundColor: 'background.paper' }}
              
              required
            />
             <TextField
              fullWidth
              id='project_duration'
              variant="outlined"
              margin="normal"
              helperText="End of creation"
              value={project_duration}
              onChange={handleChange}
              type="date"
              required
              sx={{ backgroundColor: 'background.paper' }}
            />
            <TextField
              fullWidth
              id='project_lead'
              variant="outlined"
              margin="normal"
              label="Project lead"
              value={project_lead}
              onChange={handleChange}
              sx={{ backgroundColor: 'background.paper' }}
              required
            />
           
            <TextField
              fullWidth
              id='description'
              variant="outlined"
              margin="normal"
              name="Description"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={handleChangeDescription}
              sx={{ backgroundColor: 'background.paper' }}
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select
              id='status'
                name="status"
                label="status"
                value={status}
                onChange={handleChangeStatus}
                sx={{ backgroundColor: 'background.paper' }}
              >
                 <MenuItem value="Critical">Critical</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                   <MenuItem value="Normal">Normal</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              
            >
              Creer le projet
            </Button>
          </Box>
        </Box>
      </Container>
    );
  };