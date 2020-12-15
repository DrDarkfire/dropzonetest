import React, {Component} from 'react'
//import DropPath from './App'
import {PathCtx} from "./ProviderLegacy";
//let notification = (Notification in window) // not sure what to do if they don't have browser support
// on mouse over event for folder transfer ->
// see what methods opusCapita has

let dummyRL = [
    {
        name: "path1"
    }, {
        name: "path2"
    }, {
        name: "path3"
    }
]

// maybe have a dropzone like moodle under the directory
let dzconfig = {
    "sizeLimit": 1000,// change to 25 mb
    "fileLimit": 10,
    "whitelist": [
        ".jpg",
        ".pdf",
        ".docx",
        ".csv",
        ".xslx",
        ".png",
        ".jpeg",
        ".txt",
        ".tif",
        ".gif",
        ".bmp",
        ".mp4",
        ".webm",
        ".mp3"
    ]
}
let msg = ""

// const mapStateToProps = state => {
//     const currPath = state.path
//
// }

class DropZone extends Component {
    dropRef = React.createRef()

    state = {
        dragging: false,
        path: 'null'
    }

    handleDragIn = (e) => {
        e.preventDefault()  // prevents default browser behavior
        e.stopPropagation() // prevents event from being propagated through parent and child
        this.dragCounter++
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({dragging: true})
        }
    }

    handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter--
        if (this.dragCounter > 0) return // these lines prevent UI from flickering
        this.setState({dragging: false})
    }

    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({dragging: false})
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) { // we check if there are files included with the drop
            // pass through our filter
            let sentFiles = filter(e.dataTransfer.files)
            // if we can't detect the folder, we will probably have a variable sent over from the file manager code
            // to get where we are dropping the files into.
            console.log(msg)
            this.props.handleDrop(sentFiles) // currently just passing to our call back ( the list view )
            // e.dataTransfer.files is an array of files that will get passed through to our file system
            // we can also check our file types here also
            e.dataTransfer.clearData() // we clear the array of files for our next use
            this.dragCounter = 0
        }
    }

    componentDidMount() {
        this.dragCounter = 0
        let div = this.dropRef.current
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
    }

    componentWillUnmount() {
        let div = this.dropRef.current
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
    }

    render() {
        // takes in a resourceLocation object array passed in from the file manager
        function buildPath(rl) {
            // dummyRL will get replaced with rl when plugged in
            let tempPath = '/'
            for (let i = 0; i < dummyRL.length; i++) {
                tempPath += dummyRL[i].name + '/'
            }
            this.setState({path: tempPath})
            window.alert("caught path change")
            return null; // we return null to hopefully leave it blank
        }
        //<PathCtx.Consumer>
        //                     {(context) => (
        //                         buildPath(context.state.message)
        //                     )}
        //                 </PathCtx.Consumer>
        // props.children is what will give us see the file viewing component "under" the drop zone
        return (
            <div style={{display: 'inline-block', position: 'relative'}}
                 ref={this.dropRef}>
                {this.state.dragging &&
                <div
                    style={{
                        border: 'dashed grey 4px',
                        backgroundColor: 'rgba(255,255,255,.8)',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9999
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            left: 0,
                            textAlign: 'center',
                            color: 'grey',
                            fontSize: 36
                        }}
                    >
                        <div>drop here :)</div>
                    </div>
                </div>
                }
                {this.props.children}
            </div>
        )
    }
}

export default DropZone

function filter(files) {
    let retArr = []
    let filter = dzconfig.whitelist
    console.log(filter)
    //console.log(files.item(0))
    // .jpg, .pdf, .docx, .csv, .xslx, .png, .jpeg, .txt, .tif, .gif, .bmp, .mp4, .webm, .mp3
    // check for files.length > file limit
    if (files.length > 10) {
        notify(null, 2);
        return retArr
    }
    for (let i = 0; i < files.length; i++) { // going to be replacing with the browser alerts.
        console.log('iterating...')
        let x = files.item(i).name.indexOf('.')
        let f = files.item(i).name;
        if (filter.includes(files.item(i).name.slice(x))) {// extension filter
            console.log('here')
            if (files.item(i).size <= dzconfig.sizeLimit) {
                retArr.push(files.item(i))
            } else {
                notify(f, 1)
            }
        } else {
            notify(f, 0)
        }
    }
    console.log('done')
    return retArr
}

function notify(name, errNo) {
    console.log("in notify")
    // if (!notification) {
    //     console.log("browser does not support notification")
    // }
    // let n = (Notification.permission === "granted" || Notification.permission === "default") ? true : false
    // // check for n == false and ask for permission
    // if (!n) {
    //     Notification.requestPermission().then(function (permission) {
    //         if (permission === "granted") {
    //             n = true
    //         }
    //     })
    // }
    // send the notifications on the case by case bases
    if (errNo === 0) { // extension error
        window.alert(name + " does not have a supported extension.")
    } else if (errNo === 1) { // size limit reached
        window.alert(name + " is too large, we support uploads of up to " + dzconfig.sizeLimit + " bytes")
    } else if (errNo === 2) {
        window.alert("Please don't send more than " + dzconfig.fileLimit + " files at once.")
    }
}