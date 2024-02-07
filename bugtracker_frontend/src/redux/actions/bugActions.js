import { Dialpad } from "@mui/icons-material";
import axios from "axios";

import{ ADD_BUG_REQUEST,
        ALL_BUG_DATA_REQUEST,
        ALL_BUG_DATA_SUCCESS,
        ALL_BUG_DATA_FAIL,
        BUG_PROJECT_FAIL,
        BUG_PROJECT_REQUEST,
        BUG_PROJECT_SUCCESS,
        ALL_BUG_DATA_LOGOUT,
        UPDATE_BUG_REQUEST, 
        UPDATE_BUG_SUCCESS, 
        UPDATE_BUG_FAIL, 
        SELECTED_BUG, 
        BUG_HISTORY_SUCCESS,
        BUG_HISTORY_REQUEST, 
        BUG_HISTORY_FAIL, 
        BUG_COMMENT_REQUEST,
        BUG_COMMENT_FAIL,
        BUG_COMMENT_SUCCESS,
        ARCHIVED_BUG_REQUEST,
        ARCHIVED_BUG_SUCCESS,
        ARCHIVED_BUG_FAIL} from "../constants/bugConstants";


export const PostBugProjectApi = (id,formData, tokenUser) => async(dispatch) => {   
   
    dispatch({type:ADD_BUG_REQUEST})
     try {
        console.log(tokenUser)
        const config = {
          headers: { 
             
              'Content-type':  'application/json',
              'Accept': 'application/json',
              Authorization: `Bearer ${tokenUser}`,
             
          }
      } 
      await axios.post(process.env.REACT_APP_API_URL + `project/${id}/bug/` ,
     {
     
        title : formData.title,
        date : formData.submission_date,
        priority: formData.priority,
        assigned_to: formData.assigned_to,
        description: formData.description,
        created_by: formData.created_by,
        status: 'New',
        project: id
      
      },  config )
      console.log(formData)
    
        
       
      }catch(error){
        console.log(error)
      }
  
    }


   
  export const GetAllBugApi= (tokenUser) => async(dispatch) => {
   try {

        dispatch({type: ALL_BUG_DATA_REQUEST})
        const config = {
            headers: { 
                'Content-type':  'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${tokenUser}`,
                
            } 
        } 
        const {data} = await axios.get(process.env.REACT_APP_API_URL + 'bug/' , config )
        console.log(data)
        dispatch({
            type: ALL_BUG_DATA_SUCCESS,
            payload: data
        })
        }catch(error){
            dispatch({
                type: ALL_BUG_DATA_FAIL,
                payload: error
            })
        }
    
    
    }

    export const GetBugProjectApi = (id, tokenUser) => async(dispatch) => {   
       console.log(id)
        try {
            dispatch({type: BUG_PROJECT_REQUEST})
           
            const config = {
                headers: { 
                 
                    'Content-type':  'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${tokenUser}`,
                
              }
        
          } 
            
          const {data} = await axios.get(process.env.REACT_APP_API_URL+ `project/${id}/bug/` , config )
            dispatch({
                type: BUG_PROJECT_SUCCESS,
                payload: data
        })
        console.log(data)
          //return data.results
            
           
          }catch(error){
            console.log(error)
            dispatch({
                type: BUG_PROJECT_FAIL,
                payload: error
            })
          }
      
        }
      
export const DeleteBugProject = () => (dispatch) => {
    dispatch({
        type: ALL_BUG_DATA_LOGOUT
    })
}


export const UpdateBugApi =  (projectId, bugId, tokenUser, value, property) => async(dispatch)   =>  {

  console.log(projectId,bugId, tokenUser,property)
  try{
          dispatch({type: UPDATE_BUG_REQUEST})
              const config = {
                  headers: {
                  'Content-type': 'application/json',
                  'Accept': 'application/json',
                  Authorization: `Bearer ${tokenUser}`, 
                  }
              }
          
              const {data} = await axios.patch(process.env.REACT_APP_API_URL + `project/${projectId}/bug/${bugId}/`, {
                  [property]:  value
      }, config)
      console.log(data)
      dispatch({
              type: UPDATE_BUG_SUCCESS,
              payload : data
          })

  } catch (error) {
   dispatch({
      type: UPDATE_BUG_FAIL,
      payload: error
   })
    console.log(error);
  }
}


