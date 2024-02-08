import { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BoxBugs, BugsCount } from './Details/BugsCount';
import { Grid } from '@mui/material';
import {Container} from '@mui/system';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';
import {Paper} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BugForm } from '../../components/forms/BugForm';
import { BugListProject, Bugs } from './Details/BugListProject';
import { ProjectDetails } from './Details/ProjectDetails';
import { Link } from 'react-router-dom';
import { ButtonAddBug } from './Details/ButtonAddBug';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonAddMember } from './Details/ButtonAddMember';
import { GetCurrentUser, GetTokenUser } from '../../redux/selectors/userSelectors';
import { GetProjectDetails } from '../../redux/actions/projectActions';
import { ProjectDetailsData } from '../../redux/selectors/projectSelectors';
import './ProjectDetails.css'

export const ProjectDetailsPage = () => {
  //const tokenUser = localStorage.getItem('access_token')


   
      return (
       
        <Container id="ProjectContainer" style={{height: 'auto'}}  >
    <Grid marginTop={'50px'} marginBottom={'10px'} container spacing={1}  >
        <Grid  item>
          <ButtonAddBug />
        </Grid>
        <Grid item >
          <ButtonAddMember  />
        </Grid>
      </Grid>
      
     
     
    <div  style={{ marginBottom:'350px'}}>
       <ProjectDetails  />
        <BugsCount />
        <Bugs />
    </div>
        
    
    </Container>
     
     
      )}
      
      
                      


