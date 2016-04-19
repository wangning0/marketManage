/**
 * Created by wangning on 16/4/18.
 */
import { Button, Form, Input,Row,Col } from 'antd';
import 'antd/lib/index.css';
const createForm = Form.create;
const FormItem = Form.Item;
import React from 'react';
function noop() {
    return false;
}

class Register extends React.Component {
    constructor(props){
        super(props)
    }
    componentWillReceiveProps(nextProps){
        //弹出框判断是否注册成功
       /* const error = nextProps.RegisterErrors;
        const isRegistering = nextProps.isRegistering;

        if (error != this.props.RegisterErrors && error) {
            notification.error({
                message: 'Register Fail',
                description: error
            });
        }

        if (!isRegistering && !error)  {
            notification.success({
                message: 'Login Success',
                description: 'Welcome ' + user
            });
            this.context.router.replace('/login');
        }*/

    }

    getValidateStatus(field) {
        const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

        if (isFieldValidating(field)) {
            return 'validating';
        } else if (!!getFieldError(field)) {
            return 'error';
        } else if (getFieldValue(field)) {
            return 'success';
        }
    }

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
        });
    }

    userExists(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (value === 'JasonWood') {
                    callback([new Error('抱歉，该用户名已被占用。')]);
                } else {
                    callback();
                }
            }, 800);
        }
    }

    checkPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePasswd']);
        }
        callback();
    }

    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('passwd')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const nameProps = getFieldProps('name', {
            rules: [
                { required: true, min: 5, message: '用户名至少为 5 个字符' },
                { validator: this.userExists }
            ]
        });

        const passwdProps = getFieldProps('passwd', {
            rules: [
                { required: true, whitespace: true, message: '请填写密码' },
                { validator: this.checkPass.bind(this) },
            ]
        });
        const rePasswdProps = getFieldProps('rePasswd', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            }, {
                validator: this.checkPass2.bind(this),
            }]
        });
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 8 },
        };
        return (
            <div>
                <Row>
                    <Col span="12">
                        <Form horizontal form={this.props.form}>
                            <FormItem
                                {...formItemLayout}
                                label="用户名："
                                hasFeedback
                                help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}>
                                <Input {...nameProps} placeholder="请输入用户名" />
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="密码："
                                hasFeedback>
                                <Input {...passwdProps} type="password" autoComplete="off"
                                                        onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} placeholder="请输入密码"/>
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="确认密码："
                                hasFeedback>
                                <Input {...rePasswdProps} type="password" autoComplete="off" placeholder="请重复输入密码"
                                                          onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
                            </FormItem>

                            <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                                <Row>
                                    <Col span="8"> <Button type="primary" onClick={this.handleSubmit.bind(this)}>登录</Button></Col>
                                    <Col span="8"><Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button></Col>
                                </Row>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

Register = createForm()(Register);

export default Register;