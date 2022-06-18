import React from 'react';
import { Form, Input, Button, Select, TimePicker } from 'antd';
import { newTrip } from './../services/main.js';
import { modalNotification } from './commons/Notifications.js';

const mapToSelectOptions = (cities) => {
    return cities.map((city) => {
        return { 
            label: city.name, 
            value: city._id 
        }
    })
}
class FormTrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.formRef = React.createRef();
    }

    onFinish = async values => {
        const cant_passengers_total = parseInt(values.cant_passengers_total);
        if (!Number.isInteger( cant_passengers_total )){
            modalNotification("error", "The limit passengers has be a number and integer");
        }
        else {
            try {
                await newTrip({
                    ...values,
                    cant_passengers_total,
                });
                modalNotification("success", "The trip has been charged");
            } catch(error) {
                console.log(error);
                modalNotification("error", error.toString());
            }
             
        }
    }

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const { cities } = this.props;
        return(
            <div>
                <Form
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}>
                        <Form.Item
                            label="Departure City"
                            name="departure_city"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the departure city"
                                }
                            ]}>
                                <Select
                                    options={mapToSelectOptions(cities)}
                                />
                        </Form.Item>
                        <Form.Item
                            label="Arrival City"
                            name="arrival_city"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the arrival city"
                                }
                            ]}>
                                <Select
                                    options={mapToSelectOptions(cities)}
                                />
                        </Form.Item>
                        <Form.Item
                            label="Departure Time"
                            name="departure_time"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the departure time."
                                }
                            ]}>
                                <TimePicker
                                    format="HH:mm"
                                />
                        </Form.Item>
                        <Form.Item
                            label="Arrival Time"
                            name="arrival_time"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the arrival time."
                                }
                            ]}>
                                <TimePicker
                                    format="HH:mm"
                                />
                        </Form.Item>
                        <Form.Item
                            label="Limit passengers"
                            name="cant_passengers_total"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input how many passengers can travel"
                                }
                            ]}>
                                <Input >
                                </Input>
                        </Form.Item>
                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit">
                                    Submit
                            </Button>
                        </Form.Item>
                </Form>
            </div>
        )
    }
}

export default (FormTrip);