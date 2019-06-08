
import React from 'react'
import styles from './Events.module.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Auth from '../Auth';
import LoadingSpinner from '../LoadingSpinner';
import EventList from '../EventList';
import PageTitle from '../PageTitle';

const Events = props => {

  const PageLoad = ({events, auth}) => {
    if (!auth) {
      return <Auth/>
    } else if (events.length === 0) {
      return <LoadingSpinner />
    } else {
      return <EventList events={events} />
    }
  }

  return (
    <div className={styles.Events}>
      <PageTitle title="Events"/>
      <PageLoad events={props.events} auth={props.authStatus}/>
    </div>
  )

}

const mapStateToProps = state => {
  return {
      events: state.events,
      authStatus: state.authStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(actions.fetchEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)