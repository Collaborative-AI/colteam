import "./css/info.css"
import { Button } from 'antd';
export default () =>{
    return (
        <div>
        <div className="info-top" style={{padding:"20px"}}>
            <img src="//game.gtimg.cn/images/lol/act/img/champion/Khazix.png"></img>
            <div className="user-info">
                <div>用户名</div>
                <div>unique id: 111111</div>
            </div>
                <Button type="link">编辑</Button>
        </div>
        <div className="user-title">个人信息</div>
        <div className="info-item">
            <div className="label">
                邮箱：333333333
            </div>
            <Button type="link">编辑</Button>
        </div>
        <div className="info-item">
            <div className="label">
                电话：13111111111
            </div>
            <Button type="link">添加</Button>
        </div>
        <div className="info-item">
            <div className="label">
                研究兴趣：<Button style={{marginLeft:"15px"}}>AI</Button><Button style={{marginLeft:"15px"}}>区块链</Button>
            </div>
            <Button type="link">编辑</Button>
        </div>
        <div className="info-item">
            <div className="label">
                地址：333333333
            </div>
            <Button type="link">编辑</Button>
        </div>
        <div className="info-item">
            <div className="label">
                时区：333333333
            </div>
            <Button type="link">编辑</Button>
        </div>
        <div className="info-item">
            <div className="label">
                语言：333333333
            </div>
            <Button type="link">编辑</Button>
        </div>
        </div>
    )
}