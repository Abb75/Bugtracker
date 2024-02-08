import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement, Legend} from 'chart.js'
import { useSelector } from 'react-redux';
Chart.register(ArcElement, Legend);

const countProjectPriorities = (projects) => {
  if (projects?.length !== 0){
     const prioritiesCount = {
          Critical: 0,
          High: 0,
          Normal: 0,
          Low: 0,
        };

        projects?.forEach((project) => {
         
          prioritiesCount[project.status] += 1;
        }); 
        return prioritiesCount;
        }
 
};

const ProjectChartPriority = () => {
  const projectData = useSelector(state => state.project)
 
  const prioritiesCount = countProjectPriorities(projectData.project);
  const data = {
    labels: ['Critical', 'High', 'Normal', 'Low'],
    datasets: [ 
    
      {
        data: projectData.project?.length !== 0 ? 
              [prioritiesCount.Critical,
                  prioritiesCount.High,
                  prioritiesCount.Normal,
                  prioritiesCount.Low] : [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
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
export default ProjectChartPriority;