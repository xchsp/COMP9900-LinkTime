import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import moment from 'moment';
import { Form, Button, Row, Col, Collapse, DatePicker, Select } from 'antd';
import { actionCreators } from '../../redux/oneStore';
import './oneProp.less';


const { Option } = Select;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;


class OneProp extends Component {


    render() {
        const { propDetail } = this.props;
        const { getFieldDecorator } = this.props.form;
        const guestNum = ['1 Guest', '2 Guests', '3  Guests', '4  Guests']

        if (propDetail) {
            let amenities = propDetail.get('amenities').slice(1, -1).split(',')
            return (
                <div className="content">
                    <Row className="oneProp">
                        <Col span={12}>
                            <div style={{overflow: "hidden"}}>
                                <img className="pic" src={ propDetail.get('img_url').get(0) } alt=""/>
                            </div>
                        </Col>
                        <Col span={12}>
                            {
                            [1,2,3,4].map((value, index) => {
                                return(
                                        <div className='right' key={index}>
                                            <img className="pic" src={ propDetail.get('img_url').get(value) } alt=""/>
                                        </div>
                                )   
                            })
                            }
                        </Col>
                    </Row>
                    <Row className="showDetail">
                        <Col span={15}>
                            <div className="upperLeft">
                                <div className="profile">
                                    <img className="photo" src={propDetail.get('host_img_url')} alt=""/>
                                    <div className="name">{propDetail.get('host_name')}</div>
                                </div>
                                <div className="description">
                                    <div className="title">{ propDetail.get("title") }</div>
                                    <p className="location">
                                        <span style={{fontSize: 16}}>Address: </span>
                                        <span >{ propDetail.get("location") }</span>
                                    </p>
                                    <p>
                                        <span style={{marginRight: 10}}>{ `${ propDetail.get("accommodates") } guests` }</span>
                                        <span style={{marginRight: 10}}>{ `${ propDetail.get("bedrooms") } bedroom` }</span>
                                        <span>{ `${ propDetail.get("bathrooms") } bath` }</span>
                                    </p>
                                </div>
                            </div>
                            <div className="bigFonts">
                                More about the property
                            </div>
                            <Collapse defaultActiveKey={['1', '2', '3']}
                                      style={{marginBottom: 20}}>
                                <Panel header="Description" key="1">
                                    <p>{propDetail.get("description")}</p>
                                </Panel>
                                <Panel header="House rules( IMPORTANT! )" key="2">
                                    <p>{propDetail.get("house_rules")}</p>
                                </Panel>
                                <Panel header="Amenities" key="3">
                                    <span>{amenities[0]} </span>
                                    <span>{amenities[1]} </span>
                                </Panel>
                            </Collapse>
                            <div className="reviews">
                                <div className="bigFonts">Reviews</div>
                                <div className="review_num">{`${propDetail.get("reviews").size} reviews in total`}</div>
                            </div>
                            {
                                propDetail.get("reviews").map((item, index) => {
                                    return (
                                        <div key={index} style={{marginBottom: 30}}>
                                            <div style={{width: "100%", height: 60 }}>
                                                <img className="review_photo" src={item.get('head_picture')} alt=""></img>
                                                <div className="review_info">
                                                    <div style={{paddingTop: 2, color: "#ad6800", fontSize: 16, fontWeight: 600}}>{item.get("reviewer_name")}</div>
                                                    <div style={{paddingTop: 2, color: "#bfbfbf", fontSize: 12}}>{item.get("review_date")}</div>
                                                </div>
                                                
                                            </div>
                                            <div>{item.get("review_content")}</div>
                                        </div>
                                    )
                                })
                            }
                          
                        </Col>
                        <Col span={9}>
                            <div className="checkInOut">
                                <p className="checkLine">
                                    <span className="checkPrice">{propDetail.get("price")}</span>
                                    <span>per night</span>
                                </p>
                                <Form>
                                    <Form.Item label="Dates" style={{marginBottom: 10}}>
                                        {
                                            getFieldDecorator('checkInOut', {
                                                initialValue: '',
                                                rules: [ ]
                                            })( <RangePicker 
                                                    style={{width: "100%"}}
                                                    size="large"
                                                    placeholder={["Check-In", "Check-Out"]}
                                                    ranges={{ Today: [moment(), moment()], 
                                                        'This Month': [moment().startOf('month'), moment().endOf('month')]}} />)
                                        }
                                    </Form.Item>
                                    <Form.Item label="Guests" >
                                        {
                                            getFieldDecorator('guests', {
                                                initialValue: '1 Guest',
                                                rules: [],
                                            })( <Select size="large" >
                                                    {
                                                        guestNum.map(item => (
                                                            <Option key={item} value={item}>{item}</Option>
                                                        ))
                                                    }
                                                </Select>)
                                        }
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" 
                                                style={{color: "black", width: "100%", height: 42, marginTop: 20, fontSize: 20, fontWeight: "bold", backgroundColor: "#ffc53d"}}>
                                            Reserve
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <div className="checkNotes">Enter dates and number of guests to check the total trip price, including additional fees and any taxes.</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            );
        }
        return null;
    }

    UNSAFE_componentWillMount(){
        const prop_id = this.props.match.params.id;
        this.props.getPropDetail(prop_id);   
    }
}

const mapState = (state) => {
	return {
        loginStatus: state.getIn(["combo", "loginStatus"]),
        propDetail: state.getIn(["combo", "propDetail"]),
	}
}

const mapDispatch = (dispatch) => ({
    getPropDetail(property_id) {
        dispatch(actionCreators.getPropDetail(property_id))
    }
});


export default connect(mapState, mapDispatch)(Form.create()(OneProp));



