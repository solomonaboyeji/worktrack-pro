import React from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Textarea, Button } from '@windmill/react-ui'
import { useState } from 'react'
import { postData } from '../../http'



function NewTask() {
    const [taskData, setTaskData] = useState({
        "title": "", "description": "", "refNumber": "", "minAge": "18", "amountPerHour": "12"
    })

    const handleInputChange = (key, value) => {
        setTaskData({
            ...taskData,
            [key]: value
        })
    }

    const handleLoginButton = async (e) => {
        e.preventDefault()

        if (!taskData.title || !taskData.description) {
            alert("Task Title and Description required")
            return
        }

        const apiUrl = `${process.env.REACT_APP_TASKS_API_URL}/task`;
        const result = await postData(taskData, apiUrl)
        if (result) {
            alert("Task Added Successfully.")
            setTaskData({
                "title": "", "description": "", "refNumber": "", "minAge": "18", "amountPerHour": "12"
            })
        }
    }


    return (
        <>
            <PageTitle>New Task</PageTitle>


            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <Label>
                    <span>Title</span>
                    <Input onChange={(e) => handleInputChange("title", e.target.value)} value={taskData.title} className="mt-1" placeholder="New Task Title" />
                </Label>

                <Label className="mt-4" >
                    <span>Description</span>
                    <Textarea onChange={(e) => handleInputChange("description", e.target.value)} value={taskData.description} className="mt-1" rows="3" placeholder="Enter task description." />
                </Label>

                <Label className="mt-4" >
                    <span>Reference Number</span>
                    <Input type="number" onChange={(e) => handleInputChange("refNumber", e.target.value)} value={taskData.refNumber} className="mt-1" placeholder="Reference Number" />
                </Label>

                <Label className="mt-4" >
                    <span>Minimum Age</span>
                    <Input type="number" onChange={(e) => handleInputChange("minAge", e.target.value)} value={taskData.minAge} className="mt-1" placeholder="Minimum Age" />
                </Label>

                <Label className="mt-4" >
                    <span>Wage Per Hour</span>
                    <Input type="number" onChange={(e) => handleInputChange("amountPerHour", e.target.value)} value={taskData.amountPerHour} className="mt-1" placeholder="Wage Per Hour" />
                </Label>


                <Label className="mt-4">
                    <Button onClick={handleLoginButton} className="mt-4" block tag={Button} >
                        Submit
                    </Button>
                </Label>

            </div>

        </>
    )
}

export default NewTask
