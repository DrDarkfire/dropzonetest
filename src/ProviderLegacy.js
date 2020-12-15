import React, { Component } from 'react'

export const PathCtx = React.createContext('./');
class ProviderLegacy extends Component {
    state = {path: ""}
    render() {
        //this.props.children indicates that all the child tags with MyProvider as Parent can access the global store.
        return (
            <PathCtx.Provider value={
                {   path: this.state.path,
                    setMessage: (value) => this.setState({
                        message: value })}}>
                {this.props.children}
            </PathCtx.Provider>)
    }
} export default ProviderLegacy