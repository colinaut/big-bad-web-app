
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from '../Layout';
import Navbar from '../Navbar';
import Blog from '../Blog';
import Home from '../Home'
import Events from '../Events';
import Pagewrapper from '../Pagewrapper'

const sections = [
  {name: "home", title:"Home", path: "/", component: <Home/>},
  {name: "events", title:"Events", path: "/events", component: <Events/>},
  {name: "blog", title:"Blog", path: "/blog", component: <Blog/> }
]

const routes = sections.map((section) => {
  return <Route key={section.name} path={section.path} exact>{section.component ? section.component : section.title}</Route>
})

const App = props => {  

  return (
    <Layout>
      <Router>
      <Navbar sections={sections} title="Big Bad Con"/>
      <Pagewrapper>
        <Switch>
          {routes}
        </Switch>
      </Pagewrapper> 
      </Router>
    </Layout>
  )
}

export default App