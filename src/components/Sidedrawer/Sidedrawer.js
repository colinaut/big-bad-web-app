
import React, {Fragment} from 'react'

import Backdrop from '../Backdrop';
import Nav from '../Nav';

import styles from './Sidedrawer.module.css';

const Sidedrawer = props => {

  return (
    <Fragment>
      <div className={`${styles.Sidedrawer} ${props.showMenu ? styles.Open : styles.Close}`}>
          <Nav sections={props.sections} close={props.closeBtn}/>
      </div>
      <Backdrop show={props.showMenu} close={props.closeBtn}/>
    </Fragment>
  )
}

export default Sidedrawer