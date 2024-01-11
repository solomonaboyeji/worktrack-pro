import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'

import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { Input, Label, Button } from '@windmill/react-ui'

const postAccountData = async (requestData, onSuccess) => {
  const apiUrl = `${process.env.REACT_APP_USERS_API_URL}/api/users`;

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
    return data

    // Handle the response data in here
  } catch (error) {
    console.error('Error:', error);
    // Handle the error here
  }
};

function CreateAccount(props) {

  const [workLegally, canWorkLegally] = useState(true)

  const [accountData, setAccountData] = useState({
    role: "Staff",
    isLegalStatus: workLegally,
    "email": "aarav.patel@gmail.com",
    "firstName": "Solomon",
    "lastName": "ABOYEJI",
    "phoneNumber": "08189200599",
    "postCode": "W14 AS",
    "dob": "1996-10-27",
    "password": "Adm1nP@ssw0rd",
    "confirmPassword": "Adm1nP@ssw0rd",
  })


  const handleInputChange = (key, value) => {

    if (key === "isLegalStatus") {
      canWorkLegally(value)
    }
    setAccountData({
      ...accountData,
      [key]: value,
      isLegalStatus: !workLegally
    })
  }

  const handleCreateAccount = async (target) => {
    target.preventDefault();

    const apiUrl = process.env.REACT_APP_USERS_API_URL
    console.log(apiUrl)

    let currentMonth = (new Date().getMonth() + 1).toString()
    currentMonth = currentMonth.length === 1 ? `0${currentMonth}` : currentMonth

    let currentDay = (new Date().getDate()).toString()
    currentDay = currentDay.length === 1 ? `0${currentDay}` : currentDay

    const startTime = `${new Date().getFullYear()}-${currentMonth}-${currentDay}`

    if (accountData.password !== accountData.confirmPassword) {
      alert("Password and Confirm Password must match")
      return
    }

    if (Object.entries(accountData).length < 10) {
      alert("We need more data!")
      return
    }

    if (!accountData.isLegalStatus) {
      alert("Only legal status can work with us.")
      return
    }

    const requestData = {
      ...accountData,
      starTime: startTime
    }

    const result = await postAccountData(requestData);
    if (result) {
      alert("Account Successfully Created!")
      props.history.push('/login'); // Navigate to login page on successful registration
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create Staff Account
              </h1>
              <Label>
                <span>Email</span>
                <Input value={accountData.email} className="mt-1" type="email" placeholder="john@bcu.com" onChange={(e) => { handleInputChange("email", e.target.value) }} />
              </Label>

              <Label className="mt-4" >
                <span>First Name</span>
                <Input value={accountData.firstName} className="mt-1" type="text" placeholder="Your First Name" onChange={(e) => { handleInputChange("firstName", e.target.value) }} />
              </Label>

              <Label className="mt-4" >
                <span>Last Name</span>
                <Input value={accountData.lastName} className="mt-1" type="text" placeholder="Your Last Name" onChange={(e) => { handleInputChange("lastName", e.target.value) }} />
              </Label>

              <Label className="mt-4" >
                <span>Phone Number</span>
                <Input value={accountData.phoneNumber} className="mt-1" type="number" placeholder="Your UK Number" onChange={(e) => { handleInputChange("phoneNumber", e.target.value) }} />
              </Label>

              <Label className="mt-4" >
                <span>Post Code</span>
                <Input value={accountData.postCode} className="mt-1" type="text" placeholder="Your UK Post Code" onChange={(e) => { handleInputChange("postCode", e.target.value) }} />
              </Label>

              <Label className="mt-4">
                <span>Date of Birth</span>
                <Input value={accountData.dob} className="mt-1" type="date" onChange={(e) => { handleInputChange("dob", e.target.value) }} />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input value={accountData.password} className="mt-1" placeholder="***************" type="password" onChange={(e) => { handleInputChange("password", e.target.value) }} />
              </Label>

              <Label className="mt-4">
                <span>Confirm password</span>
                <Input value={accountData.confirmPassword} className="mt-1" placeholder="***************" type="password" onChange={(e) => { handleInputChange("confirmPassword", e.target.value) }} />
              </Label>

              <Label className="mt-6" check>
                <Input checked={accountData.isLegalStatus} type="checkbox" onChange={(e) => { handleInputChange("isLegalStatus", !workLegally) }} />
                <span className="ml-2">
                  I confirm I can work in the UK Legally
                </span>
              </Label>

              <Button tag={Link} onClick={(target) => handleCreateAccount(target)} to="/login" block className="mt-4">
                Create account
              </Button>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default withRouter(CreateAccount)
