import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement, Legend} from 'chart.js'
import { Allbug } from '../../../../redux/selectors/bugSelectors';
Chart.register(ArcElement, Legend);

const BugChartStatus = () => {

  const countBugStatus = (bugs) => {
    if (bugs?.length !== 0){
       const statusCount = {
            Closed: 0,
           'In progress' :0,
            'To be tested' : 0, 
            Fixed : 0 ,
            New : 0,
            Rejected: 0,
           
          };
  
          bugs?.forEach((bug) => {
           
            statusCount[bug.status] += 1;
          }); 
          console.log(statusCount)
          return statusCount;
          }
   
  };
  

  const bugs = Allbug()
  console.log(bugs)
  const statusCount = countBugStatus(bugs);
  const data = {
    labels: ['Closed', 'New','Rejected', 'Fixed', 'In progress', 'To be tested', ],
    datasets: [ 
    
      {
        data: bugs?.length !== 0 ?   
              [statusCount.Closed,
               
                statusCount.New,
                  statusCount.Rejected,
                  statusCount.Fixed,
                  statusCount['In progress'],
                  statusCount['To be tested'],
                  ] : [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#8884d8', '#00ff00'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#8884d8', '#00ff00'],
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
export default BugChartStatus;