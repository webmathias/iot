import React, { Component } from 'react'
import Map from './Map'
import Item from './Item'
import { getImageURL } from '../utils/config'
import Properties from './Properties';
import removeIcon from '../icons/ic_remove_circle_black_24px.svg'
const Editor = props => {
    const { currentSelected, addItem, itemSelected, palette, selectItem, filter, filterText, mapSensors, selectedItem, saveMap, map, mapName, changeName } = props

    return <div className="row">
        <div className="col-3">
            <nav className="navbar navbar-light bg-light" style={{ height: 50 }}>
                <div className="col-6">
                    <input type="text" className="form-control " value={filterText} onChange={e => filter(e.target.value)} placeholder="Filtro" />
                </div>

                {selectedItem ?
                    <div className="col-6" style={{ height: 50 }}>
                        <div>
                            <img style={{ height: 50 }} src={getImageURL(selectedItem._id)} />
                            <img src={removeIcon} onClick={e => { selectItem(null) }} className="mr-3" />
                        </div>
                    </div>
                    : null}
            </nav>
            <nav className="navbar navbar-light bg-light" style={{ height: 50 }}>
                <div className="col-6">
                    <input type="text" className="form-control " value={mapName} onChange={e => changeName(e.target.value)} placeholder="Nome do Mapa" />
                </div>
                <div className="col-6">
                    <button className="btn" onClick={e => saveMap({ map: map, name: mapName, mapSensors: mapSensors })} >Salvar</button>
                </div>

            </nav>
            <div className="row">
                <div className="col-12">
                    <div id="accordion">
                        {['IMAGE', 'SENSOR', 'ATUADOR'].map(type =>
                            <div className="card" key={type} >
                                <div className="card-header" id={"heading" + type}>
                                    <h5 className="mb-0">
                                        <button className="btn btn-link" data-toggle="collapse" data-target={"#collapse" + type} aria-expanded="true" aria-controls={"collapse" + type}>{type}</button>
                                    </h5>
                                </div>
                                <div id={"collapse" + type} className="collapse show" aria-labelledby={"heading" + type} data-parent="#accordion">
                                    <div className="card-body">
                                        <div className="row" style={{ overflowY: 'scroll', maxHeight: '200px' }}>
                                            {palette.filter(item => item.type === type).map((item, index) =>
                                                <div className="col-4" key={index} onClick={e => { selectItem(item) }} >
                                                    <img style={{ height: 50 }} src={getImageURL(item._id, 0)} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        }
                    </div>

                </div>
            </div>
        </div>
        <div className="col-7">
            <Map {...props} />
        </div>
        <div className="col-2">
            <Properties {...props} />
        </div>
    </div>
}

export default Editor


