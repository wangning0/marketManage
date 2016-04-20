/**
 * Created by wangning on 16/4/20.
 */
import React,{Component} from 'react';
import  {Button,Form,Input,Select} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

function noop(){
    return false;
}

class Utility extends Component{
    constructor (props){
        super(props);
    }
    componentWillReceiveProps(nextProps){
        //在这里判断是否充值成功

        if (true){
            message.success('充值成功');
        } else if(true){
            message.error('充值失败');
        }
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

    checkNumber(rule,value,callback) {
        if(!value){
            callback()
        } else if( value && !Number(value) ){
            callback([new Error('请输入数字')]);
        } else {
            callback();
        }

    }

    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;


        const chooseShopProps = getFieldProps('chooseShop', {
            rules: [
                { required: true,  message: '必须要选择商铺哦~' }
            ]
        });

        const payMoneyProps = getFieldProps('payMoney',{
            rules:[
                {required:true,message:'必须填写充值金额~'},
                {validator:this.checkNumber}
            ]
        });

        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 4 }
        };
        return (
            <div className="ant-layout-applyShop">
                <Form horizontal form={this.props.form}>
                    <FormItem
                        labelCol={{span:7}}
                        wrapperCol={{span:4}}
                        label="选择商铺"
                    >
                        <Select showSearch
                                style={{ width: '100%' }}
                                placeholder="请选择商铺"
                                optionFilterProp="children"
                                notFoundContent="无法找到"
                                searchPlaceholder="输入关键词"
                                onChange={this.handleChange}
                            {...chooseShopProps}
                        >
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
                        label="充值金额"
                        hasFeedback
                        required
                        help={isFieldValidating('payMoney') ? ' ' : (getFieldError('payMoney') || []).join(', ')}>
                        <Input {...payMoneyProps}  placeholder="请输入充值的金额"  />
                    </FormItem>
                    <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
Utility = createForm()(Utility);

export default Utility;