import './App.css';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import React from 'react';
import Footer from './components/Footer';
import Home from './components/Home';
import CreateProject from './components/CreateProject';
import ProjectMemberView from './components/ProjectMemberView';
import AnonymousIdeas from './components/AnonymousIdeas';
import LoginPage from './components/LoginPage';
import ProjectList from './components/ProjectList';
import AddIdea from './components/AddIdea';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import OwnerProject from './components/OwnerProject';
import MemberProject from './components/MemberProjects';
import GraphicalFilter from './components/GraphicalFilter';
function App() {
  const [menu, setMenu] = useState([
    {
      id: 1,
      name: "Home",
      sectonId: "#section1",
      link: "/",
      submenu: []
    },
    {
      id: 2,
      name: "Create Project",
      sectonId: "#section2",
      link: "/createproject",
      submenu: []
    },
    {
      id: 3,
      name: "Anomyous Ideas",
      sectonId: "#section4",
      link: "/anonymousideas",
      submenu: []
    },
    {
      id: 4,
      name: "My Project",
      sectonId: "#section6",
      link: "/myproject",
      submenu: [
        {
          id: 41,
          name: "Owner",
          sectonId: "#section6",
          link: "/ownerproject",
        }, {
          id: 42,
          name: "Member",
          sectonId: "#section6",
          link: "/memberproject",
        }
      ]
    },
    {
      id: 5,
      name: "Add Ideas",
      sectonId: "#section6",
      link: "/addidea",
      submenu: []
    },
    {
      id: 6,
      name: "Graphical Filter",
      sectonId: "#section6",
      link: "/graphicalfilter",
      submenu: []
    }
  ])

  useEffect(() => {
    axios.get("http://localhost:8080/custom/api/projects/currUser", { headers: { "Access-Control-Allow-Origin": "*" } }).then(response => {
      console.log(response.data)
      localStorage.setItem('auth', JSON.stringify(response.data))
    })
  }, []);
  const [mobileMenu, setMobileMenu] = useState(false)
  const toggleMobilemenu = () => {
    setMobileMenu(!mobileMenu)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if ((window.screen.width >= 950)) {
        setMobileMenu(true)
      }
    }, 1);
    return () => clearTimeout(timer);
  }, []);

  const [projectFetch, setProjectFetch] = useState([])

  const con_url = "http://localhost:8080/"

  useEffect(() => {
    const url = con_url + "projects";
    axios.get(url).then(response => {
      if (response !== null && typeof response !== 'undefined') {
        if (response.data !== null && typeof response.data !== 'undefined') {
          if (response.data._embedded !== null && typeof response.data._embedded !== 'undefined') {
            setProjectFetch(response.data._embedded.projects)
          }
        }
      }
    })

  }, [projectFetch])


  return (
    <>
      {
        //(JSON.parse(localStorage.getItem('auth')))?(JSON.parse(localStorage.getItem('auth')).id?<>
        true?(true?<>
        <Router>
          <Header menu={menu} mobileMenu={mobileMenu} toggleMobilemenu={toggleMobilemenu} />
          <Routes>
            <Route exact path='/graphicalfilter' element={<GraphicalFilter con_url={con_url} />}></Route>
            <Route exact path='/' element={< Home projects={projectFetch} />}></Route>
            <Route exact path='/ownerproject' element={<OwnerProject con_url={con_url} />}></Route>
            <Route exact path='/memberproject' element={<MemberProject con_url={con_url} />}></Route>
            <Route exact path='/anonymousideas' element={<AnonymousIdeas con_url={con_url} />}></Route>
            <Route exact path='/createproject' element={<CreateProject con_url={con_url} />}></Route>
            <Route exact path='/addidea' element={<AddIdea con_url={con_url} />}></Route>
            {projectFetch.map((project) => (
              <Route
                key={project.id}
                exact
                path={"/" + project.id}
                element={< ProjectMemberView pid={project.id} con_url={con_url} key={project.id} />}>
              </Route>
            ))}
          </Routes>

          <Footer />

        </Router></>:<LoginPage />):<LoginPage/>
      }
      
    </>
  );
}

export default App;


//