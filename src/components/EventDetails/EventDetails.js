
import React from 'react'
import styles from './EventDetails.module.css';
import getMarkup from '../../util/getMarkup';

const Eventdetails = props => {
  console.log(props.categories)
  return (
    <div className={styles.Eventdetails} onClick={props.click}>
      <div className={styles.Description} dangerouslySetInnerHTML={getMarkup(props.description)} />
      <div className={styles.Meta}>
        <span><strong>GM:</strong> {props.gm}</span>
        <span><strong>Players:</strong> {props.meta.Min_Players}-{props.meta.Players}</span>
        <span><strong>Length:</strong> {props.meta.Length} hrs</span>
        <span><strong>Categories:</strong> <Categories categories={props.categories}/></span>
      </div>
      <div className={styles.Maturity}>
        <span><strong>Maturity:</strong> {props.meta.Maturity} </span>
        <span><strong>GM Age:</strong> {props.meta.gm_age} </span>
        <span><strong>Player Age:</strong> {props.meta.player_age} </span>
      </div>
      <div className={styles.SafetyTools}>
        <span><strong>Safety Tools:</strong> {props.meta.safety_tools} </span>
      </div>
    </div>
  )
}

const Categories = ({categories}) => {
  return categories ? categories.map((category)=> <span className={styles.CategoryTag} key={category.categorySlug}>{category.categoryName}</span>) : null
}

export default Eventdetails