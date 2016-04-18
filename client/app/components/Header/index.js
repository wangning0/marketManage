/**
 * Created by wangning on 16/4/18.
 */
import React, {Component} from 'react';
import {Icon,Menu,Row,Col} from 'antd';
import {Link} from 'react-router';
import 'antd/lib/index.css';
const SubMenu = Menu.SubMenu;
import './index.css'
export default class Header extends Component{
    constructor(props){
        super(props);
    }
    handleClick(e){

    }
    render(){
        const {user} = this.props;
        return(
            <div className="ant-layout-header">
                <Menu onClick={this.handleClick} mode="horizontal" className="header-menu" >
                    <SubMenu title={<span><Icon type="user"></Icon>{user}</span>}>
                        <Menu.Item key="setting:1">修改密码</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="setting:2">注销</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}