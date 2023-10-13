import React from 'react';
import './App.css';
import UserList from './components/User.js'
import PostcardList from './components/PostcardList.js'
import ImageUploadForm from './components/PostcardForm.js'
import LoginForm from './components/LoginForm.js'
import axios from 'axios'
import { Route, BrowserRouter, Routes, Link, useLocation } from 'react-router-dom'

const NotFound404 = () => {
  var { pathname } = useLocation()

  return (
    <div>
      Страница по адресу "{pathname}" не найдена
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'postcards': [],
      'token': ''
    }
  }

  uploadImage(formdata) {
    let headers = this.getHeaders()
    // assuming getHeaders method returns appropriate headers, including 'Content-Type': 'multipart/form-data' if necessary

    axios
      .post('http://127.0.0.1:8000/api/postcards/', formdata, { headers })
      .then(_response => {
        this.setState({
          'redirect': '/postcards'
          // Update state if needed
        }, this.getData)   // assuming getData fetches latest data from server
      })
      .catch(error => {
        console.log(error)
      })
  }
  
  obtainAuthToken(login, password) {
    axios
      .post('http://127.0.0.1:8000/api-token-auth/', {
        'username': login,
        'password': password
      })
      .then(response => {
        const token = response.data.token
        console.log('token:', token)
        localStorage.setItem('token', token)
        this.setState({
          'token': token
        }, this.getData)
      })
      .catch(error => console.log(error))
  }

  isAuth() {
    return !!this.state.token
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    this.setState({
      'token': token
    }, this.getData)
  }

  getHeaders() {
    if (this.isAuth()) {
      return {
        'Authorization': 'Token ' + this.state.token,
        'Content-Type': 'multipart/form-data'
      }
    }
    return {}
  }

  getData() {
    let headers = this.getHeaders()

    axios.get('http://127.0.0.1:8000/api/users/', { headers })
      .then(response => {
        const users = response.data
        this.setState(
          {
            'users': users
          })
      })
      .catch(error => {
        console.log(error)
        this.setState({ 'users': [] })
      })

    axios.get('http://127.0.0.1:8000/api/postcards/', { headers })
      .then(response => {
        const postcards = response.data
        this.setState(
          {
            'postcards': postcards
          })
      })
      .catch(error => {
        console.log(error)
        this.setState({ 'postcards': [] })
      })
  }

  logOut() {
    localStorage.setItem('token', '')
    this.setState({
      'token': '',
    }, this.getData)
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to='/'>Пользователи</Link>
              </li>
              <li>
                <Link to='/postcard'>Открытки</Link>
              </li>
              <li>
                <Link to='/postcard_uploading'>Загрузка открыток</Link>
              </li>
              <li>
                {this.isAuth() ? <button onClick={() => this.logOut()}>Logout</button> : <Link to='/login'>Login</Link>}
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path='/' element={<UserList users={this.state.users} />} />
            <Route exact path='/postcard' element={<PostcardList postcards={this.state.postcards} />} />
            <Route exact path='/postcard_uploading' element={<ImageUploadForm uploadImage={(formdata) => this.uploadImage(formdata)}/>} />
            <Route exact path='/login' element={<LoginForm obtainAuthToken={(login, password) => this.obtainAuthToken(login, password)} />} />
            <Route path='*' element={<NotFound404 />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }

}

export default App;
