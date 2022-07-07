import React from 'react';
import { Form, Input, Button } from 'antd';
import { loginFetch } from './../../services/user.js';
import { modalNotification } from '../commons/Notifications.js';
import { login } from './../../utils/auth.js';
import Router from 'next/router';
class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.formRef = React.createRef();
    }

    onFinish = async values => {
        try {
            const { token, success } = await loginFetch( values );
            if( !!success ){
                await login({ token });
                modalNotification("success", "Successfuly login");
                Router.push("/");
            }
            else{
                //Tal vez hay otras posibilidades de error,
                modalNotification("warning", "The email and password can't be registed.", "Please, register");
            }
        } catch(error) {
            console.log(error);
            //Tal vez hay otras posibilidades de error,
            modalNotification("warning", "The email and password can't be registed.", "Please, register o try again.");
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
                        {/* <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input a username"
                                }
                            ]}>
                                <Input type="text" />
                        </Form.Item> */}
                        <Form.Item
                            label="Email"
                            // Changes username to email
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input a email"
                                }
                            ]}>
                                <Input type="email" />
                        </Form.Item>
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