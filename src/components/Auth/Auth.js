
import React, {useState} from 'react'
import styles from './Auth.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button'

const Auth = props => {

  const [controls, setControls] = useState({
    email: {
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

  const inputChangedHandler = () => setControls( menuToggle => !menuToggle )

  const formFields = []

  for (let key in controls) {
    formFields.push({
      id: key,
      config: controls[key]
    })
  }

  return (
    <div className={styles.Auth}>
      <form>
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
        <Button btnType="Success">Login</Button>
      </form>
    </div>
  )
}

export default Auth