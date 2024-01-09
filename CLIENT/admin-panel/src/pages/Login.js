import React from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'
import { useState } from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'


const postLoginData = async (requestData,) => {
  const apiUrl = `${process.env.REACT_APP_USERS_API_URL}/api/users/signin`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });


    const data = await response.json();

    if (!response.ok) {
      alert(data.message)
      throw new Error(`HTTP error! status: ${response.status} - ${data.message}`);
    }

    const token = data.responseData.token
    const profile = data.responseData.profile

    localStorage.setItem("token", token)
    localStorage.setItem("profile", JSON.stringify(profile))

    return data

    // Handle the response data in here
  } catch (error) {
    console.error('Error:', error);
    // Handle the error here
  }
};


function Login(props) {

  const [loginData, setLoginData] = useState({
    "email": "aarav.patel@gmail.com", "password": "Adm1nP@ssw0rd"
  })

  const handleInputChange = (key, value) => {
    setLoginData({
      ...loginData,
      [key]: value
    })
  }

  const handleLoginButton = async (e) => {
    e.preventDefault()
    if (loginData.email.length == 0 || loginData.password.length == 0) {
      alert("Login Information is required")
      return
    }

    const result = await postLoginData(loginData)
    if (result) {
      props.history.push("/app")
    }
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <span>Email</span>
                <Input value={loginData.email} onChange={(e) => { handleInputChange('email', e.target.value) }} className="mt-1" type="email" placeholder="john@doe.com" />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input value={loginData.password} className="mt-1" type="password" onChange={(e) => { handleInputChange('password', e.target.value) }} placeholder="***************" />
              </Label>

              <Button onClick={handleLoginButton} className="mt-4" block tag={Button} >
                Log in
              </Button>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Login)
