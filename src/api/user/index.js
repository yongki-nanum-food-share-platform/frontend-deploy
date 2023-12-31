//mock server
// const server = "https://port-0-backend-jvpb2alnuic3pc.sel5.cloudtype.app"
//local server
// const server = process.env.VUE_APP_LOCAL_URL
//const server = 'http://localhost:8080'
import store from '../../store/index'
import {server} from '../conf.js'

export default {
  async login(info) {
    const response = await fetch(`${server}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    let head = response.headers.get('Authorization')
    let data = await response.json()

    let d = {
      success: data.success,
      response: data.response,
      error: data.error,
      token: head
    }
    return d
  },
  async signup(info) {
    const response = await fetch(`${server}/users/regist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    const data = await response.json()
    return data
  },
  async getInfo() {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tok
      }
    })
    const data = await response.json()
    return data
  },
  async getUInfo() {
    const idx = store.state.user.uIdx
    const response = await fetch(`${server}/users/${idx}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': tok
      }
    })
    const data = await response.json()
    return data
  },
  async putInfo(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/users/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tok
      },
      body: JSON.stringify(info)
    })
    const data = await response.json()
    return data
  },
  async getAddress() {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/users/address`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tok
      }
    })
    const data = await response.json()
    return data
  },
  async postAddress(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/users/address/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tok
      },
      body: JSON.stringify(info)
    })
    const data = await response.json()
    return data
  },

  
  async getTest() {
    const response = await fetch(`${server}/login/kakao`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    return data
  },
  async postTest(info) {
    const response = await fetch(`${server}/login/kakao/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: info.code
    })

    let head = response.headers.get('Authorization')
    let data = await response.json()

    let d = {
      success: data.success,
      response: data.response,
      error: data.error,
      token: head
    }
    return d
  },

  async getTestN() {
    const response = await fetch(`${server}/login/naver`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    return data
  },
  async postTestN(info) {
    const response = await fetch(`${server}/login/naver/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: info.code
    })

    let head = response.headers.get('Authorization')
    let data = await response.json()

    let d = {
      success: data.success,
      response: data.response,
      error: data.error,
      token: head
    }
    return d
  },
  async getTestG() {
    const response = await fetch(`${server}/login/google`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    return data
  },
  async postTestG(info) {
    const response = await fetch(`${server}/login/google/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: info.code
    })

    let head = response.headers.get('Authorization')
    let data = await response.json()

    let d = {
      success: data.success,
      response: data.response,
      error: data.error,
      token: head
    }
    return d
  },
  
}
