import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import React, {useEffect} from 'react';

import * as actions from '../../store/actions';

import '../../styles/reset.css';
import '../../styles/typography.css'
import styles from './Layout.module.css';

const Layout = props => {

    const {alert, setAlert } = props

  const alertPopup = useAlert();

  useEffect(()=>{
  
    if (alert && alert.message) {
      switch (alert.alertType) {
        case 'info':
          alertPopup.info(alert.message)
          break;
        case 'success':
          alertPopup.success(alert.message)
          break;
        case 'error':
          alertPopup.error(alert.message)
          break;
        default:
          alertPopup.info(alert.message)
          break;
      }
      setAlert(null)
    }
  },[alert, setAlert, alertPopup])

    return <div className={styles.Layout}>{props.children}</div>

}

const mapStateToProps = ({global}) => {
    return {
      alert: global.alert,
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        setAlert: (payload) => dispatch(actions.setAlert(payload))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Layout)