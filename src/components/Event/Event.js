
import React, {useState} from 'react'
import styles from './Event.module.css';
import getMarkup from '../../util/getMarkup';

const Event = props => {

  const [expand, setExpand] = useState(false);

  const expandToggle = () => setExpand( expand => !expand );

  let metaFields = {}

  if (props.metadata) {
    props.metadata.map((meta)=> {
      return metaFields = {...metaFields, [meta.metaKey]:meta.metaValue}
    })
  }
  console.log(metaFields)

  return (
    <div className={`${styles.Event} ${expand ? styles.Active : null}`} onClick={expandToggle}>
      <div className={styles.Eventsummary} >
        <div className={styles.TitleColumn}>
          <div className={styles.Title}>{props.name}</div>
          <div className={styles.System}>{metaFields.System}</div>
        </div>
        <div className={styles.TimeColumn}>
          <div className={styles.Date}>{props.startDate}</div>
          <div className={styles.Time}>{props.startTime} - {props.endTime}</div>
        </div>
      </div>
      {expand ? <div className={styles.Description} dangerouslySetInnerHTML={getMarkup(props.description)} /> : null}
    </div>

  )
}

export default Event