
import { useEffect, Fragment, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../layout/SideBar/sideBar';
import ProjectChartPriority from './Charts/Project/ProjectChartPriority';
import { Rectangle } from 'react-chartjs-2';
import BugChartPriority from './Charts/Bug/BugChartPriority';
import BugChartStatus from './Charts/Bug/BugChartStatus';
import { Container, Grid, Paper, Typography , Box} from '@mui/material';
import { PrintTwoTone } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserProjectApi } from '../../redux/actions/projectActions'
import { GetAllBugApi } from '../../redux/actions/bugActions';
import { isTokenExpired } from '../../axios';
import axios from 'axios';
import ProjectCountBadge, { BoxCountProject } from './Box/AllProjects';
import { BoxCountTickets } from './Box/AllTickets';
import { BoxCountTicketsCritical } from './Box/AllTicketCritical';
import { BugChartDeveloper } from './Charts/Bug/BugChartDeveloper';
import{ useMediaQuery, useTheme  } from '@mui/material/'
import { GetCurrentUser, GetTokenUser } from '../../redux/selectors/userSelectors';
import { BugChartAdmin } from './Charts/Bug/BugChartAdmin';
import { GetInvitationUser } from '../../redux/actions/invitationActions';
import { GetUserApi } from '../../redux/actions/userActions';
import './Dashboard.css'
import {ChartAdmin}  from './Charts/Bug/ChartAdmin';
import { ChartDeveloper } from './Charts/Bug/ChartDeveloper';

export const Dashboard = () => { 
    console.log("Nouvelle largeur de l'écran : " + window.innerWidth);
    console.log("Nouvelle hauteur de l'écran : " + window.innerHeight);
    const dispatch = useDispatch()
    //const tokenUser = localStorage.getItem('access_token');
    const tokenUser = GetTokenUser()  
    console.log()
    const currentUser = GetCurrentUser()
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const shouldDisplayComponents = !isSmallScreen;
     // Déterminez si l'écran est petit (MD ou moins)

    
    console.log(GetTokenUser())
   
    const navigate = useNavigate();

    const dispatchProjectData = () =>{
        try{
            //dispatch(GetUserApi(currentUser.id, tokenUser));
            dispatch(GetInvitationUser(tokenUser))
            dispatch(GetUserProjectApi(tokenUser));
            dispatch(GetAllBugApi(tokenUser))   }
        //dispatch(GetUserApi(localStorage.getItem('id'), tokenUser))}
        catch(error){
            console.error(error)
        }
        
    }

    useEffect(() => {
        if (!tokenUser || isTokenExpired(tokenUser)){
            navigate('/login')}
        else{
             dispatchProjectData()
          
        }
    }, [currentUser]);


  
    
    return (

        <Fragment>
          <Container id='dashboardcontainer' className='DashboardContainer' style={{marginBottom: '100px'}}>
             <h1 id='name' style={{fontFamily: 'inherit'}} >Dashboard</h1>
         
              <Container style={{ marginTop: '-200px', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
                    <Grid container spacing={0}  >
                    <Grid item  style={{ marginBottom: '20px' }}  >
                        <Sidebar />
                    </Grid>
                    </Grid>
            </Container>

            <Container style={{  display: 'flex', marginTop: '200px' }}>
        <Grid container spacing={0} alignItems={'center'} justifyContent={'center'}>

                <Fragment>
                    <Grid item xs={12} sm={6} md={4}>
                        <BoxCountProject />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <BoxCountTickets />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <BoxCountTicketsCritical />
                    </Grid>
                </Fragment>
          
        </Grid>
    </Container>
             
            <Container style={{ display: 'flex',  marginTop: '50px'}}>
            <Grid   container alignContent={'center'} justifyContent={'center'} spacing={6}>
                <Grid item xs={12} sm={6} md={4}    >
                    <Paper elevation={3} style={{ padding: '10px', height: '500px', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '1px 1px 7px rgba(0.0, 0.0, 0.0, 0.1)' }}>
                        <Typography variant="h5" style={{ fontFamily: 'inherit', fontWeight: 'bold',position: 'absolute', textAlign:'center', top:'40px' }}>
                           Projects by Priority
                        </Typography>
                        <ProjectChartPriority style={{ flex: 1, margin: '5px' }} />
                    </Paper>
                </Grid>
                <Grid item  xs={12} sm={6} md={4}>
                    <Paper elevation={3} style={{ padding: '10px', height: '500px', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',  boxShadow: '1px 1px 7px rgba(0.0, 0.0, 0.0, 0.1)' }}>
                    <Typography variant="h5" style={{fontFamily: 'inherit', fontWeight: 'bold', position: 'absolute', textAlign:'center', top:'40px' }}>
                   Ticket Status</Typography>
                        <BugChartStatus style={{ flex: 1, margin: '5px' }} />
                    </Paper>
                </Grid>
                <Grid item  xs={12} sm={6} md={4}>
                    <Paper elevation={3} style={{ padding: '10px', height: '500px', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',  boxShadow: '1px 1px 7px rgba(0.0, 0.0, 0.0, 0.1)' }}>
                    <Typography variant="h5" style={{ fontFamily: 'inherit', fontWeight: 'bold',position: 'absolute', textAlign:'center', top:'40px' }}>
                           Ticket Priority
                        </Typography>
                        <BugChartPriority style={{ flex: 1, margin: '5px' }} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        <Grid >
            {currentUser?.groups?.[0] === 'admin' ? ( 
                < ChartAdmin style={{marginTop: '20px'}}/> ):( 
                    
                  <ChartDeveloper style={{marginTop: '20px'}}/> )
                 
                  }
           
        </Grid>
     
       

</Container>
    </Fragment>
);
};
