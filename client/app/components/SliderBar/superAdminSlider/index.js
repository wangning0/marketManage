/**
 * Created by wangning on 16/4/19.
 */
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
const MenuItemGroup = Menu.ItemGroup;

class SliderBar extends Component{

    render(){
        return(
            <Menu style={{width:240}} mode="inline">
                <Menu.Item key="home">
                    <Link to="/superAdmin"><Icon type="home"></Icon><span>首页</span></Link>
                </Menu.Item>
                <Menu.Item key="notice">
                    <Link to="/superAdmin/notice"><Icon type="mail"></Icon><span>发送通知</span></Link>
                </Menu.Item>
                <SubMenu key="pay" title={<span><Icon type="appstore"></Icon><span>商铺管理</span></span>}>
                    <Menu.Item key="usedMShops">
                        <Link to="/superAdmin/usedMShops">已有商铺</Link>
                    </Menu.Item>
                    <Menu.Item key="checkApply">
                        <Link to="/superAdmin/checkApply">商铺申请审核</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="" title={<span><Icon type="pay-circle"></Icon><span>缴费管理</span></span>}>
                    <Menu.Item key="notPay">
                        <Link to="/superAdmin/notPay">未缴费商铺</Link>
                    </Menu.Item>
                    <Menu.Item key="payMoneyMan">
                        <Link to="/superAdmin/payMoneyMan">缴费费用管理</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

export default SliderBar;