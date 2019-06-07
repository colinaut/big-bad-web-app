import React, {useState, Fragment} from 'react'
import styles from './Navbar.module.css';
import MenuBtn from '../MenuBtn';
import Slidedrawer from '../Sidedrawer'

const Navbar = props => {

  const [menuToggle, setMenuToggle] = useState(false);

  const toggleMenu = () => setMenuToggle( menuToggle => !menuToggle )

  return (
    <Fragment>
      <div className={styles.Navbar}>
        <MenuBtn click={toggleMenu} active={menuToggle} anim="Squeeze" />
        <h1 className={styles.Title}>{props.title}</h1>
        
      </div>
      <Slidedrawer showMenu={menuToggle} closeBtn={toggleMenu} sections={props.sections} /> 
    </Fragment>
  )
}

export default Navbar