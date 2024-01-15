import styles from '../projects/ProjectsFrom.module.css'

import { useState } from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import Project from '../pages/Project'



function ServiceForm({ handlSubmit, btnText, projectData }) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()

        const servicesLength = projectData.services.length
        service.id = servicesLength > 0 ? projectData.services[servicesLength - 1].id + 1 : 1
        projectData.services.push(service)
        handlSubmit(projectData)

    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <Input type={'text'} text={'Nome do serviço'} name={'name'} placeholder={'Insira o nome do serviço'} handleOnChange={handleChange} value={service.name} />
            <Input type={'number'} text={'Custo do serviço'} name={'cost'} placeholder={'Insira o nome valor total'} handleOnChange={handleChange} value={service.cost} />
            <Input type={'text'} text={'Descrição do serviço'} name={'description'} placeholder={'Insira a descrição do serviço'} handleOnChange={handleChange} value={service.description} />

            <SubmitButton text={btnText} />
        </form>
    )
}

export default ServiceForm