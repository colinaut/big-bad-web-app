import { connect } from 'react-redux';
import React from 'react'
import styles from './AccountInfo.module.css';
import Button from '../Button'
import * as actions from '../../store/actions';
import MyBookings from '../MyBookings'

const AccountInfo = props => {

  const logoutHandler = () => {
    props.logout();
    props.close();
  }

  //TODO add close button
  
  return (
    <div className={styles.AccountInfo}>
      <h3 className={styles.Name}>{props.userData.displayName}</h3>
      <h4 className={styles.Nickname}>{props.userData.userNicename}</h4>
      <MyBookings />
      <Button clicked={logoutHandler}>Logout</Button>
      <button onClick={props.fetchMyEvents}>fetch my events</button>
    </div>
  )
}

const mapStateToProps = ({auth}) => {
  return {
      authStatus: auth.authStatus,
      userData: auth.userData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    fetchMyEvents: () => dispatch(actions.fetchMyEvents())
  }
}
AccountInfo.defaultProps = {
  userData: {}
}
export default connect(mapStateToProps,mapDispatchToProps)(AccountInfo)