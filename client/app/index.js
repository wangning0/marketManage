/**
 * Created by wangning on 16/4/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Register from './components/Register/index';
import Login from './components/Login/index';
import Header from './components/Header/index';
import SliderBar from './components/SliderBar/normalAdminSlider/index';
import SuperSliderBar from './components/SliderBar/superAdminSlider/index'
import NavPath from './components/NavPath/index';
import Footer from './components/Footer/index';
import ShowInfos from './components/Home/normalAdmin/index';
import SuperAdminShowInfos from './components/Home/superAdmin/index';
import ApplyShop from './components/ApplyShops/index';
import Utility from './components/Pay/Utility/index';
import ReceiveNotify from './components/ReceiveNotify/index';
import SendNotify from './components/SendNotify/index';

import 'antd/lib/index.css';
let rootElement = document.getElementById('app');
ReactDOM.render(
    <div>
        <Header user="王宁"></Header>
        <SliderBar></SliderBar>
        <SuperSliderBar></SuperSliderBar>
        <Register></Register>
        <Login></Login>
        <Footer></Footer>
        <ShowInfos></ShowInfos>
        <SuperAdminShowInfos></SuperAdminShowInfos>
        <Utility></Utility>
        <ReceiveNotify></ReceiveNotify>
        <SendNotify></SendNotify>
    </div>,
    rootElement
);