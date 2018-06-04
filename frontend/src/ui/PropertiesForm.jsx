import React from 'react' 
import {getImageURL} from '../utils/config'
import {Field} from 'redux-form'
const PropertiesForm = (props) => {
    const { slice, onSubmit, position } = props
    return <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title">Sensor</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body">
            <div>
                <div className="form-group">
                    <label>Image:</label>
                    <p><img src={getImageURL(slice)} style={{height:50}}/></p>
                    <small>Posição:{position.x},{position.y}</small>
                </div>
                <div className="form-group">
                    <label>Nome</label>
                    <Field type="text" component='input' name='name' className="form-control" placeholder="Nome" />
                </div>
                <div className="form-group">
                    <label>Sensor</label>
                    <Field type="text" component='input' name='sensor' className="form-control" placeholder="Sensor" />
                </div>
            </div>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onSubmit}>Salvar</button>
        </div>
    </div>

}
export default PropertiesForm
