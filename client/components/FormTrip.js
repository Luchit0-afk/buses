import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';

class FormTrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.formRef = React.createRef();
    }

    onFinish = values => {
        console.log(values)
    }

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
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
                                <Input>
                                </Input>
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
                                <Input>
                                </Input>
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
                                <Input>
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