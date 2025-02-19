
import { Layout } from 'antd';
import React from 'react';
import Navbar from '../components/navbar'
import { Outlet } from "react-router-dom";
const { Content, Footer } = Layout;
export default function () {
    return <Layout>
        <Navbar />
        <Content style={{ padding: '90px 188px 24px', background: '#fff', boxSizing: 'border-box' }}>
            <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center', background: '#fff', padding: '46px 24px 33px', borderTop: '1px solid #eee' }}>
            <div style={{ display: 'flex', marginBottom: '20px', justifyContent: 'center' }}>
                <div className='footer-list'>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }} className='footer-item'>网站</div>
                    {/* <div className='footer-item'>数据</div>
                    <div className='footer-item'>学习</div> */}
                    <div className='footer-item'>项目</div>
                </div>
                <div className='footer-list'>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }} className='footer-item'>公司</div>
                    <div className='footer-item'>关于</div>
                    <div className='footer-item'>服务条款</div>
                    <div className='footer-item'>隐私</div>
                    <div className='footer-item'>加入我们</div>
                </div>
            </div>

            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    </Layout>
}
// export default Layouts