import request from '@/utils/request';
const formatData = (params) => {
    let formdata = new FormData();
    formdata.append("userName", params.userName);
    formdata.append("password", params.password);
    formdata.append("type", params.type);
    return formdata;
}
export async function fakeAccountLogin(params) {
    return request('/api/login', {
        method: 'POST',
        notoken: true,
        data: formatData(params),
    });
}
export async function getMenuData(username) {
    return request(`/api/menu/${username}`,{
        method:'GET'
    });
}
export async function getFakeCaptcha(mobile) {
    return request(`/api/login/captcha?mobile=${mobile}`);
}
