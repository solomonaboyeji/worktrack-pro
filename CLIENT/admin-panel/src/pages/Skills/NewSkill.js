import React from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Textarea, Button } from '@windmill/react-ui'
import { useState } from 'react'
import { postData } from '../../http'



function NewSkill() {
    const [skillData, setSkillData] = useState({
        "title": "", "description": ""
    })

    const handleInputChange = (key, value) => {
        setSkillData({
            ...skillData,
            [key]: value
        })
    }

    const handleLoginButton = async (e) => {
        e.preventDefault()

        if (!skillData.title || !skillData.description) {
            alert("Skill Title and Description required")
            return
        }

        const apiUrl = `${process.env.REACT_APP_USERS_API_URL}/api/skills`;
        const result = await postData(skillData, apiUrl)
        if (result) {
            alert("Skill Added Successfully.")
            setSkillData({
                description: '', title: ''
            })
        }
    }


    return (
        <>
            <PageTitle>New Skill</PageTitle>


            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <Label>
                    <span>Title</span>
                    <Input onChange={(e) => handleInputChange("title", e.target.value)} value={skillData.title} className="mt-1" placeholder="New Skill Title" />
                </Label>

                <Label className="mt-4" >
                    <span>Description</span>
                    <Textarea onChange={(e) => handleInputChange("description", e.target.value)} value={skillData.description} className="mt-1" rows="3" placeholder="Enter skill description." />
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

export default NewSkill
