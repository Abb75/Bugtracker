import './App.css';
import { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import {Login} from './pages/Login/Login';
import SignUp from './pages/Signup/Register';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Footer } from './layout/Footer/footer';
import Project, { ProjectForm } from './components/forms/ProjectForm';
import {Sidebar}  from './layout/SideBar/sideBar';
import { ProjectDetailsPage } from './pages/ProjectDetails/ProjectDetails';
import { BugForm } from './components/forms/BugForm';
import { ProjectList } from './pages/ProjectList/ProjectList';
import { NavBar } from './layout/Navbar';
import BugTrackerPage from './pages/Home/Home'
//import UserContext from './context/UserContext/user';
import { Fragment, useEffect } from 'react';
import { isTokenExpired } from './axios';
import { useNavigate } from 'react-router-dom';
import InvitationForm from './components/forms/InvitationForm';
import { RegisterInvitationForm } from './pages/Signup/RegisterInvitationForm';
import { BugDetails } from './pages/BugDetails/BugDetails';
import { ArchivedProject } from './pages/ArchivedProject/ProjectList';
import { GuestsUser } from './pages/Guest/Guests';
import { Toaster } from 'sonner';
import ErrorPages from './components/ErrorPage';
import { ArchivedBug } from './pages/ArchivedBug/BugList';
import { HandlerInvitationsPage } from './components/account/ProjectInvitationsHandler';
import {UserProfile} from './components/account/infoUser';
import { UserPassword } from './components/account/UpdatePassword';
import { GetTokenUser } from './redux/selectors/userSelectors';
import Example, { NewChart } from './pages/Dashboard/Charts/Bug/ChartAdmin';
import { HashRouter } from 'react-router-dom';
import RegistrationCongratulations from './pages/Signup/SuccessRegistration';

function App() {
  //const value = useContext(UserContext)
  const navigate = useNavigate()
  const tokenUser = GetTokenUser()
  const location = useLocation();
  const showLayout = location.pathname === '/' ||
                      location.pathname === '/login' ||
                      location.pathname === '/register'||
                      location.pathname === '/Register-invitation/:uuid'


  useEffect(() => {
    if(!tokenUser   && !location.pathname === '/Register-invitation/:uuid'
   ){navigate('/login')
    }
  }, [tokenUser])
    
  return (
   
    <div className='App'>
      <Toaster richColors/>
      {!showLayout ? <Fragment>
                          <Sidebar/>
                          <NavBar/> 
                      </Fragment> : null }
     
        <Routes>
          <Route path='*' element={<ErrorPages/>}/> 
          <Route path='' element = {<BugTrackerPage/>}/>  
          <Route path='/dashboard' element={< Dashboard/>} />
          <Route path='/change-password' element={<UserPassword />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/project' element={<ProjectList />} />
          <Route path='/project/:id' element={<ProjectDetailsPage />} />
          <Route path='/guests' element={<GuestsUser/>} />
          <Route path='/Login' element={<Login />} />
          <Route path='/project/:projectId/bug/:bugId' element={<BugDetails/>} />
          <Route path='/archived-project' element = {<ArchivedProject/>} />
          <Route path='/archived-bug' element = {<ArchivedBug/>} />
          <Route path='/Register' element={<SignUp />} />
          <Route path='/new-project' element={<ProjectForm />} />
          <Route path='/project/:id/new-bug' element={<BugForm />} />
          <Route path='/project/:id/invitation' element={<InvitationForm />} />
          <Route path='/invitation' element={<HandlerInvitationsPage />} />
          <Route path='/Register-invitation/:uuid/' element={<RegisterInvitationForm />} />
          <Route path='/success-register/:id/' element={<RegistrationCongratulations />} />
        </Routes>
    </div>

  
   
     
  );
}

function AppWithRouter() {
  return (
    <HashRouter>
   
      <App /> 
    
    </HashRouter>
  );
}

export default AppWithRouter;