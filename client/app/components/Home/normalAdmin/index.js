/**
 * Created by wangning on 16/4/19.
 */
import React,{Component} from 'react';
import {Table} from 'antd';
import './index.css'
const columns = [{
    title:'店铺位置',
    dataIndex:'shopLocation',
    className:'column-shopLocation',
    filters:[{
        text:'一楼店铺',
        value:'一楼'
    },{
        text:'二楼店铺',
        value:'二楼'
    },{
        text:'三楼店铺',
        value:'三楼'
    },{
        text:'四楼店铺',
        value:'四楼'
    }],
    onFilter:(value,record)=>record.shopLocation.slice(0,2) === value
},{
    title:'店铺名称',
    className:'column-shopName',
    dataIndex:'shopName'
},{
    title:'本月水电费',
    className:'column-utility',
    dataIndex:'utility'
},{
    title:'本月物业费',
    className:'column-kfs',
    dataIndex:'kfs'
},{
    title:'拥有者',
    className:'column-owner',
    dataIndex:'owner'
},{
    title:'操作',
    className:'column-operate',
    dataIndex:'',
    render:()=> <a href="#">删除店铺</a>
}];
const data = [{
    key:'1',
    shopLocation:'一楼1铺',
    shopName:'王宁的店',
    utility:'未缴费',
    kfs:'未缴费',
    owner:'王宁'
},{
    key:'2',
    shopLocation:'一楼2铺',
    shopName:'哈哈的店',
    utility:'未缴费',
    kfs:'未缴费',
    owner:'王宁'
},{
    key:'3',
    shopLocation:'一楼3铺',
    shopName:'啦啦啦的店',
    utility:'未缴费',
    kfs:'未缴费',
    owner:'王宁'
},{
    key:'4',
    shopLocation:'二楼3铺',
    shopName:'某某某的店',
    utility:'未缴费',
    kfs:'未缴费',
    owner:'王宁'
}];
function onChange(pagination, filters, sorter) {
    // 点击分页、筛选、排序时触发
    console.log('各类参数是', pagination, filters, sorter);
}
export default class ShowInfos extends Component {
    render(){
        return(
            <Table columns={columns} dataSource={data} bordered onChange={onChange}></Table>
        )
    }
}
