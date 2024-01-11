import React, { useEffect } from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import { useState } from 'react'
import { fetchData, postData } from '../../http'

import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableContainer,
    Select,
    Label,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from '@windmill/react-ui'
import { TrashIcon, EditIcon } from '../../icons'

function ListTasks() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [skills, setSkills] = useState([])
    const [taskSkills, setTaskSkills] = useState([])
    const [selectedTask, setSelectedTask] = useState()
    const [selectedSkills, setSelectedSkills] = useState()

    function openModal(task) {
        setSelectedTask(task)
        setTaskSkills([]); // Reset the task skills
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
        setSelectedTask(null)
        setTaskSkills([]); // Reset the task skills
    }

    const [tasks, setTasks] = useState([])

    const setReturnedTasks = (apiData) => {
        setTasks(apiData.data)
    }

    const setReturnedSkills = (apiData) => {
        setSkills(apiData.responseData)
    }

    const setReturnedTaskSkills = (apiData) => {
        setTaskSkills(apiData.data)
    }

    const handleSkillsSelection = (target) => {
        // Construct an array of selected option values
        let selectedOptions = Array.from(target.options)
            .filter(option => option.selected)
            .map(option => option.value);

        // Filter the complete skill data based on selected option values
        let selectedSkillsData = skills.filter(skill => selectedOptions.indexOf(skill.id.toString()) > -1);
        setSelectedSkills(selectedSkillsData)
    }


    const isSkillSelected = (skillId) => {
        return taskSkills.some(ts => ts.skillId === skillId);
    }

    const handleJobUpdate = async (e) => {
        e.preventDefault()

        let apiUrl = `${process.env.REACT_APP_TASKS_API_URL}/taskskill`;

        selectedSkills.map((newTaskSkill) => {
            if (!isSkillSelected(newTaskSkill.id)) {
                const data = {
                    taskId: selectedTask.taskId,
                    skillName: newTaskSkill.title,
                    skillId: newTaskSkill.id
                }
                postData(data, apiUrl)
            }
        })
        alert("Job's Task Updated")

        closeModal()
    }

    useEffect(() => {
        let apiUrl = `${process.env.REACT_APP_TASKS_API_URL}/task`;
        fetchData(apiUrl, setReturnedTasks)

        fetchData(`${process.env.REACT_APP_USERS_API_URL}/api/skills`, setReturnedSkills)
    }, [])


    useEffect(() => {
        if (selectedTask) {
            let apiUrl = `${process.env.REACT_APP_TASKS_API_URL}/taskskill?taskId=${selectedTask.taskId}`;
            fetchData(apiUrl, setReturnedTaskSkills)
        }
    }, [selectedTask, isModalOpen])


    return (
        <>

            <PageTitle>Jobs</PageTitle>

            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

                <TableContainer className="mb-8">
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>Title</TableCell>
                                <TableCell>Min Age</TableCell>
                                <TableCell>Wage/Hour</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </tr>
                        </TableHeader>
                        <TableBody>


                            {tasks.map((task, index) => (
                                <TableRow key={task.taskId}>
                                    <TableCell>
                                        <span className="text-sm">{task.title}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{task.minAge}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">£{task.amountPerHour}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{new Date(task.createdAt).toLocaleDateString()}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Button onClick={() => {
                                                openModal(task)
                                            }} layout="link" size="icon" aria-label="Edit">
                                                <EditIcon className="w-5 h-5" aria-hidden="true" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>{!selectedTask ? null : selectedTask.title}</ModalHeader>
                <ModalBody>
                    {selectedTask ? (<>{selectedTask.description}</>) : null}

                    <Label className="mt-4">
                        <span>Skills</span>
                        <Select className="mt-1" multiple onChange={(e) => handleSkillsSelection(e.target)} >
                            {
                                skills.map((skill) => <option selected={isSkillSelected(skill.id)} key={skill.id} value={skill.id} >{skill.title}</option>)
                            }
                        </Select>
                    </Label>

                </ModalBody>
                <ModalFooter>
                    {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
                    <div className="hidden sm:block">
                        <Button layout="outline" onClick={closeModal}>
                            Cancel
                        </Button>
                    </div>
                    <div className="hidden sm:block">
                        <Button onClick={handleJobUpdate} >Update Job</Button>
                    </div>
                    <div className="block w-full sm:hidden">
                        <Button block size="large" layout="outline" onClick={closeModal}>
                            Close
                        </Button>
                    </div>
                    <div className="block w-full sm:hidden">
                        <Button onClick={handleJobUpdate} block size="large">
                            Update Job
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>

        </>
    )
}

export default ListTasks
