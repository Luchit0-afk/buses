import React from 'react';
import { Form, Input, Button } from 'antd';
import { loginFetch } from './../../services/user.js';
import { modalNotification } from '../commons/Notifications.js';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.formRef = React.createRef();
    }

    onFinish = async values => {
        try {
            const isLoged = await loginFetch( values );
            if( !!isLoged.success ){
                if( !!isLoged.msg ){
                    modalNotification("warning", isLoged.msg.toString() );
                }
                else{
                    modalNotification("success", "You are login successfuly");
                }
            }
            else{
                modalNotification("error", isLoged.msg.toString() );
            }
        } catch(error) {
            console.log(error);
            modalNotification("error", error.toString());
        }
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
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input a username"
                                }
                            ]}>
                                <Input type="text" />
                        </Form.Item>
                        {/* <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input a email"
                                }
                            ]}>
                                <Input type="email" />
                        </Form.Item> */}
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input a password"
                                }
                            ]}>
                                <Input type="password"/>
                        </Form.Item>
                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit">
                                    Log In
                            </Button>
                        </Form.Item>
                </Form>
            </div>
        )
    }
}

export default (LogIn);