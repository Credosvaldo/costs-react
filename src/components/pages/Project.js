import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import ProjectForm from '../projects/ProjectsForm'
import Container from '../layouts/Container'
import Loading from '../layouts/Loading'
import Message from '../layouts/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {

    const { id } = useParams()
    const [project, setProject] = useState({})
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const [showServiceForm, setShowServiceForm] = useState(false)

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
                    //setServices(data.services)
                })
                .catch(err => console.log(err))

        }, 300);

    }, [id])

    function createService(project) {
        const lastService = project.services[project.services.length - 1]
    

    
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.orcamento)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false

        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)

        })
        .then(resp => resp.json())
        .then(data => {
            setProject({...project, ['services']: data.services})
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))
    
    }

    function removeService(id, cost) {
        const serviceUpdate = project.services.filter(service => service.id != id)

        const projectUpdate = project

        projectUpdate.services = serviceUpdate
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

        setProject({})
        setMessage('')

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdate)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log("Atualizando")
            setProject(projectUpdate)
            setMessage('Serviço removido')
            setType('success')
        })
        .catch(err => console.log(err))

    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function updateProject(project) {
        setMessage('')

        if (project.orcamento < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto')
            setType('error')
            return false
        }

        console.log("Updating")

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(resp => resp.json())
            .then(data => {
                setMessage('Projeto atualizado com sucesso')
                setProject(data)
                setShowProjectForm(false)
                console.log('menssagme alterada para')
                console.log(message)
                console.log("menssagem imprimida")
                setType('success')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_details}>
            {
                project.nome ?
                    <Container customClass='column' >
                        {message && <Message msg={message} type={type} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.nome}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm} >
                                {showProjectForm ? 'Fechar' : 'Editar Projeto'}
                            </button>

                            {showProjectForm ? (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubimit={updateProject} btnText='Atualizar Projeto' projectData={project} />
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

                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm} >
                                {showServiceForm ? 'Fechar' : 'Adicionar Evento'}
                            </button>

                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm handlSubmit={createService} btnText={'Adicionar Serviço'} projectData={project} />
                                )}

                            </div>

                        </div>

                        <h2>Servicos</h2>
                        <Container customClass='start'>
                            {project.services.length > 0 ? project.services.map(service => 
                                <ServiceCard id={service.id} name={service.name} cost={service.cost} description={service.description} key={service.id} handleRemove={removeService} />
                            ) : (
                                <p>Não há serviços cadastrados</p>
                            )}
                        </Container>

                    </Container>
                    :
                    <Loading />

            }

        </div>
    )
}

export default Project