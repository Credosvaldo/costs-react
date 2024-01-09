import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import ProjectForm from '../projects/ProjectsForm'
import Container from '../layouts/Container'
import Loading from '../layouts/Loading'

function Project() {

    const { id } = useParams()
    const [project, setProject] = useState({})
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(() => {

        setTimeout(() => {

            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    setProject(data)
                })
                .catch(err => console.log(err))

        }, 300);

    }, [id])

    function toggleProjectForm(e) {
        e.preventDefault()
        setShowProjectForm(!showProjectForm)


    }

    function updateProject() {

    }

    return (
        <div className={styles.project_details}>
            {
                project.nome ?
                    <Container customClass='column' >
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.nome}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm} >
                                {showProjectForm ? 'Fechar' : 'Editar Projeto'}
                            </button>

                            {showProjectForm ? (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubimit={updateProject} btnText='Atualizar Projeto' />
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span> {project.category.name}
                                    </p>

                                    <p>
                                        <span>Total Orçamento: </span> R${project.orcamento}
                                    </p>

                                    <p>
                                        <span>Total ultilizado</span> R${project.cost}
                                    </p>

                                </div>
                            )}
                        </div>


                    </Container>
                    :
                    <Loading />

            }

        </div>
    )
}

export default Project