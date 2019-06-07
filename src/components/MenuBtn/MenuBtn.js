
import React from 'react'
import styles from './MenuBtn.module.css';

const Menubtn = props => {
  const activeStyle = props.active ? "Active" : "Off";
  const btnStyles = props.anim ? `${styles.Menubtn} ${styles[props.anim]} ${styles[activeStyle]}` : `${styles.Menubtn} ${styles[activeStyle]}`;
  return (
      <div className={btnStyles} onClick={props.click}>
          <div className={styles.Menubtnbox}>
              <div className={styles.Menubtninner}></div>
          </div>
      </div>
  )
}

export default Menubtn