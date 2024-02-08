import { useSelector } from "react-redux";


export const GetCurrentUser = () => {
    return  useSelector(state => state.user.user)
}

export const GetGuestUsersByAdmin = () => {
    return  useSelector(state => state.guestUsers.guestUsers)
}

export const GetCurrentRoleGuestUser = () => {
    return  useSelector(state => state.selectedRole.selectedRole)
}

export const GetTokenUser = () => {
    return useSelector(state => {
      if (state.tokenUser && state.tokenUser.tokenUser && state.tokenUser.tokenUser.access) {
        return state.tokenUser.tokenUser.access;
      } else {
        return null;
      }
    });
  };