export const UpdateUserBugApi =  (projectId, bugId, tokenUser, user) => async(dispatch) => {
    console.log(projectId,bugId, tokenUser,user)
    dispatch({type: UPDATE_BUG_REQUEST})
        try {
        const config = {
            headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${tokenUser}`, 
            }
        }
  
      const {data} = await axios.patch(process.env.REACT_APP_API_URL + `project/${projectId}/bug/${bugId}/`, {
        assigned_to : user
      }, config)
      console.log(data)
      dispatch({
        type: UPDATE_BUG_SUCCESS,
        payload : data
    })

    } catch (error) {
      console.error(error)
        dispatch({
            type: UPDATE_BUG_FAIL,
            payload: error
         })
   
    }
  }


  export const selectedBug = (bug) => (dispatch) => {
    console.log(bug)
       dispatch({
                type: SELECTED_BUG,
                payload: bug,
     })

    }



    export const GetBugHistoryApi = (projectId, bugId, tokenUser) => async(dispatch) => {   
     
       try {
           dispatch({type: BUG_HISTORY_REQUEST})
           const config = {
               headers: { 
                
                   'Content-type':  'application/json',
                   'Accept': 'application/json',
                   Authorization: `Bearer ${tokenUser}`,
               
             }
       
         } 
           
         const {data} = await axios.get(process.env.REACT_APP_API_URL + `project/${projectId}/bug/${bugId}/history/` , config )
           dispatch({
               type: BUG_HISTORY_SUCCESS,
               payload: data
       })
       console.log(data)
        return data[0]
           
          
         }catch(error){
           console.log(error)
           dispatch({
               type:BUG_HISTORY_FAIL,
               payload: error
           })
         }
     
       }
       export const GetBugCommentsApi = (projectId, bugId, tokenUser) => async(dispatch) => {   
     
        try {
            dispatch({type: BUG_COMMENT_REQUEST})
            const config = {
                headers: { 
                 
                    'Content-type':  'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${tokenUser}`,
                
              }
        
          } 
            
          const {data} = await axios.get(process.env.REACT_APP_API_URL + `project/${projectId}/bug/${bugId}/comment/` , config )
            dispatch({
                type: BUG_COMMENT_SUCCESS,
                payload: data
        })
        console.log(data)
         return data[0]
            
           
          }catch(error){
            console.log(error)
            dispatch({
                type:BUG_COMMENT_FAIL,
                payload: error
            })
          }
      
        }
      
     
export const PostBugCommentApi = async(projectId,bugId,formData, tokenUser) => {   
        console.log(formData)
         try {
           
            const config = {
              headers: { 
                 
                  'Content-type':  'application/json',
                  'Accept': 'application/json',
                  Authorization: `Bearer ${tokenUser}`,
                 
              }
          } 
          await axios.post(process.env.REACT_APP_API_URL + `project/${projectId}/bug/${bugId}/comment/` ,
         {
            created_by : formData.created_by,
            related_bug : formData.related_bug,
            description: formData.description,
            created_at : formData.created_at

          
          },  config )
          console.log(formData)
        
            
           
          }catch(error){
            console.log(error)
          }
      
        }
    

     
export const DeleteBugCommentApi = async(projectId,bugId,commentId, tokenUser) => {   
          
    try {
      const config = {
        headers: { 
            'Content-type':  'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${tokenUser}`,
            
        }
      } 
    await axios.delete(process.env.REACT_APP_API_URL + `project/${projectId}/bug/${bugId}/comment/${commentId}/`, config)
    
    }catch(error){
      console.log(error)
    }

  }




   
  export const GetBugIdProjectApi = async(bugId, projectId, tokenUser) =>  {
    try {
 
         
         const config = {
             headers: { 
                 'Content-type':  'application/json',
                 'Accept': 'application/json',
                 Authorization: `Bearer ${tokenUser}`,
                 
             } 
         } 
         const {data} = await axios.get(process.env.REACT_APP_API_URL + `project${projectId}/${bugId}/` , config )
         console.log(data)
         
         
         }catch(error){
           
             
         }
     
     
     }






export const DeleteBugApi = async(bugId,projectId,  tokenUser) => {   
  console.log(bugId, projectId)
  try {
    const config = {
      headers: { 
          'Content-type':  'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${tokenUser}`,
      }
    } 
  await axios.delete(process.env.REACT_APP_API_URL + `project/${projectId}/bug/${bugId}/`, config)
  
  }catch(error){
    throw error
  }

}



   




export const GetBugArchivedApi = (tokenUser) => async(dispatch) => {   
  console.log(tokenUser)
        try {
           dispatch({type: ARCHIVED_BUG_REQUEST})
           const config = {
             headers: { 
                
                 'Content-type':  'application/json',
                 'Accept': 'application/json',
                 Authorization: `Bearer ${tokenUser}`,
                
             }
         } 
          const {data}=  await axios.get(process.env.REACT_APP_API_URL + 'archived-bug/' , config )
          console.log(data)
          dispatch({type: ARCHIVED_BUG_SUCCESS,
                    payload: data})
           
         }catch(error){
            dispatch({type: ARCHIVED_BUG_FAIL})
           console.log(error)
         }
     
       }


            
    export const UpdateBugArchivedApi = async (projectId, bugId, tokenUser, value, user) => {
      console.log(projectId, tokenUser,value)
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${tokenUser}`, 
          }
        }
    
        await axios.patch(process.env.REACT_APP_API_URL + `project/${projectId}/bug/${bugId}/`, {
          is_archived : value,
          archived_by : user
        }, config)
  
      } catch (error) {
        console.log(error);
      }
    }

