import React, { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import AuthContext from "../AuthProvider.component";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
  Switch,
  Upload,
  Avatar,
  Flex,
  List,
  Descriptions,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import {
  SettingOutlined,
  PlusOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import "./project.css";

const { TextArea } = Input;
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
];

function ProjectDetail() {
  const [project, setProject] = useState({});
  const [a, setA] = useState(3);
  const params = useParams();
  const projectId = params.id;
  const getData = () => {
    axios
      .post("http://localhost:8000/projects/detail/find",{"id":projectId})
      .then((res) => {
        setProject({
          "id": projectId,
          "title": res.data[0].title,
          "post_date": res.data[0].post_date,
          "end_date": res.data[0].end_date,
          "description": res.data[0].description,
          "website": res.data[0].website,
          "email": res.data[0].email,
          "qualification": res.data[0].qualification,
          "category": res.data[0].category,
          "owner": res.data[0].owner,
          "group_member": res.data[0].group_member,
          "tags": res.data[0].tags
      });
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getData();
  }, []);
  // useEffect(() => {
  // }, []);

  const navigate = useNavigate();
  return (
    <div className="project-detail">
      <div
        style={{
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <h4
          style={{
            textAlign: "left",
            marginRight: "18px",
            display: "inline-block",
          }}
        >
          {project.title}
        </h4>
        {/* <HeartOutlined key="heart" />
        <SettingOutlined
          key="setting"
          onClick={() => navigate("/update_project/123")}
        /> */}
      </div>
      <div
        style={{
          fontSize: "28px",
          overflow: "hidden",
        }}
      >
        {/* <h4 style={{ textAlign: 'center' }}>项目描述</h4> */}
        {/* <div
          style={{
            width: "300px",
            float: "right",
            fontSize: "16px",
          }}
        >
          项目成员
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                    />
                  }
                  title={<a href="https://ant.design">{"姓名"}</a>}
                  description="描述"
                />
              </List.Item>
            )}
          />
        </div> */}
        <Descriptions
          title="项目描述"
          bordered
          column={1}
          style={{
            // marginTop: "18px",
            width: "calc(100%)",
            float: "left",
          }}
        >
          <Descriptions.Item label="标题">{project.title}</Descriptions.Item>
          <Descriptions.Item label="作者">{project.owner}</Descriptions.Item>
          {/* <Descriptions.Item label="标签">{project.tags}</Descriptions.Item> */}
          <Descriptions.Item label="截止时间">
            {project.end_date}
          </Descriptions.Item>
          <Descriptions.Item label="目录">{project.category}</Descriptions.Item>
          <Descriptions.Item label="网点">{project.website}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{project.email}</Descriptions.Item>
          <Descriptions.Item label="资格">
            {project.qualification}
          </Descriptions.Item>
          <Descriptions.Item label="项目描述">
            {project.description}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
}

export default ProjectDetail;
