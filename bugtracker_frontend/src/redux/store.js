import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
//import { userDataReducer } from "../redux/reducer/userReducer";
import { GuestUserDataReducer, userDataReducer, TokenUserReducer } from "./reducer/userReducer";
import { archivedProjectReducer, projectDetailsReducer, userProjectReducer } from "./reducer/projectReducer";
import { userBugReducer, userBugProjectReducer , bugHistoryReducer, bugCommentReducer, archivedBugReducer} from "./reducer/bugReducer"
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { invitationUserReducer } from "./reducer/invitationReducer";

const persistConfig = {
    key: 'main-root',
    storage,
}


const reducer = combineReducers({

    user : userDataReducer,
    guestUsers : GuestUserDataReducer,
    project : userProjectReducer,
    projectDetails: projectDetailsReducer,
    bug: userBugReducer,
    bugProject: userBugProjectReducer,
    bugHistory : bugHistoryReducer,
    bugComment : bugCommentReducer,
    selectedBug : userBugProjectReducer,
    archivedProject: archivedProjectReducer,
    archivedBug : archivedBugReducer,
    invitationUser : invitationUserReducer,
    tokenUser : TokenUserReducer

    
})

const persisteReducer = persistReducer(persistConfig, reducer)

const intitialState= {}
const middleware = [thunk]
const store = createStore(persisteReducer, intitialState, composeWithDevTools(applyMiddleware(...middleware)))
const persistor = persistStore(store)
export  {persistor}
export default store