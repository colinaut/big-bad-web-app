
import React from 'react'
import styles from './FavStar.module.css';

const Favstar = props => {
  return (
    <div className={styles.FavstarWrapper}>
      <svg onClick={props.click} className={`${styles.Favstar} ${(props.fav) ? styles.On : styles.Off}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
    </div>
  )
}

export default Favstar