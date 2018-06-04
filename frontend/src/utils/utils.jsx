import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import $ from 'jquery';
export function renderField({ input, label, type, meta: { touched, error }, help }) {
    return (
        <div className="form-group ">
            <label>{label}</label>
            <div>
                <input className="form-control" {...input} placeholder={label} type={type} />
                {help && <small className="form-text ">* {help}</small>}
                {touched && error && <small className="form-text text-danger">* {error}</small>}
            </div>
        </div>
    )
}
export function renderFieldSelect({ input, label, meta: { touched, error }, help, options }) {
    return (

        <div className="form-group ">
            <label>{label}</label>
            <div>
                <select className="form-control"  {...input} placeholder={label}>
                    {options.map(value => <option key={value} value={value}>{value}</option>)}
                </select>
                {help && <small className="form-text ">* {help}</small>}
                {touched && error && <small className="form-text text-danger">* {error}</small>}
            </div>
        </div>
    )
}

export class FileField extends React.Component {

    handleDropOrClick = (acceptedFiles, rejectedFiles, e) => {
        let eventOrValue = e;
        let { input: { onChange, onBlur } } = this.props;
        if (e.type === 'drop') {
            if (acceptedFiles.length) {
                // FileList or [File]
                eventOrValue = (e.dataTransfer && e.dataTransfer.files) || acceptedFiles;
            } else {
                eventOrValue = null;
            }
        }
        onBlur(eventOrValue); // update touched
        onChange(eventOrValue); // update value
    }


    render() {
        let { input, meta: { touched, error } } = this.props;
        let { accept, multiple } = this.props;
        let selectedFile = (input && input.value && input.value[0]) || null;
        let dropzoneProps = {
            accept,
            multiple,
            onDrop: this.handleDropOrClick,
        };
        let style = {
            width: '50px',
            height: '50px',
            borderWidth: '2px',
            borderColor: 'rgb(102, 102, 102)',
            borderStyle: 'dashed',
            borderRadius: '5px',
        }
        return (
            <div>
                <input type='hidden' disabled {...input} />
                {selectedFile ? <span>{selectedFile.name}</span> : 'Selecione um arquivo'}
                <Dropzone style={style}  {...dropzoneProps} >
                    {selectedFile ? <img width="100%" src={selectedFile.preview} /> : null}
                </Dropzone>
            </div>
        );
    }
}

export class Modal extends Component {
    show() {
        if (this.modal) {
            $(this.modal).modal()
        }
    }
    render() {
        const { children, title, buttons } = this.props;
        return  (
            <div className="modal  fade " ref={e => this.modal = e} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            {buttons ? buttons :
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}

export default {}
