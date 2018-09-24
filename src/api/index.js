import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
    baseURL: 'https://cnodejs.org/api/v1'
})

instance.interceptors.request.use(config => config, err => Promise.reject(err))
instance.interceptors.response.use(res => res && res.data, err => Promise.reject(err))

class Service {
    constructor(cookie = '') {
        this.cookie = cookie
    }

    get(url, config = {}) {
        const headers = process.env.isServer
            ? { ...config.headers, cookie: this.cookie }
            : { ...config.headers }

        return instance.get(url, {
            ...config,
            headers
        })
    }

    post(url, data, config = {}) {
        const headers = process.env.isServer
            ? { ...config.headers, cookie: this.cookie }
            : { ...config.headers }

        return instance.post(url, qs.stringify(data), {
            ...config,
            headers
        })
    }

    getTopics() {
        return this.get('/topics', {
            params: {
                page: 1,
                tab: 'all',
                limit: 40
            }
        })
    }

    getTopicById(id) {
        return this.get(`/topic/${id}`)
    }
}

export function createSSRApi(cookie) {
    return new Service(cookie)
}

export default new Service()
