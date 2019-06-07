
import React from 'react'
import styles from './Games.module.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

const Games = props => {

  return (
    <div className={styles.Games}>
      <h2>Games</h2>
      <button onClick={props.fetchEvents}>fetch events</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
      events: state.events
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(actions.fetchEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Games)