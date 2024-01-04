import styles from './NewProjects.module.css'

import ProjectForm from '../projects/ProjectsForm'

function NewProject() {

    return (
        <div className={styles.newProject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar aos serviços</p>
            <ProjectForm />


        
        </div>
    )
}

export default NewProject