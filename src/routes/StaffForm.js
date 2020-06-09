import React from 'react';
import {Form,Modal,Input,Radio,Select } from 'antd'

class StaffForm extends React.Component{

    // 1. 重写的方法，表示页面渲染
    render(){
        // 4. 表单大小设置（字Form中调用）
        const formLayout = {
            labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
            },
            wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
            },
        }

        // 3. 父组件传递给子组件的值- 即page给form传的值
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        // 5.1 将表单中没有出现的值做一个双向数据绑定 (即没有出现在form添加表单的行，需要将他在修改中用的)
        getFieldDecorator("id");

        // 6. 下拉列表
        const { Option } = Select;
        // 2. 返回页面
        return(
            <Modal
                visible={visible}
                title="职工信息"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
                >
                <Form layout="vertical" {...formLayout}>
                    <Form.Item label="职工姓名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入职工名字!' }],
                        })(<Input placeholder="职工姓名"/>)}
                    </Form.Item>
                    <Form.Item label="科室">
                        {getFieldDecorator('def_id', {
                            rules: [{ required: true, message: '请选择科室/部门!' }],
                        })(
                            <Select defaultValue="科室" style={{ width: 120 }} placeholder="科室">
                                <Option value="1">消化内科</Option>
                                <Option value="2">呼吸内科</Option>
                                <Option value="3">整形外科</Option>
                                <Option value="4">骨科</Option>
                                <Option value="5">儿科综合</Option>
                                <Option value="6">儿童保健室</Option>
                                <Option value="7">新生儿科</Option>
                                <Option value="8">妇科</Option>
                                <Option value="9">产科</Option>
                                <Option value="10">妇幼保健</Option>
                                <Option value="11">肿瘤内科</Option>
                                <Option value="12">肿瘤外科</Option>
                                <Option value="13">肿瘤康复科</Option>
                                <Option value="14">化疗科</Option>
                                <Option value="15">核医学科</Option>
                                <Option value="16">放射科</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="职责">
                        {getFieldDecorator('duty', {
                            rules: [{ required: true, message: '请输入地址!' }],
                        })(<Input placeholder="如：医生、护士、实习生、清洁工、保安"/>)}
                    </Form.Item>
                    <Form.Item label="级别">
                        {getFieldDecorator('grade', {
                            rules: [{ required: true, message: '请输入联系电话!' }],
                        })(<Input placeholder="如：主任、专家、普通职工"/>)}
                    </Form.Item>
                    <Form.Item label="年龄">
                        {getFieldDecorator('age', {
                            rules: [{ required: true, message: '请输入年龄!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="性别">
                        {getFieldDecorator('sex', {
                            initialValue: 'public',
                    })(
                        <Radio.Group>
                            <Radio value="男">男</Radio>
                            <Radio value="女">女</Radio>
                        </Radio.Group>,
                    )}
                    </Form.Item>
                    <Form.Item label="简介">
                        {getFieldDecorator('detail', {
                            rules: [{ required: true, message: '请输入简介300字内!' }],
                        })(<Input placeholder="个人简介300字内"/>)}
                    </Form.Item>
                    <Form.Item label="家庭住址">
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: '请输入家庭住址!' }],
                        })(<Input placeholder="省/市/区（县）"/>)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

// 5. 将通过props从父组件中获取的值拿出来设置到表单元素上
const mapPropsToFields = (props)=>{
    let obj = {};
    for(let key in props.initData){
        let val = props.initData[key];
        obj[key] = Form.createFormField({value:val})
    }
    return obj;
}

export default Form.create({
    mapPropsToFields
})(StaffForm);