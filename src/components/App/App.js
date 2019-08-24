
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from '../Layout';
import Navbar from '../Navbar';
import CommunityStandards from '../CommunityStandards';
import Events from '../Events';
import Pagewrapper from '../Pagewrapper'

const sections = [
  {name: "events", title:"Events", path: "/", component: <Events/>},
  {name: "community-standards", title:"Community Standards", path: "/community", component: <CommunityStandards/> }
]

const routes = sections.map((section) => {
  return <Route key={section.name} path={section.path} exact>{section.component ? section.component : section.title}</Route>
})

const App = props => {  

  return (
    <Layout>
      <Router>
      <Navbar sections={sections} />
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