import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Assurez-vous d'importer axios
import { useNavigate } from 'react-router-dom';

const RegistrationCongratulations = () => {
  const { id } = useParams();

  const sendConfirmRegistration = async () => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
        }
      };
    
      await axios.patch(`${process.env.REACT_APP_API_URL}users/register-confirm/${id}/`, { is_active: true }, config);

     
    } catch (error) {
      console.error('Erreur lors de la confirmation d\'inscription :', error);
    }
  };

  useEffect(() => {
        sendConfirmRegistration()
  
  }, [])

  return (
    <div>
      <h1>Félicitations !!!</h1>
      <p>Votre inscription est confirmée.</p>
      <p>Consultez votre boîte mail pour la confirmation de l'inscription.</p>
      <p>Vous pouvez maintenant vous connecter en utilisant le lien ci-dessous :</p>
      <Link  to="/login">Page de connexion</Link>
    </div>
  );
};

export default RegistrationCongratulations;
