import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import styles from './ActivityDetail.module.css'
import bg from '../../images/icon_detail.png'
import share from '../../images/icon_share.png'
import address from '../../images/icon_address.png'
import time from '../../images/icon_time.png'
import price from '../../images/icon_price.png'
// import BScroll from 'better-scroll'
import { Button,Flex } from 'antd-mobile';


import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
//action
import { setBottomstatusAction } from '../../store/action/App';


class ActivityDetail extends Component {

    componentDidMount() {
        const wrapper = document.querySelector('.wrapper')
        // const scroll = new BScroll(wrapper, { click: true, scrollY: true })

        //actions  隐藏底部状态栏
        this.props.actions.setBottomstatus(true);
    }

    
    render() {
        //搜索框高度
        const searchbarHeight = 25;
        //空白区域高度
        const whitespaceHeight = 9;
        //账户信息高度
        const accountInfoHeight = 42;
        //最后+26是因为直接按照前面的减去之后会有一部分留白区域,多种机型上都是26,就加上这个26[**暂时不清楚什么原因**]
        const height = parseInt(window.innerHeight)-searchbarHeight-whitespaceHeight-accountInfoHeight;

        return (
            <div className={styles.activityDetail}>
                <TopBar></TopBar>
                <Flex>
                    <div className={styles.wrapper} style={{height:''+height+'px'}}>
                        {/** 活动图片 */}

                        <div className={styles.activityBg}>
                            <img src={bg} alt=""></img>
                        </div>
                        {/** 活动名称 */}
                        <div className={styles.shareName}>
                            <span className={styles.detailName}>Event Name</span>
                            <img src={share} className={styles.shareIcon}></img>
                        </div>
                        {/** 地址 */}
                        <div className={styles.addressView}>
                            <img src={address} className={styles.addressIcon}></img>
                            <span className={styles.addressText}>Location detail</span>
                        </div>
                        {/** 日期*/}
                        <div className={styles.addressView}>
                            <img src={time} className={styles.timeIcon}></img>
                            <span className={styles.timeText}>Date + start time</span>
                        </div>
                        {/** 金额*/}
                        <div className={styles.priceView}>
                            <img src={price} className={styles.timeIcon}></img>
                            <span className={styles.priceText}>180-360</span>
                            <span className={styles.priceUnitText}>NMT</span>
                        </div>
                        {/** 活动的主办单位信息 */}
                        <span className={styles.actionName}>Sponsor</span>
                        <div className={styles.actionView}>
                            <div className={styles.fillet}>
                                <span className={styles.topText}>A</span>
                            </div>
                            <span className={styles.actionAuth}> Adorine</span>

                        </div>
                        {/** 活动的描述信息 */}
                        <span className={styles.actionName}>Discription</span>
                        <div clclassName={styles.descContent}>
                            <span className={styles.descInfo}>
                                33242342423423432423354345345345345334
                                534543
                            </span>
                        </div>
                        {/** 购买按钮 */}
                        <Button type="primary" className={styles.buyTicket}>Buy Ticket</Button>
                    </div>
                </Flex>

            </div>

        )
    }
}

//获取最新的store里的状态，通过this.props获取
const mapStateToProps = (state)=>{
    return {
        app:state.app
    }
  }
  //更新状态提交到store
  const mapDispatchToProps = (dispatch)=>{
    return {
        actions:bindActionCreators({
          setBottomstatus:setBottomstatusAction
        },dispatch)
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ActivityDetail);
