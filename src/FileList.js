import React, { Component } from "react";
import DropZone from "./DropZone";

class FileList extends Component {
    state = {
        files: [
            'WeCan.pdf',
            'PutThe.jpg',
            'FileView.pdf',
            'Here.docx'
        ]
    }
    // this is just for our dummy set of files
    handleDrop = (files) => {
        let fileList = this.state.files
        for (let i = 0; i< files.length; i++) {
            if (!files[i].name) return
            fileList.push(files[i].name)
        }
        this.setState({files: fileList})
    }

    render() {
        let i;
        return (
            <DropZone handleDrop={this.handleDrop}>
                <div style={{height: 300, width: 250}}>
                    {this.state.files.map((file) =>
                        <div key={i}>{file}</div>
                    )}
                </div>
            </DropZone>
        )
    }
}

export default FileList