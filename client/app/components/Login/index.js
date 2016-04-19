/**
 * Created by wangning on 16/4/18.
 */
import { Button, Form, Input,Row,Col,notification } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
import React from 'react';
function noop() {
    return false;
}
//还缺少校验帐号密码的信息
class Login extends React.Component {
    constructor(props){
        super(props)
    }
    componentWillReceiveProps(nextProps){
        //Login成功或者失败
        /*const error = nextProps.loginErrors;
        const isLogingIn = nextProps.loginingIn;
        const user = nextProps.user;
        const isSuperadmin = nextProps.isSuperadmin;

        if( error!= this.props.loginErrors && error ){
            notification.error({
                message:'Login Fail',
                description:error
            })
        }

        if( !isLogingIn && !error && user ){
            notification.success({
                message:'Login Success',
                description:'Welcome' + user
            })
        }

        if( isSuperadmin ){
            this.context.router.replace('/superadmin');
        } else {
            this.context.router.replace('/admin');
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
        console.log(1)
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


    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const nameProps = getFieldProps('name', {
            rules: [
                { required: true, message: '请输入用户名' }
            ]
        });

        const passwdProps = getFieldProps('passwd', {
            rules: [
                { required: true, whitespace: true, message: '请填写密码' }
            ]
        });

        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 8 }
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
                                <Input {...nameProps}  placeholder="请输入用户名" />
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="密码："
                                hasFeedback>
                                <Input {...passwdProps}  type="password" autoComplete="off"
                                                        onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} placeholder="请输入密码"/>
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

Login = createForm()(Login);

export default Login;