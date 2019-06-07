import React, {useState, Fragment} from 'react'
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
        <div className={styles.Logo}>
          <h1 className={styles.Title}>{props.title}</h1>
        </div>
        <div className={styles.Nav}>
          <Nav sections={props.sections}/>
        </div>
        <div className={styles.Hamburger}>
          <MenuBtn click={toggleMenu} active={menuToggle} anim="Squeeze" />
        </div>
      </div>
      <Slidedrawer showMenu={menuToggle} closeBtn={toggleMenu} sections={props.sections} /> 
    </Fragment>
  )
}

export default Navbar