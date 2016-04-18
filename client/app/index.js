/**
 * Created by wangning on 16/4/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Register from './components/Register/index';
import Login from './components/Login/index';
import Header from './components/Header/index';
import 'antd/lib/index.css';
let rootElement = document.getElementById('app');
ReactDOM.render(
    <div>
        <Header user="王宁"></Header>
        <Register></Register>
        <Login></Login>
    </div>,
    rootElement
);