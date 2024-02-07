import { useSelector } from "react-redux"


// Créez une fonction personnalisée pour extraire la propriété 'bugProject'
export const BugProject = () => {
  return  useSelector(state => state.bugProject.bugProject);

};

// Créez une fonction personnalisée pour extraire la propriété 'bugProject'
export const Allbug= () => {
  return useSelector(state => state.bug.bug);
};

export const BugHistoryData = () => {
  return useSelector(state => state.bugHistory.bugHistory[0]);
};

export const BugCommentData= () => {
  return useSelector(state => state.bugComment.bugComment);
}

export const SelectedBug = () => {
  return useSelector(state => state.selectedBug.selectedBug);

}

export const GetBugArchived = () => {
  return useSelector(state => state.archivedBug.archivedBug);

}