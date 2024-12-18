import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import {
  Flex,
  Tag,
  Input,
  theme,
  Card,
  Button,
  Empty,
  Spin,
  Checkbox,
  Select,
} from "antd";
import "./project.css";
import nature from "../../assets/images/nature-1.jpg";
import colteam_logo from "../../assets/images/colteam_logo.png";
import { SearchOutlined } from "@ant-design/icons";
import useTouchBottom from "../../utils/useTouchBottom";
import { getToken } from "../../utils";

import LoadMore from "../LoadMore";
import { useNavigate } from "react-router-dom";
const wantArray = (data) => (Array.isArray(data) ? data : []);
const tagsData = [
  {
    label: "Movies",
    num: 20,
  },
  {
    label: "Books",
    num: 20,
  },
  {
    label: "Music",
    num: 20,
  },
  {
    label: "Sports",
    num: 20,
  },
];
export default function Project() {
  const navigate = useNavigate();
  const {
    token: { colorPrimary, colorBgBase },
  } = theme.useToken();
  const { formatMessage: f } = useIntl();
  const [selectedTags, setSelectedTags] = useState(["Movies"]);
  const pageSize = 10;
  const [current, setCurrent] = useState(1);
  const [list, setList] = useState([]);
  const [isMore, setIsMore] = useState(true);
  // 搜索关键字
  const [keyword, setKeyWord] = useState("");
  const [checked, setChecked] = useState(true);
  const [loadMoreStatus, setLoadMoreStatus] = useState("loadmore");
  const [loading, setLoading] = useState(false);
  const getList = (current, pageSize) => {
    setLoading(true);
    axios("http://localhost:8000/projects/detail/view_my", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => {
        setLoading(false);
        setCurrent(res?.current);
        setList(res.data.results);
        if (current >= Math.round(res.total / pageSize)) {
          setIsMore(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    getList(current, pageSize);
  }, []);
  const currentRef = useRef(null);
  useEffect(() => {
    currentRef.current = current;
  }, [current]);
  const loadingRef = useRef(null);
  useEffect(() => {
    loadingRef.current = loading;
    if (loading) {
      setLoadMoreStatus("loading");
    }
  }, [loading]);
  const isMoreRef = useRef(null);
  useEffect(() => {
    if (!isMore) {
      setLoadMoreStatus("nomore");
    }
    isMoreRef.current = isMore;
  }, [isMore]);
  // 监听关键字
  useEffect(() => {
    if(keyword){
        axios.post("http://localhost:8000/projects/search?search_term="+keyword,{search_term:keyword}, {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          })
            .then((res) => {
              setLoading(false);
              setCurrent(res?.current);
              setList(res.data.results);
              if (current >= Math.round(res.total / pageSize)) {
                setIsMore(false);
              }
            })
            .catch((err) => {
              setLoading(false);
            });
    }
  }, [keyword]);
  // todo 加载更多
  const handleLoadMore = () => {
    if (!loadingRef.current && isMoreRef.current) {
      const temp = currentRef.current + 1;
      setCurrent(temp);
      getList(temp, pageSize);
    }
  };
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  useTouchBottom(handleLoadMore);
  return (
    <div className="project-content">
      <div
        style={{ textAlign: "center", fontSize: "24px", lineHeight: "40px" }}
      >
        我的项目
      </div>
      <div className="project-header" style={{ marginBottom: "15px" }}>
        {/* <div className='project-logo'>COIAI</div> */}
        <img className="project-logo" alt="example" src={colteam_logo} />
        <div style={{ flex: 1 }}>
          <Input
            defaultValue={keyword}
            onChange={(e) => setKeyWord(e.target.value)}
            suffix={<SearchOutlined style={{ color: colorPrimary }} />}
            style={{ width: "380px" }}
            placeholder={f({ id: "projectSearch" })}
          />
        </div>
        {/* <div className='project-create'><Button onClick={() => navigate('/new_project')}>{f({ id: 'projectCreate' })}</Button></div> */}
      </div>

      <div className="project-detail" style={{ padding: "0 46px" }}>
        <Spin size="large" spinning={loading} tip="加载中...">
          {/* {list.length === 0 && <Empty />} */}
          <Flex gap={28} wrap="wrap">
            {list.map((item, index) => {
              return (
                <Card
                  key={item.id}
                  hoverable
                  style={{ width: 210 }}
                  onClick={() => navigate("/new_project?id=" + item.id)}
                  cover={
                    <img
                      alt="example"
                      src={nature}
                      style={{ height: "120px" }}
                    />
                  }
                >
                  <Card.Meta
                    description={
                      <div>
                        <p>{item.website}</p>
                      </div>
                    }
                  />
                </Card>
              );
            })}
          </Flex>
          {/* <LoadMore status={loadMoreStatus} hidden={list.length === 0} /> */}
        </Spin>
      </div>
    </div>
  );
}
