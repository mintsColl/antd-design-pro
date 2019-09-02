import { Avatar, Icon, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import request from '@/utils/request';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModifyDrawer: false,
            isFit: false,
        }
    }
    onMenuClick = event => {
        const { key } = event;
        if (key === 'logout') {
            const { dispatch } = this.props;
            if (dispatch) {
                dispatch({
                    type: 'userLogin/logout',
                });
            }
            return;
        }
        router.push(`/account/${key}`);
    };

    render() {
        const { currentUser = {}, menu } = this.props;
        // if (!menu) {
        //     return (
        //         <span className={`${styles.action} ${styles.account}`}>
        //             <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        //             <span className={styles.name}>{currentUser.name}</span>
        //         </span>
        //     );
        // }
        const menuHeaderDropdown = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
                <Menu.Item key="settings">
                    <Icon type="setting" />
                    <span>修改密码</span>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <Icon type="logout" />
                    <span>退出登录</span>
                </Menu.Item>
            </Menu>
        );
        return currentUser && currentUser.name ? (
            <HeaderDropdown overlay={menuHeaderDropdown}>
                <span className={`${styles.action} ${styles.account}`}>
                    <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
                    <span className={styles.name}>{currentUser.name}</span>
                </span>
            </HeaderDropdown>
        ) : (
                <Spin
                    size="small"
                    style={{
                        marginLeft: 8,
                        marginRight: 8,
                    }}
                />
            );
    }
}

export default connect(({ user }) => ({
    currentUser: user.currentUser,
}))(AvatarDropdown);
