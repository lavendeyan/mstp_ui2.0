import React from 'react';
import { connect } from 'dva';
import styles from './AllPage.css';
import { Link } from 'dva/router';
import { Layout, Menu, Icon} from 'antd';

const {Sider, Content } = Layout;

class MainPage extends React.Component {
  state = {
    collapsed: false,
};


  render() {
    const children = this.props.children;
    return (
      <Layout>
        <Sider style={{
            height: 700,
            backgroundColor:'#282b33'
        }}>

          <div >
            <h1 className={styles.logo} >医疗用品追溯平台</h1>
          </div>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{
                backgroundColor:'#282b33'
                }}>
                <Menu.Item key="1">
                    <Link to="/apply"><Icon type="bars" />
                    <span className={styles.span}>物品申请管理</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/goods"><Icon type="project" />
                        <span className={styles.span}>物资信息管理</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/clean"><Icon type="appstore" />
                        <span className={styles.span}>消毒杀菌</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/staff"><Icon type="user" />
                    <span className={styles.span}>职员管理</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/department"><Icon type="team" />
                    <span className={styles.span}>科室管理</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Link to=""><Icon type="container" />
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



export default connect()(MainPage);