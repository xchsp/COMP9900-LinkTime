import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';


class FourOThree extends Component {

    render() {
        return (
            <Result style={{minHeight: 660}}
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
            />
        );
    }
}


export default FourOThree;