import {useState, useEffect, Fragment}from 'react';
import { Container } from '@mui/system';
import { Box, ListSubheader, SliderValueLabel } from '@mui/material';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { json, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {Paper, Divider} from '@mui/material';
// Generate Order Data
import * as React from 'react';


import {  Typography, List, ListItem,Grid, ListItemAvatar, Avatar, ListItemText, IconButton} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import './ProjectList.css'
import {Link} from 'react-router-dom';
import { Button } from '@mui/material';
import {  react } from 'react';
import { createTheme, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { GetUserProjectApi,UpdateProjectArchivedApi,  GetProjectDetails } from '../../redux/actions/projectActions';
import { ListProjectByUser } from '../../redux/selectors/projectSelectors';
import { GetCurrentUser } from '../../redux/selectors/userSelectors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SendSuccessNotification } from '../../components/Alert';

import { GetTokenUser } from '../../redux/selectors/userSelectors';
    

  
    const theme = createTheme({
      breakpoints: {
        values: {
         
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      },
    });
    
    export const  ProjectList = () => {
      
      const tokenUser = GetTokenUser()
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const currentUser = GetCurrentUser()
      const listProjectUser = ListProjectByUser()
      //const tokenUser = localStorage.getItem('access_token')
      const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
      const [anchorEl, setAnchorEl] = useState({});
       
     
      const handleClick = (event, projectId) => {
        setAnchorEl(prevState => ({
          ...prevState,
          [projectId]: event.currentTarget,
        }));
      };
      
      const handleClose = (projectId) => {
        setAnchorEl(prevState => ({
          ...prevState,
          [projectId]: null,
        }));
      };
      
      
        const handleMenuItemClick = async( projectId) => {

          try{

            await UpdateProjectArchivedApi(projectId, tokenUser,true)
            SendSuccessNotification('Project archived with success')
            dispatch(GetUserProjectApi(tokenUser))
          }catch(error){
            console.error(error)
          }
         
          handleClose();
        };
      
        const options = ['Option 1', 'Option 2', 'Option 3']; // Customize with your options

             
    
      useEffect(() => {  
        dispatch(GetUserProjectApi(tokenUser))
      
      }, [dispatch]);

   

    const dispatchProjectDetails = async(projectId) => {
      try{
        await dispatch(GetProjectDetails(tokenUser, projectId ))
        navigate(`/project/${projectId}`)
      }catch(error){
        console.error(error)
      }
    }

      const OnClick = (projectId) => {
           dispatchProjectDetails(projectId)
          //sconst project = handleSelectedProject(projectId) 
          //const userRole = project.invitation.filter(user => user.email === currentUser.email)  
      }

    
   
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: 128,
                height: 128,
              
              },
            }}
          >
            <Paper elevation={0} />
            <Paper />
            <Paper elevation={3} />
          </Box>
        ;
        return (

          <Container id='ProjectContainer' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '92vh' }}>
            {currentUser?.groups[0] === 'admin' ? (
              <Link to={'/new-project'}>
                <Button   style={{ marginBottom: '100px' , marginRight: '970px'}}
                className="rounded-pill"
                color="primary" // Utilisez la couleur que vous préférez
                variant="contained">
                  <span className="icon">+</span> add project
                </Button>
              </Link>
            ) : (
              <Typography style={{fontFamily: 'inherit', fontWeight: 'bold'}} sx={{ mt: -5, mb:15 }} variant="h6" component="div">
                Related Project(s)
              </Typography>
            )}
        
            <Grid style={{marginBottom: '100px'}} container spacing={isSmallScreen ? 2 : 5} sx={{ mx: 2, flexDirection: 'row' }}>
              
              {listProjectUser?.map((item) => (
                 
                 item.is_archived === false ? (
                 
               
                <Grid item xs={12} sm={6} md={6} lg={4} key={item.id}  className="project-grid">
                  <Paper elevation={2} style={{ alignContent: 'center',  padding: '20px', height: '100%' }}>
                    
                  {currentUser.groups[0] === 'admin' ? (
                        <Grid container justifyContent={'space-between'}alignItems="center"> 
                           <IconButton  onClick={(event) => handleClick(event, item.id)}>
                             <MoreVertIcon />
                           </IconButton>

                          <Menu
                              anchorEl={anchorEl[item.id]}
                              open={Boolean(anchorEl[item.id])}
                              onClose={() => handleClose(item.id)}>
                              
                              <MenuItem value={item.id} onClick={(event) => handleMenuItemClick( item.id)}>
                                  add to archive
                              </MenuItem>
                              <MenuItem value={item.id} onClick={(event) => handleMenuItemClick( item.id)}>
                                  update title
                              </MenuItem>
                             
                          </Menu>
                         </Grid>) : (null)}
                    <List>
                      <ListItem>
                        <Link to={`/project/${item.id}`} >
                          
                          <ListItemAvatar>
                            <Avatar>
                              <FolderIcon />
                            </Avatar>
                          </ListItemAvatar>
                        </Link>
                        
                        <ListItemText
                          primary={item.name}
                          secondary={`Created at ${item.submission_date}`}
                        />
                      </ListItem>
                      <Divider sx={{ my: 2 }} />
                      
                      
                        <ListItem/>
                        {currentUser.groups[0] === 'admin' ? (
  <Fragment>
    <ListItem>
      <ListItemText
        primary="Role :"
        secondary="Admin"
      />
    </ListItem>
    <ListItem>
      <ListItemText
        primary="Autres informations"
        secondary={`Statut: ${item.status}`}
      />
    </ListItem> 
    <ListItem>
      <ListItemText
        primary="Project lead"
        secondary={`Created by: ${item.project_lead}`}
      />
    </ListItem>
  </Fragment>
) : (
  item.invitation.map((role) => (
    role.email === currentUser.email ? (
      <Fragment >
        <ListItem>
          <ListItemText
            primary="Role :"
            secondary={role.role}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Status"
            secondary={`Statut: ${item.status}`}
          />
        </ListItem> 
        <ListItem>
          <ListItemText
            primary="Project lead"
            secondary={`Created by: ${item.project_lead}`}
          />
        </ListItem>
      </Fragment>
    ) : null
  ))
)}
                                               
                       
                                                        
                      
                     <ListItem>
                         <Button
                           variant="contained"
                           startIcon={<VisibilityIcon />}
                           onClick={() => OnClick(item.id)}
                           className='rounded-pill'
                          color='grey'
                         >
                        Check project
                         </Button>
                        
                        
                        
                       </ListItem>
                   
                    </List>
                  </Paper>
                </Grid>) : (null)
              ))}
            </Grid>
          </Container>
        );
              }