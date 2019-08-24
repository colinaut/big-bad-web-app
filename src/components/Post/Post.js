import React from 'react'
import useToggle from 'react-use-toggle';

import getMarkup from '../../util/getMarkup';

import styles from './Post.module.css';

const Post = props => {

  const {
    titleHTML,
    excerptHTML,
    contentHTML,
  } = props

  const [expand, expandToggle] = useToggle(false);

  const content = expand ? contentHTML : excerptHTML

  return (
    <div className={`${styles.Post} ${expand ? styles.Open : styles.Closed}`} onClick={expandToggle}>
      <h3 className={styles.PostTitle} dangerouslySetInnerHTML={getMarkup(titleHTML)}/>
      <div className={styles.Content} dangerouslySetInnerHTML={getMarkup(content)}/>
    </div>
  )
}

export default Post