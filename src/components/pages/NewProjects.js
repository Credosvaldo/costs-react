import styles from './NewProjects.module.css'

import ProjectForm from '../projects/ProjectsForm'

import { useNavigate } from 'react-router-dom';

function NewProject() {

    const history = useNavigate()

    function createPost(project) {

        project.cost = 0
        project.services = []

        console.log('funcao do create mesmo post')
        console.log(project)
        console.log(JSON.stringify(project))

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            history('/projects', {state: {message: 'Projeto criado com sucesso'}})
        })
        .catch(err => console.log(err))

    }

    function updateProject() {

    }

    return (
        <div className={styles.newProject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar aos serviços</p>
            <ProjectForm handleSubimit={createPost} btnText='Criar Projeto' />


        
        </div>
    )
}

export default NewProject