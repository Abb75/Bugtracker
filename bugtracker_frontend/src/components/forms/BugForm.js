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
import { useDispatch, useSelector } from 'react-redux';
import { PostBugProjectApi } from '../../redux/actions/bugActions';
import { useEffect } from 'react';
import { GetCurrentUser, GetTokenUser } from '../../redux/selectors/userSelectors';


export const BugForm = () => {
  //const tokenUser = localStorage.getItem('access_token')
  const tokenUser = GetTokenUser()
  const currentUser = GetCurrentUser()
  const dispatch = useDispatch()
  const guestUser = useSelector(state => state.bugProject)
  const projectData = useSelector(state => state.projectDetails.projectDetails)
  const navigate = useNavigate()
  const {id} = useParams()
  const [invitation, setInvitation] = useState([])

  const initialFormData = {
    title: '',
    date: '',
    priority: '',
    status: '',
    assigned_to: '',
    created_by: currentUser.id, 
    description: '',
    
  };

  const [formData, setFormData] = useState(initialFormData);
  const { title, date, priority, description, assigned_to } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangePriority = (e) => {
    setFormData({
      ...formData,
      priority: e.target.value,
    });
  };
  
  const handleChangeAssigned = (e) => {
    setFormData({
      ...formData,
      assigned_to: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    AddBug()
  };

  const AddBug = () => {  
    console.log(id)
    formData['project'] = id
    console.log(formData)
    try{
       dispatch(PostBugProjectApi(id,formData, tokenUser))
       navigate(`/project/${id}`)
    }
    catch(error){
      console.log(error)
    }
  } 

  

 

  useEffect(() => {
   
  },[])

  return (
    <>
      <Helmet>
        <title>Ajouter un bug</title>
      </Helmet>

      <Container maxWidth="sm">
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
           New bug
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="title"
              label="Title"
              value={title}
              onChange={handleChange}
              required
              sx={{ backgroundColor: 'background.paper' }}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="description"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={handleChange}
              sx={{ backgroundColor: 'background.paper' }}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="date"
              label="Date"
              type="date"
              value={date}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              sx={{ backgroundColor: 'background.paper' }}
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="assigned_to_label">Assigné à</InputLabel>
              <Select
                id="assigned_to"
                label="Assigned to"
                value={assigned_to}
                onChange={handleChangeAssigned}
                sx={{ backgroundColor: 'background.paper' }}
              >
                <MenuItem value="Unassigned">Non assigné</MenuItem>
                {projectData.invitation?.map((item) => (
                  <MenuItem key={item.id} value={item.user_id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="priority-label">Priorité</InputLabel>
              <Select
                labelId="status-label"
                id="priority"
                label="Pirority"
                onChange={handleChangePriority}
                value={priority}
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
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
