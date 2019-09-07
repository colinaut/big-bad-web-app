import React from 'react'
import styles from './EventDetails.module.css';
import getMarkup from '../../util/getMarkup';
import decodeText from '../../util/decodeText';

const EventDetails = props => {

  const {
    metadata,
    categories,
    description
  } = props;

  return (
    <div className={styles.Eventdetails} >
      <div className={styles.Description} dangerouslySetInnerHTML={getMarkup(decodeText(description))} />
      <div className={styles.Meta}>
        {(metadata.Min_Players && metadata.Min_Players > 1) ? <span><strong>Players:</strong> {metadata.Min_Players}-{metadata.Players}</span> : null}
        <span><strong>Length:</strong> {metadata.Length} hrs</span>
        {(categories && categories.length > 0) ? <span><strong>Categories:</strong> <Categories categories={categories}/></span> : null}
      </div>
      <div className={styles.Maturity}>
        {metadata.Maturity ? <span><strong>Maturity:</strong> {metadata.Maturity} </span> : null}
        {metadata.gm_age ? <span><strong>GM Age:</strong> {metadata.gm_age} </span> : null}
        {metadata.player_age ? <span><strong>Player Age:</strong> {metadata.player_age} </span> : null}
      </div>
      {metadata.safety_tools ? <div className={styles.SafetyTools}><strong>Safety Tools:</strong> {metadata.safety_tools} </div> : null}
      {metadata.room ? <div className={styles.EventRoom}><strong>Event Room:</strong> {metadata.room}</div> : null}
    </div>
  )
}

const Categories = ({categories}) => {
  return categories ? categories.map((category)=> <span className={styles.CategoryTag} key={category.slug}>{category.name}</span>) : null
}

export default EventDetails