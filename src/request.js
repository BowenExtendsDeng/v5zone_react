/**
 * 网络请求配置
 */
import axios from "axios";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = "http://localhost:8849";



/**
 * http request 拦截器
 */
axios.interceptors.request.use(
    (config) => {
        config.data = JSON.stringify(config.data);
        // const tokenStr = localStorage.getItem('v5_token')
        // if (tokenStr) {
        //     config.headers.Authorization=tokenStr
        // }
        // config.headers = {
        //     "Content-Type": "application/json",
        // };
        // console.log("axios-config: " + config)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    (response) => {
        if (response.data.errCode === 2) {
            console.log("过期");
        }
        console.log(response)
        // if(response.data.token !== ""){
        //     localStorage.setItem('v5_token', response.data.token)
        //     console.log(response.data.token);
        // }
        // if(response.data.id !== ""){
        //     localStorage.setItem('v5_id', response.data.id)
        //     console.log(response.data.id);
        // }
        return response;
    },
    (error) => {
        console.log(error)
    }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('v5_token'),
                "Content-Type": "application/json",
            }
        }).then((response) => {
            landing(url, params, response.data);
            resolve(response);
        })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data,{
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('v5_token'),
                "Content-Type": "application/json",
            }
        }).then(
            (response) => {
                //关闭进度条
                resolve(response);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

const specialFileType = ['Blob', 'File']
/**
 * postWithFile
 * @param url
 * @param config
 * @param file
 * @returns {Promise}
 */
export function postWithFile(url, config, file) {
    let formData = new FormData();
    formData.set("id",localStorage.getItem("v5_id"));
    if(config.type === "image"){
        formData.set("isPublic", config.isPublic);
        formData.set("file", file);
    }
    console.log(formData.get("file"));
    return new Promise((resolve, reject) => {
        axios.post(url,formData,{
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('v5_token'),
                'Content-Type': 'multipart/form-data',
            },
            transformRequest: formData => formData,
        }).then(
            (response) => {
                //关闭进度条
                resolve(response);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                msag(err);
                reject(err);
            }
        );
    });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                msag(err);
                reject(err);
            }
        );
    });
}

//统一接口处理，返回数据
export default function (fecth, url, param) {
    return new Promise((resolve, reject) => {
        switch (fecth) {
            case "get":
                console.log("begin a get request,and url:", url);
                get(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.log("get request GET failed.", error);
                        reject(error);
                    });
                break;
            case "post":
                post(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.log("get request POST failed.", error);
                        reject(error);
                    });
                break;
            default:
                break;
        }
    });
}

//失败提示
function msag(err) {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                alert(err.response.data.error.details);
                break;
            case 401:
                alert("未授权，请登录");
                break;

            case 403:
                alert("拒绝访问");
                break;

            case 404:
                alert("请求地址出错");
                break;

            case 408:
                alert("请求超时");
                break;

            case 500:
                alert("服务器内部错误");
                break;

            case 501:
                alert("服务未实现");
                break;

            case 502:
                alert("网关错误");
                break;

            case 503:
                alert("服务不可用");
                break;

            case 504:
                alert("网关超时");
                break;

            case 505:
                alert("HTTP版本不受支持");
                break;
            default:
        }
    }
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
    if (data.code === -1) {
    }
}
