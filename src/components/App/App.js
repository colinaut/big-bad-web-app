import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import React, {useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from '../Layout';
import Navbar from '../Navbar';
import Events from '../Events';
import Pagewrapper from '../Pagewrapper';
import ContentPage from '../ContentPage'
import {slugify} from '../../util/helpers'

const App = props => {

  const {menu,fetchMenus} = props

  let sections = [
    {name: "events", title:"Events", path: "/", component: <Events/>},
  ]
  
  if (menu && menu.items) {
    menu.items.forEach(item => {
      sections = [ ...sections, {
        name: slugify(item.title),
        title: item.title,
        path: `/${slugify(item.title)}`,
        component: <ContentPage id={item.object_id} title={item.title} />
      }]
    })
  }
  
  const routes = sections.map((section) => {
    return <Route key={section.name} path={section.path} exact>{section.component ? section.component : section.title}</Route>
  })

  useEffect(()=>{
    if (!menu) fetchMenus('mobile');
  },[menu,fetchMenus])

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

const mapStateToProps = ({pages}) => {
  return {
    menu: pages.menu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMenus: (payload) => dispatch(actions.fetchMenus(payload))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)