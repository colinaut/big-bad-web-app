
import React, {useState} from 'react'
import styles from './Auth.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import {checkValidity} from '../../util/validation';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

const Auth = props => {

  const [controls, setControls] = useState({
    username: {
      order: 0,
      elementType: 'input',
      elementConfig: {
        type: 'username',
        placeholder: 'Username'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    password: {
      order: 1,
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    }
  });

  const inputChangedHandler = (event, id) => {
    const updatedControls = {
      ...controls,
      [id]: {
        ...controls[id],
        value: event.target.value,
        valid: checkValidity(event.target.value,controls[id].validation),
        touched: true
      }
    }
    setControls( updatedControls )
  }

  const {submitCallback = () => {} } = props

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.username.value,controls.password.value);
    submitCallback();
  }

  const formFields = []

  for (let key in controls) {
    formFields.push({
      id: key,
      config: controls[key]
    })
  }

  formFields.sort((a,b) => (a.config.order > b.config.order) ? 1 : -1);

  if (props.authStatus) {
    return null
  } else return (
    <div className={styles.Auth}>
      <form className={styles.AuthForm} onSubmit={submitHandler}>
        {formFields.map((formElement) => 
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
        )}
        <div className={styles.ButtonWrapper}><Button btnType='White'>Login</Button></div>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    authStatus: state.authStatus
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (login, password) => dispatch(actions.auth(login, password))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)