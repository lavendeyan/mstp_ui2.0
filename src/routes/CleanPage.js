import React from 'react';
import styles from './AllPage.css'
import axios from '../utils/axios.js'
import {Modal,Button, Table, message,Input} from 'antd'
import CleanForm from './CleanForm'
import { exportExcel } from 'xlsx-oc'

class CleanPage extends React.Component{
    // 2. 局部状态state  在局部状态中加载数据，在构造函数中初始化局部状态
    constructor(){
        super();
        this.state = {
            list:[],
            loading:false,
            ids:[], //批量删除的ids
            visible:false,
            formData:{}
        }
    }

    // 3. 重载数据方法
    reloadData(){
        this.setState({loading:true});
        // 查询数据，进行数据绑定
        axios.get("/clean/findAllWithGoods")
        .then((result)=>{
            //将查询更新到state中
            this.setState({
                list:result.data
            })
        })
        .finally(()=>{
            this.setState({loading:false});
        })
    }

    // 4. 在生命周期中钩子函数调用重载数据方法
    componentDidMount(){
        this.reloadData();
    }

    // 5. 单个删除(提前导包 Modal message/ 注意传参方法是axios.get)
    handleDelete(id){
        Modal.confirm({
            title: '确认删除这条记录吗?',
            content: '数据删除后将无法恢复',
            onOk:()=>{
                axios.get("/clean/deleteById",{
                    params:{
                        id:id
                    }
                })
                .then((result)=>{
                    //提示删除成功
                    message.success(result.statusText);
                    //重新加载数据
                    this.reloadData();
                })
            }
        });
    }

    // 6. 批量删除（注意在局部状态中加入ids：[] 和 注意传参方法是axios.post）
    handleBatchDelete(){
        Modal.confirm({
            title: '确认删除这些记录吗?',
            content: '数据删除后将无法恢复',
            onOk:()=>{
                axios.post("/clean/batchDelete",{
                    ids:this.state.ids
                })
                .then((result)=>{
                    //提示删除成功
                    message.success(result.statusText);
                    //重新加载数据
                    this.reloadData();
                })
            }
        });
    }

    // 7. 添加表单（提前导组件CleanForm 和 在局部状态中加入visible:true）
    // 7.2 取消按钮的事件处理函数
    handleCancel = () => {
        this.setState({ visible: false });
    };

    // 7.3 确认按钮的事件处理函数
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            // alert(JSON.stringify(values));
            // 表单校验完成后与后台通信进行保存
            axios.post("/clean/saveOrUpdate",values)
            .then((result)=>{
                message.success(result.statusText)
                form.resetFields();// 重置表单
                this.setState({ visible: false });// 关闭表单
                this.reloadData();
            })
        });
    };

    // 7.4  将子组件的引用在父组件中进行保存，方便后期调用
    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    // 7.5 去添加,打开Form表单 （在添加按钮中，绑定该方法）
    toAdd(){
        //将默认值置空
        this.setState({formData:{}});
        // 将默认值置空,模态框打开
        this.setState({ visible:true})
    }
    
    // 7.6  去修改,打开有数据的Form表单（在修改按钮中，绑定该方法）
    toEdit(record){
        // alert(JSON.stringify(record));
        // 更前先先把要更新的数据设置到局部状态state中 （在局部状态中加上formData 和 xxxForm上绑定init..）
        this.setState({formData:record});
        // alert(JSON.stringify(values));
        // 将record值绑定表单中
        this.setState({visible:true});

    }

    

    // 8.  模糊查询  
    query = (value)=>{
        this.setState({loading:true});
        axios.get("/clean/query",{
        params:{
            name: value,
        }
        })
        .then((result)=>{
        // 将查询数据更新到state中
        this.setState({list:result.data})
        })
        .finally(()=>{
        this.setState({loading:false});
        })
    }

    // 1. 重写的方法，表示页面渲染
    render(){
        // 1.2 变量定义 |  5.1 单个删除的handleDelete 和 render:(text,record)=>
        let columns = [
            {   title:'编号',
                dataIndex:'id'},
            {   title:'物品编号',
                dataIndex:'goods_id'},
            {   title:'物品名称',
                dataIndex:'goods.name'},
            {   title:'杀菌描述',
                dataIndex:'detail'},
            {   title:'杀菌时间',
                dataIndex:'cleantime'},
            {   title:'操作',
                render:(text,record)=>{
                    return (
                        <div>
                            <Button type='link' size='small'
                                onClick={this.toEdit.bind(this, record)}>修改</Button>
                            <Button type='link' size='small' 
                                onClick={this.handleDelete.bind(this, record.id)}>删除</Button>
                        </div>
                    )
                }
            }
        ]

        // 1.3 复选框 rowSelection  |  6.1 批量删除时，把选中的数据id传递给ids （删除原本的console.log）
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // 批量删除时，把选中的数据id传递给ids （删除原本的console.log）
                this.setState({
                    ids:selectedRowKeys
                })
            },
            getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
            }),
        };

        // 8.1 搜索框
        const Search = Input.Search;

        // 9.1 导出
        const exportDefaultExcel = () => {
            exportExcel(_headers, this.state.list);
        }
        // 9.2 
        const _headers = [
            { k: 'id', v: '杀菌编号' },
            { k: 'goods_id', v: '物品名称' },
            { k: 'detail', v: '杀菌描述' },
            { k: 'cleantime', v: '杀菌时间' }
          ];

        // 1.1 返回页面内容jsx  |  6.2 批量删除的 handleBatchDelete
        return (
            //html代码（也称jsx）
            <div className={styles.firstdiv}>
                {/* 1.1.1.标题组 */}
                <div className={styles.title}><h1 align='center'>杀菌消毒管登记管理</h1></div>
                {/* 1.1.2.按钮组 */}
                <div className={styles.btns}>
                    <Button onClick={this.toAdd.bind(this)}>添加</Button>&nbsp;
                    <Button onClick={this.handleBatchDelete.bind(this)}>批量删除</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Search 
                        placeholder="模糊查询"
                        onSearch={value => {this.query(value)}}
                        style={{ width: 400 }}
                    /> &nbsp;
                    <Button>查询</Button>&nbsp;
                    <Button type='link' onClick={() => exportDefaultExcel()}>导出</Button>
                </div>
                {/* 1.1.3.表格组  |  2.1 数据库中的数据保存在局部状态中  |  1.3 复选框  |  2.1 迟缓加载 */}
                <Table 
                    bordered
                    rowKey='id' 
                    size='small' 
                    columns={columns}
                    dataSource={this.state.list} 
                    rowSelection={rowSelection}
                    loading={this.state.loading}/>
                {/* 7.1 表单页面（提前导组件xxxForm） |  7.6.1 xxxForm上绑定initData*/}
                <CleanForm 
                    initData={this.state.formData}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}/>
                
            </div>
        )
    }
}

export default CleanPage;