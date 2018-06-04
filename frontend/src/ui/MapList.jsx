import React, { Component } from 'react'

class MapList extends Component {
    componentDidMount() {
        const { fetchMaps } = this.props;
        fetchMaps();
    }
    render() {
        const { list,selectMap,goto  } = this.props;
        return (
            <div>
               
                <ul className="list-group">
                    {list.map((item, index) =>
                        <li onClick={e=>selectMap(item._id)} key={index} className="list-group-item">
                            {item.name}
                        </li>)}
                </ul>
            </div>
        )
    }
}

export default MapList