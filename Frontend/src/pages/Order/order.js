import React, { Component } from 'react';
import { connect } from 'react-redux';



class Order extends Component {

    state = {
        
    };

    render() {
        return (
            <div style={{minHeight: 660, textAlign: "center", marginTop: 10}}>
                my orders
            </div>
          );
    }
}

const mapState = (state) => {
	return {
		loginStatus: state.getIn(["combo", "loginStatus"])
	}
}

const mapDispatch = (dispatch) => ({
    
});


export default connect(mapState, mapDispatch)(Order);

