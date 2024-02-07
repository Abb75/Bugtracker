import { INVITATION_USER_FAIL, INVITATION_USER_REMOVE, INVITATION_USER_REQUEST, INVITATION_USER_SUCCESS } from "../constants/invitationConstants"
import { INVITATION_FAIL } from "../constants/userConstants"


export const invitationUserReducer =  (state={invitationUser:[]}, action) => {
    switch(action.type){
        case INVITATION_USER_REQUEST:
            return {loading:true, invitationUser:[]}

        case INVITATION_USER_SUCCESS:
            return {loading:false, invitationUser : action.payload}

        case INVITATION_USER_FAIL:
            return {loading:false, error : action.payload}


        case INVITATION_USER_REMOVE:
            return {invitationUser: []}
    

        default:
            return state

    }
}