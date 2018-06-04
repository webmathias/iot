import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { renderField } from '../../utils/utils'
import { login } from './loginActions'
import LoginForm from '../../ui/LoginScreen'
const validate = values => {
    const errors = {}
    if (!values.username) errors.username = 'Campo obrigatório';
    if (!values.password) errors.password = 'Campo obrigatório';
    return errors
}


const mapStateToProps = (state) => ({
    loginError: state.login.error
})
export default connect(mapStateToProps)(
    reduxForm(
        {
            form: 'login',
            validate
        })(LoginForm));