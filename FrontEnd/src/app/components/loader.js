
import React from 'react';
import { connect } from 'react-redux';

class Loader extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return ( 
            <div className={'g-loader-container ' + this.props.loaderClass}>
              <div className="g-loader"></div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loaderClass: state.utilReducer.loaderClass,
    }   
}
export default connect(mapStateToProps)(Loader);