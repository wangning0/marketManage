/**
 * Created by wangning on 16/4/19.
 */
import React, {Component} from 'react';
import {Select, Button, Form, Input} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

function noop() {
    return false;
}
class ApplyShop extends Component {
    handleChange(value){
        console.log(`selected ${value}`);
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
    render() {
        const formItemLayout = {
            labelCol:{span:7},
            wrapperCol:{span:8}
        };
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const textareaProps = getFieldProps('textarea', {
            rules: [
                { required: true, message: '申请理由必须要写的噢~' },
            ]
        });
        //const chooseShopProps = getFieldProps('')
        return (
            <div className="ant-layout-applyShop">
                <Form horizontal form={this.props.form}>
                    <FormItem
                        {...formItemLayout}
                        label="选择商铺"
                        hasFeedback
                    >
                        <Select showSearch
                                style={{width:200}}
                                placeholder="请选择人员"
                                optionFilterProp="children"
                                notFoundContent="无法找到"
                                searchPlaceholder="输入关键词"
                                onChange={this.handleChange}>
                            <Option value="1_1">一楼1铺</Option>
                            <Option value="1_2">一楼2铺</Option>
                            <Option value="1_3">一楼3铺</Option>
                            <Option value="1_4">一楼4铺</Option>
                            <Option value="1_5">一楼5铺</Option>
                            <Option value="2_1">二楼1铺</Option>
                            <Option value="2_2">二楼2铺</Option>
                            <Option value="2_3">二楼3铺</Option>
                            <Option value="2_4">二楼4铺</Option>
                            <Option value="2_5">二楼5铺</Option>
                            <Option value="3_1">三楼1铺</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="商铺名称"
                        hasFeedback
                    >
                        <Input  type="text" placeholder="请输入申请商铺的名称" />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="申请人"
                        hasFeedback
                    >
                        <Input  type="text" placeholder="请输入申请人的姓名" />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="申请人"
                        hasFeedback
                    >
                        <Input  type="text" placeholder="请输入申请人的姓名" />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="申请理由"
                        hasFeedback
                    >
                        <Input {...textareaProps} type="textarea"  placeholder="请输入申请理由" id="textarea" name="textarea"/>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default ApplyShop;