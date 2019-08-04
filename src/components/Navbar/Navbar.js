import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import React, {Fragment} from 'react';
import useToggle from 'react-use-toggle';

import * as actions from '../../store/actions';
import Auth from '../Auth';
import Button from '../Button';
import MenuBtn from '../MenuBtn';
import Nav from '../Nav';
import Slidedrawer from '../Sidedrawer';
import { ReactComponent as Logo } from '../../assets/Big-Bad-Con-Logo.svg';

import styles from './Navbar.module.css';

const AuthPanel = props => {
  return props.show ? <div className={styles.AuthPanel}><Auth submitCallback={props.close} /></div> : null
}

const Navbar = props => {

  const [menuToggle, toggleMenu] = useToggle(false);
  const [loginToggle, toggleLogin] = useToggle(false);

  return (
    <Fragment>
      <div className={styles.Navbar}>
        <div className={styles.LogoWrapper}>
          <Link to='/'><Logo className={styles.Logo} /></Link>
        </div>
        <div className={styles.Login}>
          {props.authStatus ? <Button style={{float:'left'}} clicked={props.logout}>Logout</Button> : <Button style={{float:'left'}} clicked={toggleLogin}>Login</Button> }
        </div>
  
        <div className={styles.NavWrapper}>
          <Nav sections={props.sections}/>
        </div>
        
        <div className={styles.HamburgerWrapper}>
          <MenuBtn click={toggleMenu} active={menuToggle} anim="Squeeze" />
        </div>
      </div>
      <AuthPanel show={loginToggle} close={toggleLogin} />
      <Slidedrawer showMenu={menuToggle} closeBtn={toggleMenu} sections={props.sections} /> 
    </Fragment>
  )
}

const mapStateToProps = ({auth}) => {
  return {
      authStatus: auth.authStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)