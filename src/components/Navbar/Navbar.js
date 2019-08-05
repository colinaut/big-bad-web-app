import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import React, {Fragment} from 'react';
import useToggle from 'react-use-toggle';

import Auth from '../Auth';
import Button from '../Button';
import MenuBtn from '../MenuBtn';
import Nav from '../Nav';
import Slidedrawer from '../Sidedrawer';
import AccountInfo from '../AccountInfo';
import { ReactComponent as Logo } from '../../assets/Big-Bad-Con-Logo.svg';

import styles from './Navbar.module.css';

const AuthPanel = ({show,close,authStatus}) => {
  return show ? (
    <div className={styles.AuthPanel}>
      {authStatus ? <AccountInfo close={close} /> : <Auth submitCallback={close} />  }
    </div>
  ) : null
}

const Navbar = props => {

  const [menuToggle, toggleMenu] = useToggle(false);
  const [authPanelToggle, toggleAuthPanel] = useToggle(false);

  return (
    <Fragment>
      <div className={styles.Navbar}>
        <div className={styles.LogoWrapper}>
          <Link to='/'><Logo className={styles.Logo} /></Link>
        </div>
        <div className={styles.Login}>
          {props.authStatus ? <Button style={{float:'left'}} clicked={toggleAuthPanel}>My Account</Button> : <Button style={{float:'left'}} clicked={toggleAuthPanel}>Login</Button> }
        </div>
  
        <div className={styles.NavWrapper}>
          <Nav sections={props.sections}/>
        </div>
        
        <div className={styles.HamburgerWrapper}>
          <MenuBtn click={toggleMenu} active={menuToggle} anim="Squeeze" />
        </div>
      </div>
      <AuthPanel show={authPanelToggle} close={toggleAuthPanel} authStatus={props.authStatus} />
      <Slidedrawer showMenu={menuToggle} closeBtn={toggleMenu} sections={props.sections} /> 
    </Fragment>
  )
}

const mapStateToProps = ({auth}) => {
  return {
      authStatus: auth.authStatus
  }
}

export default connect(mapStateToProps)(Navbar)