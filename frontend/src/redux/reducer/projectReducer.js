import { PROJECT_DATA_REQUEST, PROJECT_DATA_SUCCESS, PROJECT_DATA_FAIL, PROJECT_DETAILS_REQUEST, PROJECT_DETAILS_SUCCESS,SELECT_PROJECT, PROJECT_DETAILS_FAIL, PROJECT_DATA_LOGOUT, REMOVE_SELECT_PROJECT, ARCHIVED_PROJECT_REQUEST, ARCHIVED_PROJECT_SUCCESS, ARCHIVED_PROJECT_FAIL, ARCHIVED_PROJECT_REMOVE, PROJECT_DETAILS_DELETE } from "../constants/projectConstants"


export const userProjectReducer =  (state={project:[]}, action) => {
    switch(action.type){
        case PROJECT_DATA_REQUEST:
            return {loading:true, project:[]}

        case PROJECT_DATA_SUCCESS:
            return {loading:false, project : action.payload}

        case PROJECT_DATA_FAIL:
            return {loading:false, error : action.payload}

        

        case PROJECT_DATA_LOGOUT: 
            return {project: []}
        

        default:
            return state

    }
}


export const projectDetailsReducer =  (state={projectDetails:[]}, action) => {
    switch(action.type){
        case PROJECT_DETAILS_REQUEST:
            return {loading:true, projectDetails:[]}

        case PROJECT_DETAILS_SUCCESS:
            return {loading:false, projectDetails : action.payload}

        case PROJECT_DETAILS_FAIL:
            return {loading:false, error : action.payload}
        
        case PROJECT_DETAILS_DELETE:
                return {projectDetails: []}
      

        default:
            return state

    }
}




export const archivedProjectReducer =  (state={archivedProject:[]}, action) => {
    switch(action.type){
        case ARCHIVED_PROJECT_REQUEST:
            return {loading:true, archivedProject:[]}

        case ARCHIVED_PROJECT_SUCCESS:
            return {loading:false, archivedProject : action.payload}

        case ARCHIVED_PROJECT_FAIL:
            return {loading:false, error : action.payload}


        case ARCHIVED_PROJECT_REMOVE:
            return {archivedProject: []}
    

        default:
            return state

    }
}