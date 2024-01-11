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

function ListStaffs() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [jobs, setJobs] = useState([])
    const [taskJobs, setUserJobs] = useState([])
    const [selectedUser, setSelectedUser] = useState()
    const [selectedJobs, setSelectedJobs] = useState()

    function openModal(user) {
        setSelectedUser(user)
        setUserJobs([]); // Reset the user jobs
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
        setSelectedUser(null)
        setUserJobs([]); // Reset the user jobs
    }

    const [users, setUsers] = useState([])

    const setReturnedUsers = (apiData) => {
        setUsers(apiData.responseData)
    }

    const setReturnedJobs = (apiData) => {
        setJobs(apiData.data)
    }

    const setReturnedUserJobs = (apiData) => {
        setUserJobs(apiData.data)
    }

    const handleJobsSelection = (target) => {
        // Construct an array of selected option values
        let selectedOptions = [target.value]

        // Filter the complete jobs data based on selected option values
        console.log(selectedOptions)
        let selectedJobsData = jobs.filter(job => selectedOptions.indexOf(job.taskId.toString()) > -1);
        console.log(selectedJobsData)
        setSelectedJobs(selectedJobsData)
    }


    const isSkillSelected = (skillId) => {
        return taskJobs.some(ts => ts.skillId === skillId);
    }

    const handleJobUpdate = async (e) => {
        e.preventDefault()

        let apiUrl = `${process.env.REACT_APP_USERS_API_URL}/api/usertasks/user/task`;
        console.log(selectedJobs)
        selectedJobs.map((newUserJob) => {
            const data = {
                taskId: newUserJob.taskId,
                userId: selectedUser.id,
                taskName: newUserJob.title
            }
            const result = postData(data, apiUrl)
            console.log(result)
            if (result) {
                alert("Job's User Updated")
                closeModal()
            }
        })
    }

    useEffect(() => {
        let apiUrl = `${process.env.REACT_APP_USERS_API_URL}/api/users`;
        fetchData(apiUrl, setReturnedUsers)

        fetchData(`${process.env.REACT_APP_TASKS_API_URL}/task`, setReturnedJobs)
    }, [])


    useEffect(() => {
        //     if (selectedUser) {
        //         let apiUrl = `${process.env.REACT_APP_TASKS_API_URL}/taskskill?taskId=${selectedUser.taskId}`;
        //         fetchData(apiUrl, setReturnedUserJobs)
        //     }
    }, [selectedUser, isModalOpen])


    return (
        <>

            <PageTitle>Staffs</PageTitle>

            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

                <TableContainer className="mb-8">
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Post Code</TableCell>
                                <TableCell>Date of Birth</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </tr>
                        </TableHeader>
                        <TableBody>


                            {users.map((user, index) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <span className="text-sm">{user.firstName}</span> {' '}
                                        <span className="text-sm">{user.lastName}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{user.phoneNumber}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">£{user.postCode}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{new Date(user.dob).toLocaleDateString()}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Button onClick={() => {
                                                openModal(user)
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
                <ModalHeader>{!selectedUser ? null : (selectedUser.firstName + " " + selectedUser.lastName)}</ModalHeader>
                <ModalBody>
                    {selectedUser ? (<>{selectedUser.postCode} | {selectedUser.email} </>) : null}

                    <Label className="mt-4">
                        <span>Jobs</span>
                        <Select className="mt-1" onChange={(e) => handleJobsSelection(e.target)} >
                            <option  >Select a Task</option>
                            {
                                jobs.map((job) => <option key={job.taskId} value={job.taskId} >{job.title}</option>)
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

export default ListStaffs
