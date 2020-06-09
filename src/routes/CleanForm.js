import React from 'react';
import {Form,Modal,Input,Radio,Select } from 'antd'

class CleanForm extends React.Component{

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
                title="杀菌消毒信息"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
                >
                <Form layout="vertical" {...formLayout}>
                <Form.Item label="物品名称">
                        {getFieldDecorator('goods_id', {
                            rules: [{ required: true, message: '请选择杀菌的物品名称!' }],
                        })(
                            <Select defaultValue="物品名称" style={{ width: 120 }} placeholder="物品名称">
                                <Option value="10000001">一次性医用手套</Option>
                                <Option value="10000002">一次性医用防护口罩</Option>
                                <Option value="10000003">医用护目镜</Option>
                                <Option value="10000004">消毒液</Option>
                                <Option value="10000005">防护服</Option>
                                <Option value="10000006">护士帽</Option>
                                <Option value="10000007">一次性医用棉签</Option>
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item label="杀菌详情">
                        {getFieldDecorator('detail', {
                            rules: [{ required: true, message: '请输入杀菌描述!' }],
                        })(<Input placeholder="杀菌详情"/>)}
                    </Form.Item>
                    <Form.Item label="杀菌时间">
                        {getFieldDecorator('cleantime', {
                            rules: [{ required: true, message: '请输入杀菌时间!' }],
                        })(<Input placeholder="yyyy-mm-dd hh:mm"/>)}
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
})(CleanForm);