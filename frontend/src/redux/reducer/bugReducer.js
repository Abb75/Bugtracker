import{ ALL_BUG_DATA_REQUEST, 
        ALL_BUG_DATA_SUCCESS, 
        ALL_BUG_DATA_FAIL,
        BUG_PROJECT_LOGOUT,
        BUG_PROJECT_REQUEST,
        BUG_PROJECT_SUCCESS, 
        BUG_PROJECT_FAIL, 
        ALL_BUG_DATA_LOGOUT, 
        UPDATE_BUG_REQUEST, 
        UPDATE_BUG_SUCCESS,
        UPDATE_BUG_FAIL, 
        SELECTED_BUG, 
        BUG_HISTORY_REQUEST, 
        BUG_HISTORY_SUCCESS,
        BUG_HISTORY_FAIL,
        BUG_HISTORY_LOGOUT, 
        BUG_COMMENT_REQUEST,
        BUG_COMMENT_FAIL,
        BUG_COMMENT_LOGOUT,
        BUG_COMMENT_SUCCESS,
        ARCHIVED_BUG_REQUEST,
        ARCHIVED_BUG_SUCCESS,
        ARCHIVED_BUG_FAIL,
        ARCHIVED_BUG_REMOVE} from "../constants/bugConstants"


export const userBugReducer =  (state={bug:[]}, action) => {
    switch(action.type){
        case ALL_BUG_DATA_REQUEST:
            return {loading:true, bug:[]}

        case ALL_BUG_DATA_SUCCESS:
            return {loading:false, bug : action.payload}

        case ALL_BUG_DATA_FAIL:
            return {loading:false, error : action.payload}

        case ALL_BUG_DATA_LOGOUT:
                return {bug : []}

        default:
            return state

    }
}



/*
export const bugUpdateStatusReducer =  (state={updateBugStatus:[]}, action) => {
    switch(action.type){
        case UPDATE_STATUS_BUG_REQUEST:
            return {loading:true, updateBugStatus:[]}

        case UPDATE_STATUS_BUG_SUCCESS:
            return {loading:false, updateBugStatus : action.payload}

        case UPDATE_STATUS_BUG_FAIL:
            return {loading:false, error : action.payload}

        default:
            return state

    }
}
*/
export const userBugProjectReducer =  (state={bugProject:[]}, action) => {
    switch(action.type){
        case BUG_PROJECT_REQUEST:
            return {loading:true, bugProject:[]}

        case BUG_PROJECT_SUCCESS:
            return {loading:false, bugProject : action.payload}

        case BUG_PROJECT_FAIL:
            return {loading:false, error : action.payload}

        case BUG_PROJECT_LOGOUT:
            return {bugProject:[]}

        case SELECTED_BUG:
            return {bugProject : action.payload}
            
        default:
            return state

    }
}


export  const bugHistoryReducer =  (state={bugHistory:[] }, action) => {

    switch(action.type){
        case BUG_HISTORY_REQUEST:
            return{loading: true, bugHistory: []}

        case BUG_HISTORY_SUCCESS:
            return {...state, loading: false, success:true, bugHistory: action.payload}

        case BUG_HISTORY_FAIL:
            return {loading:false, error:action.payload}

        case BUG_HISTORY_LOGOUT:
            return {bugHistory: []}

        default:
            return state

    }
}



export  const bugCommentReducer =  (state={bugComment:[] }, action) => {

    switch(action.type){
        case BUG_COMMENT_REQUEST:
            return{loading: true, bugComment: []}

        case BUG_COMMENT_SUCCESS:
            return {...state, loading: false, success:true, bugComment: action.payload}

        case BUG_COMMENT_FAIL:
            return {loading:false, error:action.payload}

        case BUG_COMMENT_LOGOUT:
            return {bugComment: []}

        default:
            return state

    }
}


export const archivedBugReducer =  (state={archivedBug:[]}, action) => {
    switch(action.type){
        case ARCHIVED_BUG_REQUEST:
            return {loading:true, archivedBug:[]}

        case ARCHIVED_BUG_SUCCESS:
            return {loading:false, archivedBug : action.payload}

        case ARCHIVED_BUG_FAIL:
            return {loading:false, error : action.payload}

        case ARCHIVED_BUG_REMOVE:
            return {archivedBug: []}
    
        default:
            return state

    }
}