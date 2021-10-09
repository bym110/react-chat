import React, { useEffect} from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import $http from "../../axios";
import './style.less'

function Login(props) {
    const ref = React.useRef();
    const onFinish = (values)=> {
        $http.post('/api/login', values).then(res=> {
            if (res.code === 0) {
                localStorage.setItem('remember',values.remember);
                localStorage.setItem('username',values.username);
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('account', res.data.account);
                props.history.push('/recent')
            }

        })
    }
    useEffect(function () {
        const remember = localStorage.getItem('remember');
        const username = localStorage.getItem('username');
        if (remember === 'true') {
            ref.current.setFieldsValue({remember: true, username})
        }
        if (sessionStorage.getItem('token')) {
            props.history.push('/recent')
        }
    }, []) // eslint-disable-line
    return (
        <div className="login">
            <Form
                name="basic"
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: false }}
                onFinish={onFinish}
                autoComplete="off"
                ref={ref}
            >
                <div className="login-title">登录</div>
                <Form.Item
                    label=""
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input size="large" placeholder="输入用户名" />
                </Form.Item>

                <Form.Item
                    label=""
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password size="large" placeholder="输入密码" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 24 }}>
                    <Checkbox>记住用户名</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset:0, span: 24 }}>
                    <Button type="primary" htmlType="submit" size="large">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Login