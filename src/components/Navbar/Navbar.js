import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import React, {Fragment} from 'react';
import useToggle from 'react-use-toggle';

import Auth from '../Auth';
import MenuBtn from '../MenuBtn';
import Nav from '../Nav';
import Slidedrawer from '../Sidedrawer';
import AccountInfo from '../AccountInfo';
import { ReactComponent as Logo } from '../../assets/Big-Bad-Con-Logo.svg';
import forestBackground from '../../assets/forest-background.png'
import CloseAccordianBtn from '../CloseAccordianBtn'

import styles from './Navbar.module.css';

const AuthPanel = ({show,close,authStatus}) => {
  return show ? (
    <div className={styles.AuthPanel}>
      {authStatus ? <AccountInfo close={close} /> : <Auth submitCallback={close} />  }
      <CloseAccordianBtn close={close} color='Blue'/>
    </div>
  ) : null
}

const Navbar = props => {

  const [menuToggle, toggleMenu] = useToggle(false);
  const [authPanelToggle, toggleAuthPanel] = useToggle(false);

  const navBarStyle = {
    backgroundImage: `url(${forestBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <Fragment>
      <div className={styles.Navbar} style={navBarStyle}>
        <div className={styles.LogoWrapper}>
          <Link to='/'><Logo className={styles.Logo} /></Link>
        </div>
        <div className={styles.Login}>
          {props.authStatus ? <button className={styles.AccountBtn} onClick={toggleAuthPanel}>My Account</button> : <button className={styles.AccountBtn} onClick={toggleAuthPanel}>Login</button> }
        </div>
  
        { (props.menu && props.menu.slug) ? 
          <Fragment>
            <div className={styles.NavWrapper}>
              <Nav sections={props.sections}/>
            </div>
            
            <div className={styles.HamburgerWrapper}>
              <MenuBtn click={toggleMenu} active={menuToggle} anim="Squeeze" />
            </div>
          </Fragment>
          : null
        }
      </div>
      <AuthPanel show={authPanelToggle} close={toggleAuthPanel} authStatus={props.authStatus} />
      { (props.menu && props.menu.slug) ? <Slidedrawer showMenu={menuToggle} closeBtn={toggleMenu} sections={props.sections} /> : null }
    </Fragment>
  )
}

const mapStateToProps = ({auth,pages}) => {
  return {
      authStatus: auth.authStatus,
      menu: pages.menu
  }
}

export default connect(mapStateToProps)(Navbar)