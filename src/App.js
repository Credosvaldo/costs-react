import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProjects';
import Container from './components/layouts/Container';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Container customClass={"min_height"}>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/contact' Component={Contact} />
          <Route path='/company' Component={Company} />
          <Route path='/projects' Component={Projects} />
          <Route path='/newProject' Component={NewProject} />
          <Route path='/project/:id' Component={Project} />
          
        </Routes>
      </Container>

      <Footer />

    </BrowserRouter>

  );
}

export default App;
