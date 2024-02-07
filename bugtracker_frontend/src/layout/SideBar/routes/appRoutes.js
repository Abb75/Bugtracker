//import { RouteType } from "./config";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import GroupsIcon from '@mui/icons-material/Groups';
import ErrorIcon from '@mui/icons-material/Error';
import HomeIcon from '@mui/icons-material/Home';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

import { GetCurrentUser } from '../../../redux/selectors/userSelectors';
import { useEffect, useState } from 'react';
import { GetInvitationUser } from '../../../redux/actions/invitationActions';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { GetInvitationGuestUser } from '../../../redux/selectors/invitationSelectors';


// Importez les icônes et d'autres dépendances nécessaires

export const GetAppRoutes = () => {
  const invitationUser = GetInvitationGuestUser()
  console.log(invitationUser)
  const currentUser = GetCurrentUser()
  const isAdminUser = (currentUser?.groups && currentUser.groups[0] === 'admin') || null;
  console.log(currentUser
  )
  // Définissez les routes en fonction de currentUser
  const appRoutes = [

    {
      index: true,
      state: "home"
    },
     {
  
      path: "/dashboard",
      state: "installation",
      sidebarProps: {
        displayText: "Home",
        icon: <HomeIcon />
      }
    },
    {
      path: "/invitation",
      state: "installation",
      sidebarProps: {
        displayText:  'Invitation',
        icon: (
          invitationUser?.length > 0 ? (
            <Badge badgeContent={invitationUser.length} color="error">
              <ForwardToInboxIcon />
            </Badge>
          ) : (
            <ForwardToInboxIcon />
          )
        )
      }
    }
    
    ,
  
  
    {
      path: "/add-project",
      state: "component",
      sidebarProps: {
        displayText: "Project",
        icon: <GroupsIcon />
      },
      child: isAdminUser   ? [
      
        {
          path: "/guests",
          state: "component.button",
          sidebarProps: {
            displayText: "Members"
          }
        },
        {
          path: "/project",
          state: "component.button",
          sidebarProps: {
            displayText: "Projects"
          }
        },
         {
          path: "/archived-project",
          state: "component.button",
          sidebarProps: {
            displayText: "Archived"
          },
        },
      
      ] : [

        {
          path: "/project",
          state: "component.button",
          sidebarProps: {
            displayText: "Projects"
          }
        },


      ]
    },
  
    {
      path: "/component",
      state: "component",
      sidebarProps: {
        displayText: "Bug",
        icon: <ErrorIcon/>
      },
      child: [
      
       
      {
        path: "/archived-bug",
        state: "component.button",
        sidebarProps: {
          displayText: "Archived"
        },
      },
      ]
    },
   
  
  ];

  return appRoutes;
};




