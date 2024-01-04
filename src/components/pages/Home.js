import styles from './Home.module.css'
import saving from '../../img/savings.svg'

import LinkButton from '../layouts/LinkButton'

function Home() {

    return (
        <section className={styles.home_container}>
            <h1>
                Bem vindo ao <span>Costs</span>
            </h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <LinkButton text={"Criar Projeto"} to={"/newProject"} />
            <img src={saving} alt="savings" />

        </section>
    )
}

export default Home