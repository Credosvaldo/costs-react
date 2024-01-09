import styless from './ProjectsFrom.module.css'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import { useEffect, useState } from 'react'

function ProjectForm({btnText, handleSubimit, projectData}) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch(`http://localhost:5000/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => setCategories(data))
        .catch(err => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        console.log(project)
        handleSubimit(project)

    }

    function handleChange(e) {
        setProject({...project, [e.target.name] : e.target.value})
    }

    function handleSelect(e) {
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
    }

    return (
        <form className={styless.form} onSubmit={submit}>
            <Input name={"nome"} placeholder={"Incira o nome do projeto"} text={"Nome:"} type={"text"} handleOnChange={handleChange} value={project.nome} />

            <Input name={"orcamento"} placeholder={"Incira o orçamento total"} text={"Orçamento:"} type={"number"} handleOnChange={handleChange} value={project.orcamento}/>

            <Select name={"category_id"} text={"Selecione a categoria:"} options={categories} handleOnChange={handleSelect} value={project.category ? project.category.id : ''} />

            <SubmitButton text={btnText} />

        </form>
    )

}

export default ProjectForm