
import React, {useState} from 'react'
import styles from './Event.module.css';
import getMarkup from '../../util/getMarkup';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import FavStar from '../FavStar'

const Event = props => {

  const [expand, setExpand] = useState(false);
  const expandToggle = () => setExpand( expand => !expand );

  let metaFields = {}

  if (props.metadata) {
    props.metadata.map((meta)=> {
      return metaFields = {...metaFields, [meta.metaKey]:meta.metaValue}
    })
  }
  //console.log(metaFields)

  const favStarStatus = props.favEvents.includes(props.id)

  const favStarToggle = () => {
      if (favStarStatus) {
        props.removeFavEvent(props.id);
      } else props.addFavEvent(props.id);
  }

  return (
    <div className={`${styles.Event} ${expand ? styles.Active : null}`}>
      <div className={styles.Eventsummary}>
        <div className={styles.TitleColumn} onClick={expandToggle}>
          <div className={styles.Title}>{props.name}</div>
          <div className={styles.System}>{metaFields.System}</div>
        </div>
        <div className={styles.TimeColumn} onClick={expandToggle}>
          <div className={styles.Date}>{props.startDate}</div>
          <div className={styles.Time}>{props.startTime} - {props.endTime}</div>
        </div>
        <div className={styles.FavStar}><FavStar fav={favStarStatus} click={favStarToggle}/></div>
      </div>
      {expand ? <div className={styles.Description} onClick={expandToggle} dangerouslySetInnerHTML={getMarkup(props.description)} /> : null}
    </div>

  )
}

const mapStateToProps = state => {
  return {
      favEvents: state.favEvents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFavEvent: (id) => dispatch(actions.addFavEvent(id)),
    removeFavEvent: (id) => dispatch(actions.removeFavEvent(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Event)