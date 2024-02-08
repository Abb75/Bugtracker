import { ARCHIVED_BUG_REQUEST, ARCHIVED_BUG_SUCCESS } from "../constants/bugConstants";
import { PROJECT_DATA_FAIL,
     PROJECT_DATA_REQUEST,
      PROJECT_DATA_SUCCESS,
       PROJECT_DETAILS_REQUEST,
        PROJECT_DETAILS_SUCCESS, 
        PROJECT_DETAILS_FAIL,
         SELECT_PROJECT, 
         REMOVE_SELECT_PROJECT,
          PROJECT_DATA_LOGOUT, 
          PROJECT_DETAILS_DELETE,
           CREATE_PROJECT_REQUEST, 
           ARCHIVED_PROJECT_REQUEST,
            ARCHIVED_PROJECT_SUCCESS, 
        ARCHIVED_PROJECT_FAIL } from "../constants/projectConstants";
import axios from "axios";

   
  export const GetUserProjectApi= (tokenUser) => async(dispatch) => {
   try {

        dispatch({type: PROJECT_DATA_REQUEST})
        const config = {
            headers: { 
                'Content-type':  'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${tokenUser}`,
                
            } 
        } 
        const {data} = await axios.get(process.env.REACT_APP_API_URL + 'project' , config )
        console.log(data)
        dispatch({
            type: PROJECT_DATA_SUCCESS,
            payload: data
        })
    }catch(error){

        
        console.log(error)
            dispatch({
                type: PROJECT_DATA_FAIL,
                payload: error
            })
        }}
    
    


    export const GetProjectDetails = (tokenUser, id) => async(dispatch) => {
        try {
     
             dispatch({type: PROJECT_DETAILS_REQUEST})
             const config = {
                 headers: { 
                     'Content-type':  'application/json',
                     'Accept': 'application/json',
                     Authorization: `Bearer ${tokenUser}`,
                     
                 } 
             } 
            const {data} = await axios.get(process.env.REACT_APP_API_URL + `project/${id}` , config )
             console.log(data)
             dispatch({
                 type: PROJECT_DETAILS_SUCCESS,
                 payload: data
             }) 
             
       

             
             }catch(error){
                 dispatch({
                     type: PROJECT_DETAILS_FAIL,
                     payload: error
                 })
             }
         
         
         }
         
export const selectProject = (project) => (dispatch) => {
    console.log(project)
       dispatch({
                type: SELECT_PROJECT,
                payload: project,
     })

    }
export const removeSelectedProject = (dispatch) => {
    dispatch({
        type :REMOVE_SELECT_PROJECT
    })
}

export const removeProject = (dispatch) => {
    dispatch({
        type :PROJECT_DATA_LOGOUT
    })
}

export const DeleteProjectById = async(tokenUser, id) => {
    try {
 
       
         const config = {
             headers: { 
                 'Content-type':  'application/json',
                 'Accept': 'application/json',
                 Authorization: `Bearer ${tokenUser}`,
                 
             } 
         } 
        await axios.delete(process.env.REACT_APP_API_URL + `project/${id}` , config )
         
         }catch(error){
            console.log(error)
         }
     
     
     }
     
     export const PostProjectApi = (formData, tokenUser) => async(dispatch) => {   
        try {
           dispatch({type: CREATE_PROJECT_REQUEST})
           const config = {
             headers: { 
                
                 'Content-type':  'application/json',
                 'Accept': 'application/json',
                 Authorization: `Bearer ${tokenUser}`,
                
             }
           
     
         } 
          
           await axios.post(process.env.REACT_APP_API_URL + 'project/' ,{
             name : formData.name,
             submission_date : formData.submission_date,
             project_duration : formData.project_duration,
             project_lead : formData.project_lead,
             description : formData.description,
             admin: formData.admin,
             status: formData.status,
            
           }, config )
           
           
         }catch(error){
           console.log(error)
         }
     
       }
     
       
       
       export const UpdateProjectApi = async (projectId, tokenUser, status) => {
        console.log(projectId, tokenUser,status)
        try {
          const config = {
            headers: {
              'Content-type': 'application/json',
              'Accept': 'application/json',
              Authorization: `Bearer ${tokenUser}`, 
            }
          }
      
          await axios.patch(process.env.REACT_APP_API_URL + `project/${projectId}/`, {
            status : status
          }, config)
    
        } catch (error) {
          console.log(error);
        }
      }
      


   
export const GetProjectArchivedApi = (tokenUser) => async(dispatch) => {   
  console.log(tokenUser)
        try {
           dispatch({type: ARCHIVED_PROJECT_REQUEST})
           const config = {
             headers: { 
                
                 'Content-type':  'application/json',
                 'Accept': 'application/json',
                 Authorization: `Bearer ${tokenUser}`,
                
             }
         } 
          const {data}=  await axios.get(process.env.REACT_APP_API_URL + 'archived-project/' , config )
          console.log(data)
          dispatch({type: ARCHIVED_PROJECT_SUCCESS,
                    payload: data})
           
         }catch(error){
            dispatch({type: ARCHIVED_PROJECT_FAIL})
           console.log(error)
         }
        }
         

        


        
  export const UpdateProjectArchivedApi = async (projectId, tokenUser, value) => {
    console.log(projectId, tokenUser,value)
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${tokenUser}`, 
        }
      }
  
      await axios.patch(process.env.REACT_APP_API_URL + `project/${projectId}/`, {
        is_archived : value
      }, config)

    } catch (error) {
      console.log(error);
    }
  }
    
    
