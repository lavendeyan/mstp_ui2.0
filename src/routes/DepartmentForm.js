import React from 'react';
import {Form,Modal,Input} from 'antd'
// import {message,Upload,Button,Icon,Form,Modal,Input} from 'antd'


class DepartmentForm extends React.Component{
    
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

        // 2. 返回页面
        return (
            <Modal
                visible={visible}
                title="科室信息"
                align='center'
                okText="提交"
                onCancel={onCancel}
                onOk={onCreate}
                >
                <Form layout="vertical" {...formLayout}>
                    <Form.Item label="科室名称">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入科室名称!' }],
                        })(<Input placeholder="科室/部门名称"/>)}
                    </Form.Item>
                    <Form.Item label="负责人">
                        {getFieldDecorator('director', {
                            rules: [{ required: true, message: '请输入负责人!' }],
                        })(<Input placeholder="负责人姓名"/>)}
                    </Form.Item>
                    <Form.Item label="地址详情">
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: '请输入地址!' }],
                        })(<Input placeholder="如：东x区x楼x层x室"/>)}
                    </Form.Item>
                    <Form.Item label="联系电话">
                        {getFieldDecorator('tel', {
                            rules: [{ required: true, message: '请输入联系电话!' }],
                        })(<Input placeholder="办公室联系电话"/>)}
                    </Form.Item>
                    <Form.Item label="创建时间">
                        {getFieldDecorator('foundtime', {
                            rules: [{ required: true, message: '请输入创建时间!' }],
                        })(<Input />)}
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
})(DepartmentForm);