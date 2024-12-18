import { Checkbox, Divider } from 'antd';
import React, { useState } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['权限1', '权限2', '权限3'];
const defaultCheckedList = ['Apple', 'Orange'];
const App = () => {
  const [form] = Form.useForm();
  const onGenderChange = (value) => {
    // switch (value) {
    //   case 'male':
    //     form.setFieldsValue({
    //       note: 'Hi, man!',
    //     });
    //     break;
    //   case 'female':
    //     form.setFieldsValue({
    //       note: 'Hi, lady!',
    //     });
    //     break;
    //   case 'other':
    //     form.setFieldsValue({
    //       note: 'Hi there!',
    //     });
    //     break;
    //   default:
    // }
  };
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };
  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name="note"
        label="名字"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="权限"
        
      >
        <Select
          placeholder=""
          onChange={onGenderChange}
          allowClear
        >
          <Option value="readonlu">只读</Option>
          <Option value="auth">授权</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'auth' ? (
            <Form.Item
              name="customizeGender"
              label="权限"
              
            >
              <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      
    </Form>
  );
};
export default App;