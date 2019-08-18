import { connect } from 'react-redux';
import React, {Fragment} from 'react'
import styles from './AccountInfo.module.css';
import Button from '../Button'
import * as actions from '../../store/actions';
import MyBookings from '../MyBookings';

const AccountInfo = props => {

  const logoutHandler = () => {
    props.logout();
    props.close();
  }

  return (
    <Fragment>
      <div className={styles.AccountInfo}>
        <div className={styles.UserInfoWrapper}>
          <h3 className={styles.Name}>{props.userData.displayName} <span className={styles.Nickname}>{props.userData.userNicename}</span></h3>
          <MyBookings />
        </div>
        <div className={styles.LogOutWrapper}>
        <Button clicked={logoutHandler} btnType='Gray'>Logout</Button>
        <Button clicked={()=> props.fetchMyUserData()} btnType='Gray'>Fetch UserData</Button>
        <Button clicked={()=> props.fetchMyEvents()} btnType='Gray'>Fetch My Events</Button>
        <Button clicked={()=> props.fetchEvents()} btnType='Gray'>Fetch All Events</Button>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = ({auth}) => {
  return {
      authStatus: auth.authStatus,
      userData: auth.userData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
    fetchEvents: () => dispatch(actions.fetchEvents()),
    fetchMyEvents: () => dispatch(actions.fetchMyEvents()),
    fetchMyUserData: () => dispatch(actions.fetchMyUserData())
  }
}
AccountInfo.defaultProps = {
  userData: {}
}
export default connect(mapStateToProps,mapDispatchToProps)(AccountInfo)