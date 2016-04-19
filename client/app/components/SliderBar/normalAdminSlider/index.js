/**
 * Created by wangning on 16/4/19.
 */
/**
 * Created by wangning on 16/4/18.
 */
import React,{Component} from 'react';
import {Menu,Icon} from 'antd';
import {Link} from 'react-router';

const SubMenu = Menu.SubMenu;

class SliderBar extends Component{

    render(){
        return(
            <Menu style={{width:240}} mode="inline">
                <Menu.Item key="home">
                    <Link to="/admin"><Icon type="home"></Icon><span>首页</span></Link>
                </Menu.Item>
                <Menu.Item key="notify">
                    <Link to="/admin/notify"><Icon type="mail"></Icon><span>通知</span></Link>
                </Menu.Item>
                <Menu.Item key="applyShops">
                    <Link to="/admin/applyShops"><Icon type="team"></Icon><span>申请店铺</span></Link>
                </Menu.Item>
                <SubMenu key="pay" title={<span><Icon type="appstore"></Icon><span>充值</span></span>}>
                    <Menu.Item key="payWatEle">
                        <Link to="/admin/payWatEle">水电费</Link>
                    </Menu.Item>
                    <Menu.Item key="payKfs">
                        <Link to="/admin/payKfs">物业费</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

export default SliderBar;