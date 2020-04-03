import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button, Icon } from 'antd';


class Success extends Component {

    render() {
        return (
            <Result style={{minHeight: 660}}
                icon={<Icon type="smile" theme="twoTone" twoToneColor="#f9c700"/>}
                title="Successfully Purchased the Reservation!"
                subTitle="Order configuration takes 1-5 minutes, please wait."
                extra={[
                    <Link to="/" key="Home"><Button type="primary">Go Home Page</Button></Link>,
                    <Link to="/order" key="Order"><Button type="primary">Go Order Page</Button></Link>
                ]}
            />
        );
    }
}


export default Success;

