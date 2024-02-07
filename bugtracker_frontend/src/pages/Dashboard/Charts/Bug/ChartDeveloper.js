import { Container, Paper, Typography } from '@mui/material';
import { Allbug } from '../../../../redux/selectors/bugSelectors';
import { ListProjectByUser } from '../../../../redux/selectors/projectSelectors';
import React, { PureComponent, useState } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';



export const ChartDeveloper = () => {

  const datadict = []
  const allBug = Allbug()
  const projet = ListProjectByUser()
  console.log(projet)
 
  projet?.forEach((project) => {
      console.log(allBug)
      const countBug = allBug?.filter(bug => bug.project === project.name && bug.is_archived === false) 
      datadict.push({
        name: project.name,
        //Developers: project.invitation.length,
        Tickets: countBug?.length,

      })
  
    })



    return (
        <Container>
        <Paper style={{paddingTop:'20px',width:  '100%',height: '110%', marginLeft: '5px', marginTop: '60px', paddingBottom:'50px'}}>
        <Typography variant="h5" style={{fontFamily: 'inherit', fontWeight: 'bold', textAlign:'center', bottom:'30px', marginTop: '10px' }} >
         Yours bugs in each project
        </Typography>
        
      
        <ComposedChart
          layout="vertical"
          
          width={1000}
          height={700}
          data={datadict}
         
          margin={{
            
            top: 40,
            right: 2,
            bottom: 2,
            left: 30,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Tickets" barSize={60} fill="#00C49F" isAnimationActive={false}/>
        </ComposedChart>
        </Paper>
        </Container>
    );
  }

