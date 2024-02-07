import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement, Legend} from 'chart.js'
import { Allbug } from '../../../../redux/selectors/bugSelectors';
Chart.register(ArcElement, Legend);

const BugChartPriority= () => {

  const countPriority = (bugs) => {
    if (bugs?.length !== 0){
       const priorityCount = {
            Critical: 0,
            High :0,
            
            Normal : 0,
            Low: 0,
           
          };
  
          bugs?.forEach((bug) => {
            if(!bug.is_archived ){
               priorityCount[bug.priority] += 1;
            }
           
          }); 
          console.log(priorityCount)
          return priorityCount;
          }
   
  };
  

  const bugs = Allbug()
  console.log(bugs)
  const priorityCount = countPriority(bugs);
  const data = {
      labels: ['Critical', 'High', 'Normal', 'Low'],
    datasets: [ 
    
      {
        data: bugs?.length !== 0 ?   
              [priorityCount.Critical,
               
                priorityCount.High,
                  priorityCount.Normal,
                  priorityCount.Low,
                
                  ] : [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50']
      },
    ],
  };

 

  const options = {
    responsive: true, // Le graphique s'adaptera à la taille du conteneur parent
    maintainAspectRatio: false, // Permet de désactiver le ratio d'aspect par défaut pour ajuster la taille du graphique
    // Hauteur du graphique en pixels ou en pourcentage
  
  }
  

  return(
    <div  style={{position: 'relative', height:'30vh',  width:'80vh'}}> 
    <Doughnut data={data} options={options}/> 
    </div>)
    
   
  
  
}
export default BugChartPriority;