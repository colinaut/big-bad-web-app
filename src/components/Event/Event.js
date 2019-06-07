
import React, {useState} from 'react'
import styles from './Event.module.css';

const Eventsummary = props => {

  const [expand, setExpand] = useState(false);

  const expandToggle = () => setExpand( expand => !expand )

  function createMarkup(markup) { return {__html: markup}; };

  let metaFields = {}


  if (props.metadata) {
    props.metadata.map((meta)=> {
      metaFields = {...metaFields, [meta.metaKey]:meta.metaValue}
    })
  }
  
  return (
    <div className={`${styles.Event} ${expand ? styles.Active : null}`} onClick={expandToggle}>
      <div className={styles.Eventsummary} >
        <div className={styles.Title}>{props.name}</div>
        <div className={styles.Date}>{props.startDate}</div>
        <div className={styles.Time}>{props.startTime} - {props.endTime}</div>
      </div>
      {expand ? <div className={styles.Description} dangerouslySetInnerHTML={createMarkup(props.description)} /> : null}
    </div>

  )
}

export default Eventsummary