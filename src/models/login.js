import { parse, stringify } from 'qs';
import { routerRedux } from 'dva/router';
import { fakeAccountLogin, getFakeCaptcha } from '../pages/user/login/service';
import { getPageQuery, setAuthority } from '../utils/utils';

const Model = {
    namespace: 'userLogin',
    state: {
        isLogin: false,
        currentUser: {},
        success: undefined,
    },
    effects: {
        *login({ payload, callback }, { call, put }) {
            try {
                const response = yield call(fakeAccountLogin, payload);
                if (response.success) {
                    callback && callback(response.data.user.username);
                }
                yield put({
                    type: 'changeLoginStatus',
                    payload: response,
                }); // Login successfully

                if (response.success === true) {
                    const urlParams = new URL(window.location.href);
                    const params = getPageQuery();
                    let { redirect } = params;
                    if (redirect) {
                        const redirectUrlParams = new URL(redirect);

                        if (redirectUrlParams.origin === urlParams.origin) {
                            redirect = redirect.substr(urlParams.origin.length);

                            if (redirect.match(/^\/.*#/)) {
                                redirect = redirect.substr(redirect.indexOf('#') + 1);
                            }
                        } else {
                            window.location.href = redirect;
                            return;
                        }
                    }
                    yield put(routerRedux.replace(redirect || '/'));
                }
            } catch (e) {
                const logerr = yield select(({ userLogin }) => userLogin.logerr);
                message.error(logerr, 2);
                yield put({
                    type: "setLoginError",
                    payload: ''
                })
            }
        },
        *getMenuData({ payload }, { call, put }) {
            // const response = yield call(getMenuData, payload);
            // console.log('response',response)
            // if (response.success) {
            //     yield put({
            //         type: 'handleMenuData',
            //         payload: response,
            //     });
            // }
        },
        *getCaptcha({ payload }, { call }) {
            yield call(getFakeCaptcha, payload);
        },

        *logout(state, { put }) {
            localStorage.clear();
            yield put({
              type: 'replaceState',
              payload: {
                isLogin: false,
                currentUser: {},
                menuData: [],
              }
            });
            router.replace('/userLogin');
          },
    },
    reducers: {
        changeLoginStatus(state, { payload }) {
            let isLogin = payload.success;
            const permissions = payload.data.permissions;
            let loginfo = { ...state, isLogin, type: payload.type, currentUser: payload.data.user, userToken: payload.data.token, permissions };
            localStorage.setItem('loginfo', JSON.stringify(loginfo));
            return loginfo;
            //   setAuthority(payload.currentAuthority);
            //   return { ...state, success: payload.success, type: payload.type };
        },

        replaceState(state, { payload }) {
            return {
              ...state,
              ...payload
            }
          },
    },
};
export default Model;

