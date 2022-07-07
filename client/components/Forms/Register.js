import React from 'react';
import { Form, Input, Button } from 'antd';
import { registerFetch } from './../../services/user.js';
import { modalNotification } from '../commons/Notifications.js';
import { login } from './../../utils/auth.js';
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.formRef = React.createRef();
    }

    onFinish = async values => {
        try {
            //Tal vez deberia ser mas robusto esto, en caso de que falle el registerFetch
            const { token } = await registerFetch( values );
            await login({ token });
            // if( !!data.success ){
            //     console.log(data);
            //     await setState(oldValues => {
            //         return { ...oldValues, token: data.token }
            //       })
            //     console.log(this.context);
            //     //Working bad, if register a user not charge the token in the context.
            //     //The second chance, the token is charged
            //     modalNotification("success", "The user has been charged");
            // }
            // else{
            //     modalNotification("error", "Something went wrong when try to register.");
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