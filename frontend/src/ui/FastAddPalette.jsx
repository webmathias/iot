import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
class FastAddPalette extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            files:[]
        }
        this.save = this.save.bind(this)
    }
    handleDropOrClick = (acceptedFiles, rejectedFiles, e) => {
        let eventOrValue = e;

        if (e.type === 'drop') {
            console.log("acceptedFiles:", acceptedFiles)
            console.log("rejectedFiles:", rejectedFiles)
            if (acceptedFiles.length) {
                // FileList or [File]
                this.setState({files:acceptedFiles});
                eventOrValue = (e.dataTransfer && e.dataTransfer.files) || acceptedFiles;
            } else {
                eventOrValue = null;
            }
        }
    }
    awesomeName(name){
        let ret = name.split('.')[0];
        return ret;
        
    }
    save(){
        this.state.files.map(f=>{
            console.log(f);
            this.props.save({
                name:this.awesomeName(f.name)   ,
                type:'IMAGE',
                images:[
                    {
                        image:[f],
                        value:1
                    }
                ]
            })
        })
    }

    render() {
        let dropzoneProps = {
            accept: "image/png",
            multiple: true,
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
                <Dropzone style={style}  {...dropzoneProps} >

                </Dropzone>
                <button key='1' className='btn btn-primary' onClick={this.save}>Salvar</button>
                {!this.state.files ? 'Selecione um arquivo' :
                    this.state.files.map((f, index) => <img width='100px' key={index} src={f.preview}/>)}
            </div>
        );
    }
}

export default FastAddPalette