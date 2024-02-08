import React, { useState, useEffect, Fragment } from 'react';
import { Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { ConfirmInvitationUserByProjectApi, DeleteGuestUserInvitationProjectApi } from '../../redux/actions/invitationActions';
import { GetInvitationGuestUser } from '../../redux/selectors/invitationSelectors';
import { useDispatch } from 'react-redux';
import { GetInvitationUser } from '../../redux/actions/invitationActions';
import { GetCurrentUser } from '../../redux/selectors/userSelectors';
import { GetTokenUser } from '../../redux/selectors/userSelectors';

export const HandlerInvitationsPage = () => {
  const dispatch = useDispatch() 
  //const tokenUser = localStorage.getItem('access_token')
  const tokenUser = GetTokenUser()
  const currentUser = GetCurrentUser()
  const invitations = GetInvitationGuestUser()
  const [invitationUser, setInvitationUser] = useState(invitations)
 
  const handleConfirmInvitation = async(invitationId, projectId, acceptInvitation) => {
    try{
        await ConfirmInvitationUserByProjectApi(acceptInvitation, projectId,  invitationId, tokenUser)
         dispatch(GetInvitationUser(tokenUser))
    }catch(error){
        console.error(error)
    }
}

/*
const handleDeleteInvitation = async(invitation, project) => {
 
  try{
      await DeleteGuestUserInvitationProjectApi( project, invitation, tokenUser  )
      dispatch(GetInvitationUser(tokenUser))
  }catch(error){
      console.error(error)
  }
}
*/

const handleDeleteInvitation = async(invitation, project) => {
 
  try{
      await DeleteGuestUserInvitationProjectApi( project, invitation, tokenUser  )
      dispatch(GetInvitationUser(tokenUser))
  }catch(error){
      console.error(error)
  }
}


useEffect(() => {
  dispatch(GetInvitationUser(tokenUser))
}, [dispatch])


 

useEffect(() => {
  setInvitationUser(invitations);
}, [invitations]);


  return (
    <Container id='InvitationHandler'>
        {currentUser.groups[0] === 'admin' ? (
      <Typography variant="h4" gutterBottom>
                ​Invitation management
              </Typography> ) : (<Typography variant="h4" gutterBottom>
                Your invitation
              </Typography>)}



      {invitationUser?.map((invitation) => (
        currentUser.groups[0] === 'admin' ? (
        
          <Card key={invitation.id} sx={{ mb: 2 }}>
           
          <CardContent>
            <Typography variant="h6" component="div">
              User invited : {invitation.email}
            </Typography>
            <Typography variant="h6" component="div">
              project : {invitation.project}
            </Typography>
            <Typography variant="h6" component="div">
              Role this user : {invitation.role}
            </Typography> 
             <Typography variant="h6" component="div">
                Waiting for confirmation...
            </Typography>
            <Grid container spacing={2} justifyContent="flex-end">
              
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteInvitation(invitation.id, invitation.project_id, false)}
                >
                  Refuser
                </Button>
              
              </Grid>
            </Grid>
          </CardContent>
        </Card>



        ) : ( 
       
          <Card key={invitation.id} sx={{ mb: 2 }}>
            
          <CardContent>
            <Typography variant="h6" component="div">
              Invitation : {invitation.project}
            </Typography>
            <Typography variant="h6" component="div">
              Your role : {invitation.role}
            </Typography>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleConfirmInvitation(invitation.id, invitation.project_id,  true)}
                >
                  Accepter
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleConfirmInvitation(invitation.id, invitation.project_id, false)}
                >
                  Refuser
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>



        )
        
      ))}

   
      {invitationUser?.length === 0 && (
            currentUser.groups[0] === 'admin' ? (<Typography variant="body1">
              You have not sent any invitation.
           </Typography>) : (  <Typography variant="body1">
         No invitations to join projects at the moment.
        </Typography> )

      
      )}
    </Container>
  );
};


