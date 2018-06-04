import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { FileField, renderField, renderFieldSelect } from '../utils/utils'
import { Modal } from '../utils/utils'
const FileComponent = ({ fields, meta: { error, submitFailed } }) => {

    return <div className="form-group col-md-12">
        <button className='btn btn-secondary' type="button" onClick={() => fields.push({})}> + Image</button> {submitFailed && error && <span>{error}</span>}
        <div>
            {
                fields.map((member, index) => (
                    <div className="col-6" key={index}>
                        <h4>Imagem #{index + 1}</h4>
                        <div className="row">
                            <div className="col-6">
                                <Field accept="image/png" name={`${member}.image`} component={FileField} />
                            </div><div className="col-5">
                                <Field help="Informe o valor do sensor normalmente entre 0 e 1" name={`${member}.status`} component={renderField} label="Status" />
                            </div><div className="col-1">
                                <button className="btn" onClick={e => { fields.remove(index) }} ><i className="fa fa-window-close" /></button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>

}
const FormPalette = props => {
    const { handleSubmit } = props;
    const options = ['ATUADOR', 'SENSOR', 'IMAGE']
    let el = false;
    let modal = false;
    return (<div>
        <button className="btn" onClick={e => { modal.show() }}>+</button>
        <Modal title="Novo Item" ref={e => modal = e} buttons={[<button key='1' className='btn btn-primary' onClick={handleSubmit}>Salvar</button>]}>
            <div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <Field component={renderField} name='name' label="Nome" help="Nome do componente para facilitar sua busca" />
                    </div>
                    <div className="form-group col-md-6">
                        <Field component={renderFieldSelect} name='type' label="Tipo" options={options} help="ATUADOR, SENSOR, IMAGE" />
                    </div>
                </div>
                <div className="form-row">
                    <FieldArray name="images" component={FileComponent} />
                </div>
            </div>
        </Modal>
    </div>
    )
}

export default reduxForm({ form: 'FormPalette' })(FormPalette);