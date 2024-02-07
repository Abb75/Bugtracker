import React from 'react';
import { Typography, Grid, Card, CardContent, Button, Link } from '@mui/material'; // Importer les composants Material-UI nécessaires

const Header = () => {
  return (
    <div style={{ backgroundColor: '#3f51b5', padding: '1rem', color: '#fff' }}>
      <Typography variant="h4" align="center" gutterBottom>
       T R Λ C K E R S
      </Typography>
    </div>
  );
};

const Navbar = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '1rem' }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Link href="/" style={{ marginRight: '1rem' }}>
            Accueil
          </Link>
        
        </Grid>
      </Grid>
    </div>
  );
};

const Footer = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', marginTop: '2rem' }}>
      <Typography variant="body2" align="center">
       TRΛCKERS- Tous droits réservés &copy; 2023
      </Typography>
    </div>
  );
};

const BugTrackerPage = () => {
  return (
    <div>
      <Header />

      <Navbar />

      <div style={{ backgroundColor: '#f5f5f5', padding: '2rem 0' }}>
        <div style={{ backgroundColor: '#fff', maxWidth: '800px', margin: '0 auto', padding: '2rem', borderRadius: '8px' }}>
          <Typography variant="h3" align="center" gutterBottom>
            Gestion professionnelle des bugs avec notre Bug Tracker
          </Typography>
          <Grid container justifyContent="center" alignItems="center" spacing={4} sx={{ marginBottom: '2rem' }}>
            <Grid item>
            </Grid>
            <Grid item>
              <Typography variant="body1" align="left" sx={{ maxWidth: '500px' }}>
                Notre Bug Tracker offre des fonctionnalités avancées pour gérer efficacement les bugs de votre projet.
                Avec une interface intuitive et des outils puissants, il permet à votre équipe de développement de résoudre les problèmes rapidement et de maintenir la qualité de votre logiciel.
              </Typography>
            </Grid>
          </Grid>
        </div>

        <div style={{ backgroundColor: '#fff', maxWidth: '800px', margin: '0 auto', padding: '2rem', borderRadius: '8px', marginTop: '2rem' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Signalement précis des bugs
          </Typography>
          <Grid container justifyContent="center" alignItems="center" spacing={4} sx={{ marginBottom: '2rem' }}>
            <Grid item>
            </Grid>
          </Grid>
          <Typography variant="body1" align="center" sx={{ maxWidth: '600px', margin: '0 auto' }}>
            Notre Bug Tracker permet aux utilisateurs de fournir des informations détaillées sur les bugs.
            Cela permet à votre équipe de comprendre rapidement les problèmes et de les résoudre de manière ciblée.
          </Typography>
        </div>

        <div style={{ backgroundColor: '#fff', maxWidth: '800px', margin: '0 auto', padding: '2rem', borderRadius: '8px', marginTop: '2rem' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Suivi approfondi des tickets
          </Typography>
          <Grid container justifyContent="center" alignItems="center" spacing={4} sx={{ marginBottom: '2rem' }}>
            <Grid item>
            </Grid>
          </Grid>
          <Typography variant="body1" align="center" sx={{ maxWidth: '600px', margin: '0 auto' }}>
            Notre Bug Tracker offre un suivi approfondi des tickets, vous permettant de suivre leur état, d'assigner des tâches à votre équipe et de prioriser les problèmes.
            Vous avez une vue d'ensemble claire de tous les bugs et de leur résolution, ce qui vous aide à maintenir la qualité de votre projet.
          </Typography>
        </div>

        <div style={{ backgroundColor: '#fff', maxWidth: '800px', margin: '0 auto', padding: '2rem', borderRadius: '8px', marginTop: '2rem', textAlign: 'center' }}>
          <Link href={'https://abb75.github.io/bugtracker_frontend/#/login'}>
            <Button variant="contained" color="primary" size="large">
              Essayez notre Bug Tracker
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BugTrackerPage;