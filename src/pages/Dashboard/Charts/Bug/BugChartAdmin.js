
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



export const BugChartAdmin = () => {
  const datadict = []
  const allBug = Allbug()
  const projet = ListProjectByUser()
  console.log(projet)
 
  projet?.forEach((project) => {
      console.log(allBug)
      const countBug = allBug?.filter(bug => bug.project === project.name && bug.is_archived === false) 
      datadict.push({
        name: project.name,
        Developer: project.invitation.length,
        tickets: countBug?.length,

      })
  
    })
  
    

  return (

    
    <Container style={{ display: 'flex', marginTop: '200px' }}>
      <Grid container spacing={6}>
       
      <Paper elevation={5} style={{ paddingTop:'60px', paddingRight: '80px', left:'60px', padding: '20px', height: '750px', width: '4500%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '1px 1px 7px rgba(0.0, 0.0, 0.0, 0.1)' }}>
        
        <Typography variant="h5" style={{fontFamily: 'inherit', fontWeight: 'bold', position: 'absolute', textAlign:'center', top:'40px' }} >
          Ticket vs Developers on Each Project

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
      <Bar dataKey="Developer" fill="#8884d8" barSize={60}  />
      <Bar dataKey="tickets" fill="#82ca9d" barSize={60}  />
    </BarChart>
   
    </div>
    </Paper>
    </Grid>
    </Container>
  );
}
