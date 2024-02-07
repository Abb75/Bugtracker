import { USER_DATA_SUCCESS, USER_DATA_REQUEST, USER_DATA_FAIL, USER_DATA_LOGOUT, ALL_INVITATION_BY_ADMIN_USER_REQUEST, ALL_INVITATION_BY_ADMIN_USER_SUCCESS, ALL_INVITATION_BY_ADMIN_USER_FAIL, REMOVE_SELECTED_GUEST_USERS, SELECTED_ROLE_GUEST_USER, REMOVE_ROLE_GUEST_USER, TOKEN_USER_REQUEST, TOKEN_USER_SUCCESS, TOKEN_USER_FAIL, TOKEN_USER_REMOVE } from "../constants/userConstants"


export const userDataReducer =  (state={user:[]}, action) => {
    switch(action.type){
        case USER_DATA_REQUEST:
            return {loading:true, user:[]}

        case USER_DATA_SUCCESS:
            return {loading:false, user : action.payload}

        case USER_DATA_FAIL:
            return {loading:false, error : action.payload}

        case USER_DATA_LOGOUT:
            return {user :[]}

        default:
            return state

    }
}

export const GuestUserDataReducer =  (state={guestUsers:[]}, action) => {
    switch(action.type){
        case ALL_INVITATION_BY_ADMIN_USER_REQUEST:
            return {loading:true, guestUsers:[]}

        case ALL_INVITATION_BY_ADMIN_USER_SUCCESS:
            return {loading:false, guestUsers : action.payload}

        case ALL_INVITATION_BY_ADMIN_USER_FAIL:
            return {loading:false, error : action.payload}

        case REMOVE_SELECTED_GUEST_USERS:
            return {guestUsers: []}

               default:
            return state

    }
}


export const TokenUserReducer =  (state={tokenUser:[]}, action) => {
    switch(action.type){
        case TOKEN_USER_REQUEST:
            return {loading:true, tokenUser:[]}

        case TOKEN_USER_SUCCESS:
            return {loading:false, tokenUser : action.payload}

        case TOKEN_USER_FAIL:
            return {loading:false, error : action.payload}

        case TOKEN_USER_REMOVE:
            return {tokenUser: []}

               default:
            return state

    }
}



