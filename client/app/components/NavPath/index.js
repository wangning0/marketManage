/**
 * Created by wangning on 16/4/19.
 */
import React ,{Component,PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import { Breadcrumb } from 'antd'
import { connect } from 'react-redux'

class NavPath extends Component {
    constructor(props){
        super(props)
    }

    render(){
        const {navPath} = this.props;
        const bread = navPath.map((item)=>{
            return(
                <Breadcrumb.Item key={'bc-'+item.key}>{item.name}</Breadcrumb.Item>
            )
        })
        return (
            <div className="ant-layout-breadcrumb">
                <Breadcrumb>
                    <Breadcrumb.Item key='bc-0'>首页</Breadcrumb.Item>
                    {bread}
                </Breadcrumb>
            </div>
        )
    }
}
NavPath.defaultProps = {
    navPath:[]
};
NavPath.propTypes = {
    navPath :PropTypes.array
};
function mapStateToProps(state) {
    return {
        //navPath:state.
    }
}

export default connect(mapStateToProps)(NavPath);