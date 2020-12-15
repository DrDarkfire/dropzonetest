import React, {Component} from 'react';
import './App.css';
import DropZone from "./DropZone";
import FileList from "./FileList";
import SimulatePathChange from './SimulatePathChange'
import ProviderLegacy from "./ProviderLegacy";
//import { Provider } from 'react-redux'
//import store from 'redux'
// ADD THIS CODE TO THE MAIN REACT APP
//let DropPath = React.createContext('default/path')

//export const pathCtx = React.createContext('./');
class App extends Component{
    // provider is a parent component to pass items between children
    //<Provider store={store}>
    //           <FileList />
    //           <SimulatePathChange />
    //       </Provider>
    path = "./" // replace with default path

    constructor(props) {
        super(props)
        this.state={
            path_key:"./"
        }
    }

    changePath=(pathFromChild)=> {
        this.setState({path_key:pathFromChild})
    }

    render() {
        return (
            <div className="App">
                <FileList />
                <SimulatePathChange />
            </div>
        )
    }
}

export default App;
