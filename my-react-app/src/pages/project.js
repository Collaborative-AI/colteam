import axios from 'axios'
import React, { useRef, useState, useEffect } from 'react'
import { useIntl } from "react-intl";
import { Flex, Tag, Input, theme, Card, Button, Empty, Spin, Checkbox, Select } from 'antd';
import './project.css';
import nature from '../assets/images/nature-1.jpg'
import colteam_logo from '../assets/images/colteam_logo.png'
import { SearchOutlined } from '@ant-design/icons';
import useTouchBottom from '../utils/useTouchBottom';
import LoadMore from '../components/LoadMore';
import { useNavigate } from 'react-router-dom';
const wantArray = (data) => (Array.isArray(data) ? data : []);
const tagsData = [
    {
        label: 'Movies',
        num: 20
    },
    {
        label: 'Books',
        num: 20
    },
    {
        label: 'Music',
        num: 20
    },
    {
        label: 'Sports',
        num: 20
    }
]
export default function Project() {
    const navigate = useNavigate();
    const {
        token: { colorPrimary, colorBgBase },
    } = theme.useToken();
    const { formatMessage: f } = useIntl();
    const [selectedTags, setSelectedTags] = useState(['Movies']);
    const pageSize = 10;
    const [current, setCurrent] = useState(1);
    const [list, setList] = useState([]);
    const [isMore, setIsMore] = useState(true);
    const [checked, setChecked] = useState(true);
    const [loadMoreStatus, setLoadMoreStatus] = useState('loadmore');
    const [loading, setLoading] = useState(false);
    const getList = (current, pageSize) => {
        setLoading(true);
        axios('').then(res => {
            setLoading(false);
            setCurrent(res?.current);
            setList([...list, ...wantArray(res?.data)]);
            if (current >= Math.round(res.total / pageSize)) { setIsMore(false) };
        }).catch(err => {
            setLoading(false);
            console.log(err);
        })
    }
    useEffect(() => { getList(current, pageSize) }, []);
    const currentRef = useRef(null);
    useEffect(() => { currentRef.current = current }, [current]);
    const loadingRef = useRef(null);
    useEffect(() => {
        loadingRef.current = loading;
        if (loading) { setLoadMoreStatus('loading') };
    }, [loading]);
    const isMoreRef = useRef(null);
    useEffect(() => {
        if (!isMore) { setLoadMoreStatus('nomore') };
        isMoreRef.current = isMore;
    }, [isMore]);

    // todo 加载更多
    const handleLoadMore = () => {
        if (!loadingRef.current && isMoreRef.current) {
            const temp = currentRef.current + 1;
            setCurrent(temp);
            getList(temp, pageSize);
        };
    };
    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
    };
    useTouchBottom(handleLoadMore)
    return (
        <div className='project-content'>
            <div className='project-header'>
                {/* <div className='project-logo'>COIAI</div> */}
                <img className='project-logo' alt="example" src={colteam_logo} />
                <div style={{ flex: 1 }}>
                    <Input suffix={
                        <SearchOutlined style={{ color: colorPrimary }} />
                    } style={{ width: '380px' }} placeholder={f({ id: 'projectSearch' })} />
                </div>
                <div className='project-create'><Button onClick={() => navigate('/new_project')}>{f({ id: 'projectCreate' })}</Button></div>
            </div>
            <div className='project-tag'>
                <Flex gap="4px 0" wrap="wrap" align="center">
                    {tagsData.map((tag) => (
                        <Tag.CheckableTag
                            key={tag.label}
                            checked={selectedTags.includes(tag.label)}
                            onChange={(checked) => handleChange(tag.label, checked)}
                        >
                            {`${tag.label}(${tag.num})`}
                        </Tag.CheckableTag>
                    ))}
                </Flex>
            </div>
            <div className='project-filter' style={{ margin: '6px 0 12px 0' }}>
                <Checkbox checked={checked}>
                    {f({ id: 'projectTop' })}
                </Checkbox>
                <Select
                    style={{ width: 180 }}
                    placeholder={f({ id: 'sort' })}
                    options={[
                        { value: 'jack', label: 'Jack' }
                    ]}
                />
            </div>
            <div className='project-detail' style={{padding: '0 46px'}}>
                <Spin size="large" spinning={loading} tip="加载中...">
                    {/* {list.length === 0 && <Empty />} */}
                    <Flex gap={28} wrap="wrap">
                        {Array.from({ length: 24 }, (_, i) => (
                            <Card
                                hoverable
                                style={{ width: 210 }}
                                onClick={() => navigate('/project_detail/123')}
                                cover={<img alt="example" src={nature} style={{ height: '120px' }} />}
                            >
                                <Card.Meta description={<div><p>www.instagram.com</p></div>} />
                            </Card>
                        ))}
                    </Flex>
                    <LoadMore status={loadMoreStatus} hidden={list.length === 0} />
                </Spin>
            </div>
        </div>
    )
}