import React from 'react';
import { Form, Input, Button } from 'antd';
import { registerFetch } from './../../services/user.js';
import { modalNotification } from '../commons/Notifications.js';
import { login } from './../../utils/auth.js';
import Router from 'next/router';
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.formRef = React.createRef();
    }

    onFinish = async values => {
        try {
            const { token, success, msg } = await registerFetch( values );
            if( !!success ){
                await login({ token });
                modalNotification("success", "Successfuly register");
                Router.push("/");
            }
            else{
                modalNotification("error", msg);
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
                        {/* Todavia no esta implementado guardar username en la base de datos */}
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
                                    Register
                            </Button>
                        </Form.Item>
                </Form>
            </div>
        )
    }
}

export default (Register);