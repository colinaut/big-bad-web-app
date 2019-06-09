import React, {useState, Fragment} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import styles from './Navbar.module.css';
import MenuBtn from '../MenuBtn';
import Slidedrawer from '../Sidedrawer';
import Nav from '../Nav'

const Navbar = props => {

  const [menuToggle, setMenuToggle] = useState(false);

  const toggleMenu = () => setMenuToggle( menuToggle => !menuToggle )

  return (
    <Fragment>
      <div className={styles.Navbar}>
        <div className={styles.LogoWrapper}>
          <h1 className={styles.Title}>{props.title}</h1>
        </div>
        {props.authStatus ? <div className={styles.LogoutWrapper}><button className={styles.LogoutButton} onClick={props.logout}>Logout</button></div> : null}
        <div className={styles.NavWrapper}>
          <Nav sections={props.sections}/>
        </div>
        <div className={styles.HamburgerWrapper}>
          <MenuBtn click={toggleMenu} active={menuToggle} anim="Squeeze" />
        </div>
      </div>
      <Slidedrawer showMenu={menuToggle} closeBtn={toggleMenu} sections={props.sections} /> 
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
      authStatus: state.authStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)