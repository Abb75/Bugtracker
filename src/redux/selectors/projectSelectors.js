import { useSelector } from "react-redux";



export const ProjectDetailsData = () => {
    return useSelector(state => state.projectDetails.projectDetails)
}

export const ListProjectByUser = () => {
    return useSelector(state => state.project.project)
}

export const ArchivedProjectData = () => {
    return useSelector(state => state.archivedProject.archivedProject)
}