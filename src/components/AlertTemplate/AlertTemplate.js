import React from 'react'
import InfoIcon from './icons/InfoIcon'
import SuccessIcon from './icons/SuccessIcon'
import ErrorIcon from './icons/ErrorIcon'
import CloseIcon from './icons/CloseIcon'

import styles from './AlertTemplate.module.css';

const buttonStyle = {
  marginLeft: '20px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: '#FFFFFF'
}

const AlertTemplate = ({ message, options, style, close }) => {
  return (
    <div className={styles.AlertTemplate} style={{ ...style }}>
      {options.type === 'info' && <InfoIcon />}
      {options.type === 'success' && <SuccessIcon />}
      {options.type === 'error' && <ErrorIcon />}
      <span className={styles.Message} style={{ flex: 2 }}>{message}</span>
      <button onClick={close} className={styles.AlertButton} style={buttonStyle}>
        <CloseIcon />
      </button>
    </div>
  )
}

export default AlertTemplate