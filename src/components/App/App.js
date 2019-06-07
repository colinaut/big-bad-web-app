
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from '../Layout';
import Navbar from '../Navbar';
import Blog from '../Blog'

const sections = [
  {name: "home", title:"Big Bad Con", path: "/"},
  {name: "games", title:"Games", path: "/games"},
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
        <Switch>
          {routes}
        </Switch>
      </Router>
    </Layout>
  )
}

export default App