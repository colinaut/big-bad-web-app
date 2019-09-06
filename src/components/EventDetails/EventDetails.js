import React from 'react'
import styles from './EventDetails.module.css';
import getMarkup from '../../util/getMarkup';
import decodeText from '../../util/decodeText';

const EventDetails = props => {

  const {
    meta,
    categories,
    eventRoom,
    description
  } = props;

  return (
    <div className={styles.Eventdetails} >
      <div className={styles.Description} dangerouslySetInnerHTML={getMarkup(decodeText(description))} />
      <div className={styles.Meta}>
        {(meta.Min_Players && meta.Min_Players > 1) ? <span><strong>Players:</strong> {meta.Min_Players}-{meta.Players}</span> : null}
        <span><strong>Length:</strong> {meta.Length} hrs</span>
        {(categories && categories.length > 0) ? <span><strong>Categories:</strong> <Categories categories={categories}/></span> : null}
      </div>
      <div className={styles.Maturity}>
        {meta.Maturity ? <span><strong>Maturity:</strong> {meta.Maturity} </span> : null}
        {meta.gm_age ? <span><strong>GM Age:</strong> {meta.gm_age} </span> : null}
        {meta.player_age ? <span><strong>Player Age:</strong> {meta.player_age} </span> : null}
      </div>
      {meta.safety_tools ? <div className={styles.SafetyTools}><strong>Safety Tools:</strong> {meta.safety_tools} </div> : null}
      {eventRoom ? <div className={styles.EventRoom}><strong>Event Room:</strong> {eventRoom}</div> : null}
    </div>
  )
}

const Categories = ({categories}) => {
  return categories ? categories.map((category)=> <span className={styles.CategoryTag} key={category.slug}>{category.name}</span>) : null
}

export default EventDetails