import React from 'react'
import { renderField } from '../utils/utils' 
import {Field} from 'redux-form'
const validate = values => {
    const errors = {}
    if (!values.username) errors.username = 'Campo obrigatório';
    if (!values.password) errors.password = 'Campo obrigatório';
    return errors
}
const LoginForm = (props) => {
    const { handleSubmit, loginError } = props;
    return <form className="form" role="form" autoComplete="off"
        id="formLogin" noValidate="">
        <div className="form-group">
            <Field type="text" name="username" label="E-mail" component={renderField} />
        </div>
        <div className="form-group">
            <Field type="password" name="password" label="Password" component={renderField} />
        </div>
        {loginError ? <div className="alert alert-danger" role="alert">
            {loginError}
        </div> : null}
        <button onClick={handleSubmit} className="btn btn-success btn-lg float-right" id="btnLogin">Login</button>
    </form>
}
const LoginScreen = (props) =>{
    const {onSubmit} = props;
    return <div className="container py-5">
        <div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="card rounded-0">
                            <div className="card-header">
                                <h3 className="mb-0">Login</h3>
                            </div>
                            <div className="card-body">
                                <LoginForm onSubmit={onSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default LoginScreen;