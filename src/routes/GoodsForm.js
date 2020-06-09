import React from 'react';
import {Form,Modal,Input,Radio,Select } from 'antd'

class GoodsForm extends React.Component{

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
                title="物资信息"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
                >
                <Form layout="vertical" {...formLayout}>
                    <Form.Item label="物品编码">
                        {getFieldDecorator('barcode', {
                            rules: [{ required: true, message: '请输入物品编码!' }],
                        })(<Input placeholder="（条形码）（12位：984154984154）"/>)}
                    </Form.Item>
                    <Form.Item label="物品名称">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入物品名称!' }],
                        })(<Input placeholder="物品名称"/>)}
                    </Form.Item>
                    <Form.Item label="物品规格">
                        {getFieldDecorator('norm', {
                            rules: [{ required: true, message: '请输入物品规格!' }],
                        })(<Input placeholder="物品规格（1*10）"/>)}
                    </Form.Item>
                    <Form.Item label="单位">
                        {getFieldDecorator('unit', {
                            rules: [{ required: true, message: '请输入单位!' }],
                        })(<Input placeholder="单位（袋、盒）"/>)}
                    </Form.Item>
                    <Form.Item label="装箱规格">
                        {getFieldDecorator('boxnorm', {
                            rules: [{ required: true, message: '请输入装箱规格!' }],
                        })(<Input placeholder="装箱规格（规格1、2...）"/>)}
                    </Form.Item>
                    <Form.Item label="数量">
                        {getFieldDecorator('num', {
                            rules: [{ required: true, message: '请输入数量!' }],
                        })(<Input placeholder="数量"/>)}
                    </Form.Item>
                    <Form.Item label="生产日期">
                        {getFieldDecorator('brithtime', {
                            rules: [{ required: true, message: '请输入生产日期!' }],
                        })(<Input placeholder="yyyy-mm-dd hh:mm"/>)}
                    </Form.Item>
                    <Form.Item label="入库时间">
                        {getFieldDecorator('ontime', {
                            rules: [{ required: true, message: '请输入入库时间!' }],
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
})(GoodsForm);