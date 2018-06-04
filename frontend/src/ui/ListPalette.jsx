import React, { Component } from 'react' 
import { Modal } from '../utils/utils'
import FormPalette from './FormPalette'
import FastAddPalette from './FastAddPalette'
import {getImageURL} from '../utils/config'
class ListPalette extends Component {
    componentDidMount() {
        const { fetch } = this.props;
        fetch()
    }
    render() {
        const { list, save, remove } = this.props
        return (
            <div>
                <FastAddPalette save={save} />
                <FormPalette onSubmit={save}/>
                <ul className="list-group">
                    {list.map((item, index) => <li key={index} className="list-group-item">
                    <img style={{ width: 50 }} src={getImageURL(item._id, 0)} />
                    {item.type} - {item.name}
                    <i onClick={e => remove(item._id)} className="fa fa-trash" /></li>)}
                </ul>


            </div>
        )
    }
}
export default ListPalette