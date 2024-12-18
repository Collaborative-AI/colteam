import "./css/api.css"
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import {useState} from "react"
import Add from "./components/add"
export default function(){
    const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
    return (
        <div>
            <div className="api-title">API KEYS</div>
            <div className="api-desc">文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字
            描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述</div>
            <div className="list">
                <div className="item">姓名</div>
                <div className="item">secret key</div>
                <div className="item">创建日期</div>
                <div className="item">权限</div>
            </div>
            <div className="line"></div>
            <div className="list">
                <div className="item">XXX</div>
                <div className="item">123*******789</div>
                <div className="item">XX年XX月XX日</div>
                <div className="item">所有</div>
            </div>
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />} >
        申请
      </Button>

      <Modal title="申请新key" okText="确认"
        cancelText="取消" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Add></Add>
      </Modal>
        </div>

    )
}