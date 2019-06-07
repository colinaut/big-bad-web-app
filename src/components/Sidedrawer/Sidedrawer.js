
import React, {Fragment} from 'react'
import styles from './Sidedrawer.module.css';
import Backdrop from '../Backdrop';
import { NavLink } from "react-router-dom";
import Nav, {Navitem} from '../Nav';

const Sidedrawer = props => {

  const navClick = () => {
    if (props.showMenu) {
      props.closeBtn()
    }
  }

  return (
    <Fragment>
      <div className={`${props.showMenu ? styles.Open : styles.Close} ${styles.Sidedrawer}`}>
          <Nav>
            {props.sections.map((section, i) => <Navitem key={i}><NavLink to={section.path} onClick={navClick}>{section.title}</NavLink></Navitem>)}
          </Nav>
      </div>
      <Backdrop show={props.showMenu} close={props.closeBtn}/>
    </Fragment>
  )
}

export default Sidedrawer