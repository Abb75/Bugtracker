import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { GetCurrentUser } from '../../../redux/selectors/userSelectors';
import {  ProjectDetailsData } from '../../../redux/selectors/projectSelectors';

export const  ButtonAddMember = () => {
  const currentUser = GetCurrentUser()
  const projectData = ProjectDetailsData()
  //const {error1, loading2, project} =  projectData
  
  const userRole = projectData?.invitation.filter(user => user.email === currentUser.email ) 

    
    const {id} = useParams() 
    return (
       <Container style={{ position:'absolute' }}> 
      
            {currentUser?.groups[0] === 'admin' || userRole[0]?.role === 'admin' ? (
              <Link to={`/project/${id}/invitation`}>
                <Button
                  style={{right: '590px',  color:'white' }}//, top: '25px' ,
                  id="button-add"
                  color="primary" // Utilisez la couleur que vous préférez
                  variant="contained"
                  className="rounded-pill"
                >
                  Add member
                </Button>
              </Link>
            ) : null}
      </Container>
    );
  };