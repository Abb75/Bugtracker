import { useSelector } from "react-redux"

export const GetInvitationGuestUser = () => {
    return useSelector(state => state.invitationUser.invitationUser)
}