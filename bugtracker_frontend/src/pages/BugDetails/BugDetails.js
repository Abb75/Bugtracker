
import { Box,Card,CardContent,Grid,Avatar, Container, Paper , Typography, TextField, styled, IconButton} from "@mui/material"
import SendIcon from "@mui/icons-material/Send";
import { BugComment } from "./BugComment";
import { useEffect, useState, useRef } from "react"
import { json, useParams } from "react-router-dom"
import { GetBugCommentsApi, GetBugHistoryApi, selectedBug } from "../../redux/actions/bugActions"
import { useDispatch } from "react-redux"
import { Allbug, BugProject } from "../../redux/selectors/bugSelectors"
import { all } from "axios"
import { BugHistory } from "./BugHistory";
import { ReplayCircleFilled } from "@mui/icons-material"
import { GetBugProjectApi } from "../../redux/actions/bugActions"
import { AddBugCommentApi } from "../../redux/actions/bugActions";
import { GetCurrentUser } from "../../redux/selectors/userSelectors";
import { BugDescription } from "./BugDescription";
import './BugDetails.css'

export const BugDetails = () => { 

      return (
        <Container id='BugDetails' maxWidth="lg">
          
            <BugDescription/>
            <Box display="flex" justifyContent="space-between" marginTop="20px" marginBottom="20px">
              <BugComment  />
              <BugHistory/>
            </Box>

        </Container>
      );
    }