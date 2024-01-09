import styles from './Projects.module.css'

import Message from '../layouts/Message'
import Container from '../layouts/Container'
import Loading from '../layouts/Loading'
import LinkButton from '../layouts/LinkButton'
import ProjectCard from '../projects/ProjectCard'

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'



function Projects() {
    
    const [projects, setProjects] = useState([])
    const [removeLoader, setRemoveLoader] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    useEffect(() => {

        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setProjects(data)
                setRemoveLoader(true)
            })
            .catch(err => console.log(err))
        }, 300)



    }, [])

    const location = useLocation()
    let message = location.state ? location.state.message : ''

    function removeProject(id) {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }

        })
        .then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter(project => project.id != id))
            setProjectMessage("Projeto removido com sucesso!")
        })
        .catch(err => console.log(err))

    }


    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to={"/newproject"} text={"Criar Projetos"} />
            </div>

            {
                message && <Message msg={message} type={'success'} />
            }
            
            {
                projectMessage && <Message msg={projectMessage} type={'success'} />
            }
            
        
            <Container customClass='start'>
                {
                    projects.length > 0 && 
                    projects.map(project => {
                       return (<ProjectCard id={project.id} name={project.nome} budget={project.orcamento} category={project.category.name} key={project.id} handleRemove={removeProject} />)
                    })
                }
                {!removeLoader && <Loading/>}
                {removeLoader && projects.length == 0 && (
                    <h3>Não há projetos cadastrados</h3>
                )}
            </Container>
        
        </div>
    )
}   

export default Projects