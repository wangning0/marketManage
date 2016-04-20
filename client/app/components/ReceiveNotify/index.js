/**
 * Created by wangning on 16/4/20.
 */
import React,{Component} from 'react';
import {Collapse} from 'antd';
const Panel = Collapse.Panel;
import './index.css'

class ReceiveNotify extends Component {
    callback(key){
        console.log(key);
    }
    render(){
        return(
            <Collapse  onChange={this.callback}>
                <Panel header="催款通知" key="1">
                    <p className="time">2016-04-20</p>
                    <p>你本月的水电费和物业费还没有上交,请及时缴费!谢谢合作</p>
                </Panel>
                <Panel header="商铺申请成功" key="2">
                    <p className="time">2016-04-20</p>
                    <p>商铺申请成功</p>
                </Panel>
                <Panel header="欢迎你,注册成功" key="3">
                    <p className="time">2016-04-20</p>
                    <p>欢迎你,注册成功</p>
                </Panel>
            </Collapse>
        )
    }
}

export default ReceiveNotify;