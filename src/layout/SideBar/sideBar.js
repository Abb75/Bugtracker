import { Avatar, Drawer, List, Stack, Toolbar, useMediaQuery, ThemeProvider, createTheme, Typography, IconButton } from "@mui/material";
import colorConfigs from '../../components/configs/colorConfigs'
//import sizeConfigs from "../../configs/sizeConfigs";
import SidebarItem from "./sideBarItem";
import appRoutes, { GetAppRoutes } from "./routes/appRoutes";
import SidebarItemCollapse from "./sideBarItemCollapse";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BugReportIcon from '@mui/icons-material/BugReport';
import { GetInvitationGuestUser } from "../../redux/selectors/invitationSelectors";
import { GetCurrentUser } from "../../redux/selectors/userSelectors";
import { getAppRoutes } from "./routes/appRoutes";
import { useEffect } from "react";
import { GetTokenUser } from "../../redux/selectors/userSelectors";

// Assuming you have already created your MUI theme.
const theme = createTheme({
  
  breakpoints: {
    values: {
      // Par exemple, utilisez 600 ou une autre valeur qui convient mieux à votre conception
      xs: 820, // Par exemple, utilisez 600 ou une autre valeur qui convient mieux à votre conception
      sm: 960,
      md: 1280,
      lg: 1920,
      xl: 2560,

    },
  },
}); // Make sure to import your actual theme.

const sizeConfigs = {
  sidebar: {
    width: "12%",
    mobileWidth: "7%", // Vous pouvez ajuster cette valeur en fonction de la taille de l'iPad
  },
  // ...
};
export const Sidebar = () => {
  
  const appRoutes = GetAppRoutes()
  const currentUser = GetCurrentUser()
  console.log(currentUser)
  const largeurEcran = window.innerWidth;
  const hauteurEcran = window.innerHeight;
  console.log(`Largeur de l'écran : ${largeurEcran}`);
  console.log(`Hauteur de l'écran : ${hauteurEcran}`);
  const getInviation = GetInvitationGuestUser()
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ThemeProvider theme={theme}>
      
      <Drawer
        variant={isSmallerScreen ? "temporary" : "permanent"}
        sx={{
          width: isSmallerScreen ? sizeConfigs.sidebar.mobileWidth : sizeConfigs.sidebar.width,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSmallerScreen ? sizeConfigs.sidebar.mobileWidth : sizeConfigs.sidebar.width,
            boxSizing: "border-box",
            borderRight: "0px",
            backgroundColor: colorConfigs.sidebar.bg,
            color: colorConfigs.sidebar.color
          }
        }}
        onClose={() => {}}
        onOpen={() => {}}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <List disablePadding>
          
        

        <BugReportIcon style={{fontSize: 50, marginTop: 20}}/>
          <Typography fontSize={"1.2rem"} variant="body2">T R Λ C K E R S</Typography>

         
          <Toolbar sx={{ marginBottom: "10px" , marginRight: '50px'}}>
            <Stack
              sx={{ width: '100%' }}
              direction="row"
              justifyContent="center"
            >
              {/* Add any additional content you want in the Toolbar */}
            </Stack>
          </Toolbar> 
         
          {appRoutes?.map((route, index) => (
            
            route.sidebarProps ? (
              route.child ? (
                <SidebarItemCollapse item={route} key={index} />
              ) : (
                <SidebarItem item={route} key={index} />
              )
            ) : null
          
          ))}

         
        
      
         
        </List>
      </Drawer>
    </ThemeProvider>
  );
};