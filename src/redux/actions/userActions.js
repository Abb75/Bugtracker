import { USER_DATA_REQUEST, USER_DATA_SUCCESS, USER_DATA_FAIL, USER_DATA_LOGOUT,REMOVE_ROLE_GUEST_USER, INVITATION_REQUEST, ALL_INVITATION_BY_ADMIN_USER_REQUEST, ALL_INVITATION_BY_ADMIN_USER_SUCCESS, ALL_INVITATION_BY_ADMIN_USER_FAIL, REMOVE_SELECTED_GUEST_USERS, SELECTED_ROLE_GUEST_USER, TOKEN_USER_REQUEST, TOKEN_USER_SUCCESS, TOKEN_USER_FAIL, TOKEN_USER_REMOVE } from "../constants/userConstants";
 import axiosInstance from "../../axios";
import { PROJECT_DATA_LOGOUT, PROJECT_DETAILS_DELETE, REMOVE_SELECT_PROJECT } from "../constants/projectConstants";
import { ALL_BUG_DATA_LOGOUT, BUG_COMMENT_LOGOUT, BUG_COMMENT_REQUEST, BUG_HISTORY_LOGOUT, BUG_PROJECT_LOGOUT } from "../constants/bugConstants";
import axios from "axios";
import { GetAllBugApi } from "./bugActions";
import { INVITATION_USER_REMOVE } from "../constants/invitationConstants";
import { SendSuccessNotification } from "../../components/Alert";


   
  export const GetUserApi= (id, tokenUser) => async(dispatch) => {
    console.log(id, tokenUser)
    console.log('LOLOLO')
    try{
      const config = {
        headers: { 
        
            'Content-type':  'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${tokenUser}`,
        
        }
    } 
          dispatch({type: USER_DATA_REQUEST})
          const {data} = await  axiosInstance.get(process.env.REACT_APP_API_URL + `users/${id}/`,config)
         console.log(data)
          dispatch({
            type: USER_DATA_SUCCESS,
            payload: data
          })
          axiosInstance.defaults.headers['Authorization'] = 
              'JWT' + localStorage.getItem('access_token'); 
       
       
    }catch(error){
      dispatch({
        type : USER_DATA_FAIL,
        payload: error.response
      })
      console.log(error)
    }
  }

export const DeleteUserData = (dispatch) => {
  dispatch({
    type: USER_DATA_LOGOUT,
    
  })
}
  

export const logout = (tokenUser) => async(dispatch) => {
 

  
  
    
    try{
        dispatch({
          type : USER_DATA_LOGOUT
        })
        const config = {
            headers: { 
            
                'Content-type':  'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${tokenUser}`,
            
            }

        } 
   
        const response =  axiosInstance.post(process.env.REACT_APP_API_URL + 'token/blacklist/' ,config,{
            refresh_token : localStorage.getItem('refresh_token') , 
            
        });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('email');
            localStorage.removeItem('id');
            
            axiosInstance.defaults.headers['Authorization'] = null;

          dispatch({
            type: USER_DATA_LOGOUT
          })
          dispatch({
            type : PROJECT_DATA_LOGOUT
          })
          dispatch({
            type: ALL_BUG_DATA_LOGOUT,
          })
          dispatch({
            type: BUG_PROJECT_LOGOUT
          })
          dispatch({
            type: REMOVE_SELECT_PROJECT
          })
          dispatch({
            type: REMOVE_SELECTED_GUEST_USERS
          })
          dispatch({
            type: BUG_HISTORY_LOGOUT
          })
          dispatch({
            type: BUG_COMMENT_LOGOUT
          })
          dispatch({
            type: REMOVE_ROLE_GUEST_USER
          })
          dispatch({
            type: INVITATION_USER_REMOVE
          })
          dispatch({
            type: TOKEN_USER_REMOVE
          })
          dispatch({
            type: PROJECT_DETAILS_DELETE
          })

      
         
        
    }catch(AxiosError){
        console.log(AxiosError)
       
      
    }
   
  
}


 
 
 export const PostCreateGuestUserApi = async(formData, tokenUser, uuid)  => {   
  console.log(formData)
  try {
    
    
    
     await axios.put(process.env.REACT_APP_API_URL + `Register-invitation/${uuid}/` ,{
       email : formData.email,
       password : formData.password,
       confirm_password : formData.confirm_password,
       first_name : formData.first_name,
       last_name : formData.last_name,
      phone : formData.phone      
      
    
  })
     
     
   }catch(error){
     throw error
   }

 }

 

 export const GetAllGuestUserByAdmin = (tokenUser) => async(dispatch) => {
  console.log(tokenUser)
 
  try{
        dispatch({type: ALL_INVITATION_BY_ADMIN_USER_REQUEST})
         const config = {
            headers: { 
                
                'Content-type':  'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${tokenUser}`,
                
            }
          }
        const {data} = await  axiosInstance.get(process.env.REACT_APP_API_URL + 'guests/', config)
        console.log(data ) 
        dispatch({
          type: ALL_INVITATION_BY_ADMIN_USER_SUCCESS,
          payload: data
        })
       
     
  }catch(error){
    dispatch({
      type : ALL_INVITATION_BY_ADMIN_USER_FAIL,
      payload: error.response
    })
    console.error(error)
  }
}


