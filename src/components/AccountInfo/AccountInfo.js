import { connect } from 'react-redux';
import React, {Fragment} from 'react'

import * as actions from '../../store/actions';
import Button from '../Button'
import MyBookings from '../MyBookings';
import TestingActionButtons from '../TestingActionButtons/TestingActionButtons';

import styles from './AccountInfo.module.css';

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
          <TestingActionButtons/>
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
  }
}
AccountInfo.defaultProps = {
  userData: {}
}
export default connect(mapStateToProps,mapDispatchToProps)(AccountInfo)