import { Fragment, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Paper, Box, Typography, Divider, DescriptionTypography, IconButton, Popover, MenuItem, Container, useMediaQuery} from '@mui/material';
import { styled } from '@mui/system';
import { ProjectDetailsPage } from '../ProjectDetails';
import { CheckCircle, Error, Warning, Info, Help } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Stack, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProjectDetailsData, SelectedProject } from '../../../redux/selectors/projectSelectors';
import { UpdateProjectApi } from '../../../redux/actions/projectActions';
import { GetCurrentUser, GetTokenUser } from '../../../redux/selectors/userSelectors';

const StyledPaper = styled(Paper)(({ theme }) => (  {
 

  
  margin: 'auto',
  width: '70%',
  height:'300px',
  padding: '30px',
  //marginTop: '-180px',
  borderRadius: '8px', // Définir un rayon de bordure pour créer un rectangle
  marginLeft: '-0px', // Ajout de la marge négative pour décaler vers la gauche
  borderRadius: '8px',
  marginLeft : useMediaQuery(theme.breakpoints.down("md")) ?  '50px' : '0px',
 
  
}));


export const ProjectDetails = () => {
    const projectData = ProjectDetailsData()
    const currentUser = GetCurrentUser()   
    const tokenUser = GetTokenUser()  

    const {id} = useParams()
    const [anchorEl, setAnchorEl] = useState(null);
    const [status, setStatus] = useState(projectData.status)
    const [statusIcon, setStatusIcon] = useState(projectData.status)
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
      const open = Boolean(anchorEl);

      const getStatusIcon = (status) => {
          switch (status) {
            case 'Normal':
              setStatusIcon(<CheckCircle style={{color: 'yellow'}} />);
              break;
            case 'Critical':
              setStatusIcon(<Error style={{color: 'red'}} />);
              break;
            case 'High':
              setStatusIcon(<Warning style={{color: 'orange'}} />);
              break;
            case 'Low':
              setStatusIcon(<Info style={{color: 'green'}} />);
              break;
            default:
              setStatusIcon( <Help />) }
          }
   
        
        const handleStatus =  (e) => { 

            const status = e.target.innerText
          
            try{
               UpdateProjectApi(id, tokenUser, status);
               setStatus(status)
               getStatusIcon(status)
              }
            
            catch(error){
                console.log(error)
          
            }
        }
      
        useEffect(() => { 
          getStatusIcon(status)
        }, [status])
      
        return (
       
          <Fragment>
            <Box display="flex" justifyContent="flex-start" > 
              <StyledPaper  elevation={2}>
                <Box >
                  <Typography fontWeight="bold" textAlign={'left'} variant="h4" component="h2" gutterBottom>
                    {projectData.name}        {statusIcon}
                      {currentUser.groups[0] === 'admin' ? <IconButton  onClick={handlePopoverOpen} size="small" sx={{ marginLeft: '480px' }}>
                        <MoreVertIcon  style={{}} />
                      </IconButton> : null}
                      
                      <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                }}
              >
                  <MenuItem onClick={handleStatus} value="Critical">Critical</MenuItem>
                  <MenuItem onClick={handleStatus} value="High">High</MenuItem>  
                  <MenuItem onClick={handleStatus} value="Normal">Normal</MenuItem>
                  <MenuItem onClick={handleStatus} value="Low">Low</MenuItem>
                
              </Popover>

                  </Typography>
                  <Divider sx={{ marginBottom: '20px', borderTop: '2px solid rgba(0, 0, 0, 0.5)' }} />
                  <Typography  marginTop= '10px'   textAlign={'left'} variant="subtitle1" gutterBottom>
                  <strong>Description:</strong> {projectData.description}
                  <hr style={{ marginTop: '10px', marginBottom: '10px', borderColor: '#ddd' }} />

                  </Typography>
                  <Typography textAlign={'left'} variant="subtitle1" gutterBottom>
                  <strong>Project lead:</strong> {projectData.project_lead}
                  <hr style={{ marginTop: '10px', marginBottom: '10px', borderColor: '#ddd' }} />

                  </Typography>
                  <Typography  textAlign={'left'} variant="subtitle1" gutterBottom>
                  <strong>Start Date:</strong> {projectData.submission_date}
                  <hr style={{ marginTop: '10px', marginBottom: '10px', borderColor: '#ddd' }} />

                  </Typography>
                  <Typography textAlign={'left'} variant="subtitle1" gutterBottom>
                  <strong>End Date:</strong> {projectData.project_duration}
                  </Typography>
                </Box>
              </StyledPaper>
            </Box>
          </Fragment>
        );
      };
 
  

   