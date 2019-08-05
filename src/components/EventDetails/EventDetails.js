
import React from 'react'
import styles from './EventDetails.module.css';
import getMarkup from '../../util/getMarkup';

const EventDetails = props => {
  return (
    <div className={styles.Eventdetails} >
      <div className={styles.Description} dangerouslySetInnerHTML={getMarkup(props.description)} />
      <div className={styles.Meta}>
        {props.eventOwner ? <span><strong>GM:</strong> {props.eventOwner.displayName}</span> : null}
        {(props.meta.Min_Players && props.meta.Min_Players > 1) ? <span><strong>Players:</strong> {props.meta.Min_Players}-{props.meta.Players}</span> : null}
        <span><strong>Length:</strong> {props.meta.Length} hrs</span>
        {(props.categories && props.categories.length > 0) ? <span><strong>Categories:</strong> <Categories categories={props.categories}/></span> : null}
      </div>
      <div className={styles.Maturity}>
        {props.meta.Maturity ? <span><strong>Maturity:</strong> {props.meta.Maturity} </span> : null}
        {props.meta.gm_age ? <span><strong>GM Age:</strong> {props.meta.gm_age} </span> : null}
        {props.meta.player_age ? <span><strong>Player Age:</strong> {props.meta.player_age} </span> : null}
      </div>
      <div className={styles.SafetyTools}>
        {props.meta.safety_tools ? <span><strong>Safety Tools:</strong> {props.meta.safety_tools} </span> : null}
      </div>
    </div>
  )
}

const Categories = ({categories}) => {
  return categories ? categories.map((category)=> <span className={styles.CategoryTag} key={category.slug}>{category.name}</span>) : null
}

export default EventDetails