export const LoginApi = (email, password) => async(dispatch) => {

    try{
      dispatch({type: TOKEN_USER_REQUEST})
     
        const {data} =  await  axiosInstance.post(process.env.REACT_APP_API_URL + 'token/', {
        email : email, 
        password : password}
        )
      dispatch({
        type: TOKEN_USER_SUCCESS,

        payload: data
      })  
      console.log(data)
        await dispatch(GetUserApi(data.id, data.access))
      
        
        //localStorage.setItem('access_token', data.access);
        //localStorage.setItem('refresh_token', data.refresh);
        //localStorage.setItem('id', data.id);
        axiosInstance.defaults.headers['Authorization'] = 
              'JWT' + data.access; 
    
        //localStorage.setItem('id', data.id);
        
      
    }catch(error){
    throw error
    
  }
}


export const UpdateRoleUserByProjectApi = async(value, projectId, invitationId, tokenUser) => {
  console.log(value,projectId, invitationId, tokenUser)
  try{
  

    const config = {

      headers: { 
          'Content-type':  'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${tokenUser}`,
      
      }}
         await  axiosInstance.patch(process.env.REACT_APP_API_URL + `project/${projectId}/invitation/${invitationId}/` , {
          role : value
        } , config )
  }catch(error){
   throw error
    console.log(error)
  }
}



export const selectRoleGuestUser = (role)  => (dispatch) => {
     console.log(role)
     dispatch({
              type: SELECTED_ROLE_GUEST_USER,
              payload: role,
   }) }

   
  export const RemoveSelectRoleGuestUser = (dispatch) => {
   
    dispatch({
             type: REMOVE_ROLE_GUEST_USER,
           
  })

 }





export const UpdateUserInfoApi = async(userId, formData, tokenUser) => {
  console.log(userId,formData)
  try{
    const config = {
      headers: { 
          'Content-type':  'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${tokenUser}`,
      }}
        await  axiosInstance.patch(process.env.REACT_APP_API_URL + `users/${userId}/` , {
            first_name : formData.first_name,
            last_name : formData.last_name,
            email : formData.email,

        }, config )
  } 
  
  
  catch(error){
   throw error
    console.log(error)
  }
}



export const UpdateUserPasswordApi = async(userId, formData, tokenUser) => {
  console.log(userId,formData)

  try{
    
    const config = {

      headers: { 
          'Content-type':  'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${tokenUser}`,
      
      }}
         await  axiosInstance.patch(
          process.env.REACT_APP_API_URL + `users/${userId}/` ,
          {
            password : formData.password,
            confirm_password : formData.confirm_password,
          } , config )

  } 
  

  catch(error){
    console.log(error)
    throw error
    
    
  }
}