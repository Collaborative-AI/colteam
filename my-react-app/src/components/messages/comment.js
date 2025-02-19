import React, { useRef, useState } from 'react'
import "./css/comment.css"
import { Card, Empty } from "antd";
// 当前用户数据
const user = {
    uid: "10009",
    // avatar,
    uname: "jock"
  }
  
  // 导航
  const tabs = [
    {
      name: "最新",
      id: 1
    },
    {
      name: "最热",
      id: 2
    },
  ]
  // 评论列表
  const comment_list = [
    {
      id: "1",
      content: "真不错",
      time: "2020/1/1 12:00:00",
      like: 1,
      user: {
        uid: "10029",
        // avatar,
        uname: "jock"
      }
    },
    {
      id: "2",
      content: "没毛病",
      time: "2020/11/01 12:00:00",
      like: 3,
      user: {
        uid: "10009",
        // avatar,
        uname: "jock"
      }
    },
    {
      id: "3",
      content: "真棒",
      time: "2020/8/21 12:00:00",
      like: 10,
      user: {
        uid: "10008",
        // avatar,
        uname: "alen"
      }
    },
  ]
  

export default function () {
    const [list, setList] = useState(comment_list.sort((a, b) => new Date(b.time) - new Date(a.time)));
    const [type, setType] = useState(1);
    const [content, setContent] = useState("");
    const inputRef = useRef();
  
    // tab切换
    const handleChange = (id) => {
      setType(id)
      if (id === 1) {
        setList(list.sort((a, b) => new Date(b.time) - new Date(a.time)))
      } else {
        setList(list.sort((a, b) => b.like - a.like))
      }
    }
    //发布
    const handleSend = () => {
      setList([...list, {
        id: Math.random().toString().slice(2),
        content,
        time: new Date().toLocaleString(),
        like: 0,
        user
      }])
      setContent("");
      inputRef.current.focus();
    }
    // 删除
    const handleDel = (id) => {
      setList(list.filter(item => item.id !== id))
    }
    return (
        <Card style={{minHeight:"500px"}}>

      <div className='comment-box'>
        {/* 导航栏 */}
        <div className='comment-tabs'>
          <div className='tabs-left'>
            <p>评论<span>{list.length}</span></p>
          </div>
          <div className='tabs-right'>
            {
              tabs.map(item =>
                <div key={item.id} onClick={() => handleChange(item.id)} className={item.id === type ? 'active' : ''}>{item.name} <span></span></div>
              )
            }
          </div>
        </div>
        <div className='comment-wrap'>
          {/* 发表评论 */}
          <div className='comment-send'>
            <div className='avatar'>
              {/* <img src={user.avatar} alt='' /> */}
            </div>
            <textarea className='content' ref={inputRef} value={content} onChange={(e) => setContent(e.target.value)} placeholder='下面我简单说两句' />
            <div className='button' onClick={() => handleSend()}>发布</div>
          </div>
          {/* 评论列表 */}
          <div className='comment-list'>
            {
              list.map(item =>
                <div className='comment-item' key={item.id}>
                  <div className='avatar'>
                    {/* <img src={item.user.avatar} alt='' /> */}
                  </div>
                  <div className='right'>
                    <p className='username'>{item.user.uname}</p>
                    <p className='content'>{item.content}</p>
                    <p>
                      <span className='time'>{item.time}</span>
                      <span className='like'>点赞数: {item.like}</span>
                      {item.user.uid === user.uid && <span className='delete' onClick={() => handleDel(item.id)}>删除</span>}
                    </p>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
      </Card>

    )
  }
  
  