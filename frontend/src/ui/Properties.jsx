import React from 'react';
import $ from 'jquery';
import PropertiesForm from './PropertiesForm'
import {getImageURL} from '../utils/config'
const Properties = (props) => {
    const { handleSubmit, selectedItem, mapSensors, palette, selectedProperty, selectProperties, saveProperties } = props;
    return <div>

        {mapSensors.map(
            (property, index) =>
                <div key={index}>
                    <div className="card" style={{width: '18rem'}}>
                        <img className="card-img-top" src={getImageURL(property.slice)} />
                        <div className="card-body">
                            <h5 className="card-title">{property.name}</h5>
                            <p className="card-text">
                                Imagem: {palette.find(item => item._id === property.slice).name}
                            </p>
                            <p>Sensor:  {property.sensor || 'Não Ligado'}</p>
                            <button className='btn  btn-primary' onClick={e => { selectProperties(property) }} >Licar</button>
                        </div>
                    </div>
                </div>
        )}
        {selectedProperty ?
            <div className="modal  fade " ref={e => $(e).modal()} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <PropertiesForm {...selectedProperty} {...props} onSubmit={handleSubmit(saveProperties)} />
                </div>
            </div>
            : null}

    </div>
}

 
export default Properties