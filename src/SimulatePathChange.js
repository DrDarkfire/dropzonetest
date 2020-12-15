import React, { Component } from 'react'
import {PathCtx} from "./ProviderLegacy";
import { connect } from 'react-redux'
import { changePath } from "./redux/actions";

class SimulatePathChange extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <button onClick={this.handleChangePath.bind(this)}>Simulate Path Change</button>
            </div>
        )
    }

    handleChangePath=(e)=> {
        e.preventDefault()
        this.props.changeParentPath("changed path") // sends the path back to the parent to send to child 2 (File Manager)
    }
} //export default connect(null, { changePath })(SimulatePathChange)
export default SimulatePathChange