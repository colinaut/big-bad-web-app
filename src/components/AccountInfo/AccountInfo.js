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

  return (
    <div className={styles.AccountInfo}>
      <h3 className={styles.Name}>{props.userData.displayName}</h3>
      <h4 className={styles.Nickname}>{props.userData.userNicename}</h4>
      <MyBookings />
      <Button clicked={logoutHandler}>Logout</Button>
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