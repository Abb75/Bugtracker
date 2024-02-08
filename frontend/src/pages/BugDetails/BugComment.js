import { useState, useRef, useEffect } from "react";
import { Box,Card,CardContent,Grid,Avatar, Container, Paper , Typography, TextField, styled, IconButton} from "@mui/material"
import SendIcon from "@mui/icons-material/Send";
import { json, useParams } from "react-router-dom"
import { DeleteBugCommentApi, GetBugCommentsApi, GetBugHistoryApi, PostBugCommentApi, selectedBug } from "../../redux/actions/bugActions"
import { useDispatch } from "react-redux"
import { Allbug, BugProject } from "../../redux/selectors/bugSelectors"
import { all } from "axios"
import { BugHistory } from "../../redux/selectors/bugSelectors"
import { Clear, ReplayCircleFilled } from "@mui/icons-material"
import { GetBugProjectApi } from "../../redux/actions/bugActions"
import { GetBugCommentApi } from "../../redux/actions/bugActions";
import { GetCurrentUser, GetTokenUser } from "../../redux/selectors/userSelectors";
import { BugCommentData } from "../../redux/selectors/bugSelectors";
import ClearIcon from '@mui/icons-material/Clear';

// ...






export const BugComment = () => {

    const formattedDate = new Date().toISOString().split('T')[0];
    const currentUser = GetCurrentUser()
    //const tokenUser = localStorage.getItem('access_token')
    const tokenUser = GetTokenUser()  

    const dispatch = useDispatch()
    const divRef = useRef(null);
    const {projectId, bugId} = useParams()
    const comments = BugCommentData()
    const [commentsList, setCommentsList] = useState([]);
    const [description, setDescription] = useState('');

    const initialFormData = {
        related_bug: bugId,
        created_by: currentUser.id,
        created_at: formattedDate,
        description: ''
       
        
      };
      const [formData, setFormData] = useState(initialFormData);
    


    useEffect(() => {
          dispatch(GetBugCommentsApi(projectId, bugId, tokenUser))
    }, [projectId, bugId])
  

    useEffect(() => {
  
        setCommentsList(comments);
       
      
      }, [comments]);

      const deleteComment =  (commentId) => {
         try{
            DeleteBugCommentApi(projectId, bugId, commentId, tokenUser)
            

         }
         catch(error){
          console.error(error)
         }
      }

      const createComment = async(formData) => {
        console.log(formData)
        try {
           await PostBugCommentApi(projectId, bugId, formData, tokenUser  )
           await dispatch(GetBugCommentsApi(projectId, bugId, tokenUser));
           // Remplacez "comments-container" par l'ID ou la référence de votre conteneur de commentaires
         
           divRef.current && scrollToBottom();
        }
        catch(error){
          console.error(error)
        }
        setDescription('')
      }
      
      const  scrollToBottom = () =>{
        divRef.current?.scrollIntoView({ behavior: 'auto' });
      }
      
      const handleCommentSubmit = async (e) => {
        e.preventDefault();
        console.log(description);
      
       
        const updatedFormData = {
          ...formData,
          description: description,
        };
      
        createComment(updatedFormData);
      }
      
      const handleCommentChange = (e) => {
        console.log(e.target.value)
        setDescription(e.target.value);
        
      
        }
      
      
      



return (

    <Container maxWidth="lg" >

      

      <Box display="flex" justifyContent="space-between" marginTop="5px" marginBottom="10px"  marginLeft='-23px' width={'200%'}>
      <Card ref={divRef} elevation={2} style={{ width: '65%', height:'74%',overflowY: 'auto' }}>
          <CardContent>
            <Typography style={{marginBottom: '40px'}} variant="h5" gutterBottom>
              <strong>Comment(s) :</strong> 
            
            </Typography>
            {commentsList?.map((comment) => (
          <div key={comment.created_by_name} style={{ marginBottom: '20px' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={1}>
              <Avatar>ded</Avatar> 
            </Grid>
           {currentUser.email === comment.created_by_name ? ( 
            <Grid item xs={1} style={{ textAlign: 'right', marginLeft: '520px' }}>
            <IconButton onClick={() => deleteComment(comment.id)}>
              <ClearIcon color="error" fontSize="medium" />
            </IconButton>
          </Grid>) : (null) }
        
            <Grid item xs={11}>
              
              <Typography variant="title" style={{ marginRight: '480px'  }}>
                {comment.created_by_name}
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography style={{textAlign: 'left', marginTop: '10px'}}  variant="subtitle2">
                {comment.description}
              </Typography>
              </Grid> 
               <Grid item xs={12}>
              <div style={{ textAlign: 'right', color: '#888888' }}>
                <Typography variant="subtitle2">{comment.created_at}</Typography>
              </div>
            </Grid>
          </Grid>
          <hr style={{ marginTop: '10px', marginBottom: '10px', borderColor: '#ddd' }} />
        </div>
        
         
         
            ))}
               <form  onSubmit={handleCommentSubmit}> 
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <Avatar>ded</Avatar>
        </Grid>
        <Grid  item xs={9}>
          <TextField
            style={{marginTop: '40px'}}
            multiline
            fullWidth
            rows={3}
            variant="outlined"
            label="Votre commentaire"
            value={description}
            onChange={handleCommentChange}
          />
        </Grid> 
        <IconButton  
            color="primary"
            style={{marginTop: '140px'}}
            type="submit"
            onClick={() => handleCommentSubmit()}
          >
            <SendIcon  />
          </IconButton>
        <Grid  item xs={2}>
        
        </Grid>
      </Grid>
    </form>
            
          </CardContent>
        </Card>



      </Box>
    </Container>
  );
            }