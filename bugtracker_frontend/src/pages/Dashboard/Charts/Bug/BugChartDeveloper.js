import './bugChartDeveloper.css'
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { Allbug, BugProject } from "../../../../redux/selectors/bugSelectors";
import { ListProjectByUser } from "../../../../redux/selectors/projectSelectors";
import { all } from 'axios';
import { Grid, Container, Paper, Typography } from '@mui/material';
import { GetCurrentUser } from '../../../../redux/selectors/userSelectors';

export const BugChartDeveloper = () => {
  const currentUser = GetCurrentUser()
  const datadict = []
  const allBug = Allbug()
  const projet = ListProjectByUser()
  const bugproject = BugProject()
  
  projet?.forEach((project) => {
   
      const countBug = allBug?.filter(bug => bug.project === project.name) 
      console.log(countBug)
      const bugUser = allBug?.filter(bug => bug.assigned_to_email == currentUser.email )
      datadict.push({
        name: project.name,
        Bug_project: countBug?.length,
        Your_ticket: bugUser?.length,

      })
  
    })
  


  return (

    
    <Container style={{ display: 'flex', marginTop: '200px' }}>
      <Grid container spacing={6}>
       
      <Paper elevation={5} style={{ paddingTop:'60px', paddingRight: '80px', left:'60px', padding: '20px', height: '750px', width: '4500%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '1px 1px 7px rgba(0.0, 0.0, 0.0, 0.1)' }}>
      <Typography variant="h5" style={{fontFamily: 'inherit', fontWeight: 'bold', position: 'absolute', textAlign:'center', top:'40px' }} >
        All your bugs vs all bug in project

        </Typography> 
        
        
        
      
  
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop:'30px', marginLeft:'-10px' }}>
      
    <BarChart
      width={1200}
      height={600}
      data={datadict}
      
      margin={{
        
        top: 10,
        right: 4,
        left: 10,
        bottom: 9
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis interval={1} />
      <Tooltip />
      <Legend />
      <Bar dataKey="Bug_project" fill="#8884d8" />
      <Bar dataKey="Your_ticket" fill="#82ca9d" />
    </BarChart>
   
    </div>
    </Paper>
    </Grid>
    </Container>
  );
}
