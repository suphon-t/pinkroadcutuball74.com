import axios from 'axios'

import config from '../config'

axios.defaults.baseURL = config.apiUrl
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default axios
