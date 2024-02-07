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



export const ChartAdmin = () => {

  const datadict = []
  const allBug = Allbug()
  const projet = ListProjectByUser()
 
  projet?.forEach((project) => {

      if (!project.is_archived){
            const countBug = allBug?.filter(bug => bug.project === project.name &&
                                             bug.is_archived === false) 
            datadict.push({
            name: project.name,
            Developers: project.invitation.length,
            Tickets: countBug?.length || 0,

          })

      }
     
      
  
    })


    const [activeBar, setActiveBar] = useState(null);

    const handleBarMouseOver = (data) => {
      console.log(data)
      setActiveBar(data);
    };
  
    const handleBarMouseLeave = () => {
     
      setActiveBar(null);
    };
  


    return (
        <ResponsiveContainer>
        <Paper style={{paddingTop:'20px',width:  '96%',height: '110%', marginLeft: '26px', marginTop: '60px', paddingBottom:'50px'}}>
        <Typography variant="h5" style={{fontFamily: 'inherit', fontWeight: 'bold', textAlign:'center', bottom:'30px', marginTop: '10px' }} >
          Ticket vs Developers on Each Project
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
          <XAxis type="number" allowDecimals={false} />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip /> 
          <Legend />
          <Bar dataKey="Developers" barSize={60} fill="#413ea0"  />
       
          <Bar dataKey="Tickets" barSize={60} fill="#00C49F"  />
        </ComposedChart>
        </Paper>
        </ResponsiveContainer>
    );
  }

