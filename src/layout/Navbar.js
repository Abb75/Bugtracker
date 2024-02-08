
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { HandleLogout } from '../components/auth/Logout'
import FingerprintIcon from '@mui/icons-material/Fingerprint';


export const NavBar = () => {

    return (
    <Navbar>
        <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <div style={{ marginLeft:'40px'}} className='icon-profile'>
                <FingerprintIcon  style = {{top:'6px', fontSize:'3rem'}}/>
            </div>
          
            <div style={{position: 'absolute', marginRight: '40px'}} className='drop-down-profile'>
                 <HandleLogout/>
            </div>
        </Navbar.Collapse>
        </Container>
    </Navbar>)
}