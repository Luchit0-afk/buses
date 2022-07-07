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
            //Tal vez deberia ser mas robusto esto, en caso de que falle el loginFetch
            const { token } = await loginFetch( values );
            await login({ token });
            Router.push("/");
            // if( !!data.success ){
            //     console.log(data);
            //     setState(oldValues => {
            //         return { ...oldValues, token: data.token }
            //       })
            //     //Working well, clean de fucking code

            //     // if( !!isLoged.msg ){
            //     //     modalNotification("warning", isLoged.msg.toString() );
            //     // }
            //     // else{
            //     //     modalNotification("success", "You are login successfuly");
            //     // }
            // }
            // else{
            //     modalNotification("error", "Something went wrong when try to login.");
            //     // modalNotification("error", isLoged.msg.toString() );
            // }
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