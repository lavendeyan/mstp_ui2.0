import React from 'react';
import { connect } from 'dva';
import styles from './AllPage.css';
import { Link } from 'dva/router';
import { Layout, Menu, Icon} from 'antd';

const {Sider, Content } = Layout;
const { SubMenu } = Menu;

class IndexPage extends React.Component {
  state = {
    collapsed: false,
};


  render() {
    return (
      <Layout>
        <Sider style={{
          height: 700,
          backgroundColor:'#282b33'
        }}>

          <div >
            <h1 className={styles.logo} font-color='white'>医疗用品追溯平台</h1>
          </div>

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{
              backgroundColor:'#282b33'
            }}>

            <Menu.Item key="1">
              <Link to="/apply"><Icon type="bars" />
                <span className={styles.span}>物品申请登记</span>
              </Link>
            </Menu.Item>
            {/* <SubMenu
              key="sub1"
              title={
                <span>
                  <Link to="/apply"/><Icon type="bars" />
                  <span className={styles.span}>物品申请登记</span>
                </span>
              }
            >
              <Menu.Item key="1"><Link to="/<Link to="/apply"/>"/>一次性医疗物品</Menu.Item>
              <Menu.Item key="2"><Link to="/apply"/>非一次性医疗物品</Menu.Item>
              <Menu.Item key="3">普通物品</Menu.Item>
            </SubMenu> */}
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="bars" />
                  <span className={styles.span}>物资信息管理</span>
                </span>
              }
            >
              <Menu.Item key="4"><Link to="/goods"/>物品入库</Menu.Item>
              <Menu.Item key="5"><Link to="/apply"/>物品出库</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  
                    <Icon type="appstore" />
                    <span className={styles.span}>消毒杀菌</span>
                  
                </span>
              }
            >
              <Menu.Item key="6"><Link to="/clean"/>消毒灭菌登记</Menu.Item>
              <Menu.Item key="7"><Link to="/pack"/>打包登记</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  
                    <Icon type="team" />
                    <span>内部信息管理</span>
                  
                </span>
              }
            >
              <Menu.Item key="8">
                <Link to="/staff"/>职员管理
              </Menu.Item>
              <Menu.Item key="9"><Link to="/department"/>科室管理</Menu.Item>
            </SubMenu>
            <Menu.Item key="10">
            <Link to="/department"><Icon type="container" />
              <span className={styles.span}>系统管理</span>
            </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <div style={{  background: '#f6f9fa', minHeight: 700 }}>
              {this.props.children ? this.props.children : 
                <h1 className={styles.main}>欢迎进入医疗用品追溯平台</h1>
              }
            </div>

          </Content>
        </Layout>
      </Layout>
    );
  }
}



export default connect()(IndexPage);