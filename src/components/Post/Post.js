
import React, {useState} from 'react'
import styles from './Post.module.css';
import getMarkup from '../../util/getMarkup';

const Post = props => {

  const [expand, setExpand] = useState(false);

  const expandToggle = () => setExpand( expand => !expand );

  return (
    <div className={`${styles.Post} ${expand ? styles.Open : styles.Closed}`} onClick={expandToggle}>
      <h3 className={styles.PostTitle} dangerouslySetInnerHTML={getMarkup(props.titleHTML)}/>
      <div className={styles.Content} dangerouslySetInnerHTML={getMarkup(props.contentHTML)}/>
    </div>
  )
}

export default Post