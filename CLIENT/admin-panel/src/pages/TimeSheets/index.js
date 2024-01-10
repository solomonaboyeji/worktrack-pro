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
import { TrashIcon, EditIcon, MoneyIcon } from '../../icons'

function Timesheets() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [taskSkills, setTaskSkills] = useState([])
    const [selectedTask, setSelectedTask] = useState()
    const [timeSheets, setTimeSheets] = useState([])
    const [paidTimeSheets, setPaidTimeSheets] = useState([])
    const [users, setUsers] = useState([])
    const [currentWages, setCurrentWages] = useState([])

    const [tasks, setTasks] = useState([])

    const setReturnedTasks = (apiData) => {
        setTasks(apiData.data)
    }

    const handleSendPayment = async (e) => {
        e.preventDefault()

        let apiUrl = `${process.env.REACT_APP_PAYMENTS_API_URL}/send-payment/${selectedTimeSheet.user_id}`;
        postData({}, apiUrl)
        alert("Payment Paid! Thank You")
        refreshPaidTimeSheets()
        closeModal()

    }

    const getStaffName = (timesheet) => {
        let user = users.filter((user) => user.id === timesheet.user_id)
        if (user) {
            user = user[0]
            return `${user.firstName} ${user.lastName}`
        }

        return "No Name"
    }
    const getTaskName = (timesheet) => {

        let task = tasks.filter((task) => task.taskId === timesheet.task_id)
        if (task) {
            task = task[0]
            return `${task.title}`
        }
        return "Retail Job"
    }

    const getTotalWages = (timesheet) => {
        let task = tasks.filter((task) => task.taskId === timesheet.task_id)
        if (task) {
            return (Number.parseFloat(task[0].amountPerHour) * getHoursWorked(timesheet)).toString().substring(0, 6)
        }
        return 0
    }

    const getHoursWorked = (timesheet) => {
        return ((new Date(timesheet.date_clocked_out) - new Date(timesheet.date_clocked_in)) / (1000 * 60 * 60)).toString().substring(0, 6)
    }

    useEffect(() => {
        let apiUrl = `${process.env.REACT_APP_TASKS_API_URL}/task`;
        fetchData(apiUrl, setReturnedTasks)

        apiUrl = `${process.env.REACT_APP_TIMESHEETS_API_URL}/timesheet`
        fetchData(apiUrl, (data) => setTimeSheets(data['timesheets']))

        apiUrl = `${process.env.REACT_APP_USERS_API_URL}/api/users`
        fetchData(apiUrl, (data) => setUsers(data['responseData']))

    }, [])

    const refreshPaidTimeSheets = () => {
        const apiUrl = `${process.env.REACT_APP_PAYMENTS_API_URL}/compute-all-wages`
        fetchData(apiUrl, (data) => {
            setCurrentWages(data['wages']);

            // Filter timesheets that has been paid
            let paidTimSheets = timeSheets.filter((timesheet) => {
                return (data['wages'].filter((wage) => timesheet.task_id == wage.task_id && wage.paid)).length > 0
            })
            setPaidTimeSheets(paidTimSheets)
        })
    }

    useEffect(() => {
        refreshPaidTimeSheets()
    }, [timeSheets])


    const isTimeSheetPaid = (timesheet) => {
        return paidTimeSheets.filter((paidTimeSheet) => paidTimeSheet.id == timesheet.id).length > 0
    }


    const [selectedTimeSheet, setSelectedTimeSheet] = useState(null)

    function openModal(timesheet) {
        setSelectedTimeSheet(timesheet)
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
        setSelectedTimeSheet(null)
    }

    return (
        <>

            <PageTitle>Timesheets</PageTitle>

            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

                <TableContainer className="mb-8">
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>Staff Name</TableCell>
                                <TableCell>Task</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Date In</TableCell>
                                <TableCell>Date Out</TableCell>
                                <TableCell>Total Hours</TableCell>
                                <TableCell>Wages</TableCell>
                                <TableCell>Actions</TableCell>
                            </tr>
                        </TableHeader>
                        <TableBody>


                            {timeSheets.map((timesheet, index) => (
                                <TableRow key={timesheet.id}>
                                    <TableCell>
                                        <span className="text-sm">{getStaffName(timesheet)}</span>
                                    </TableCell>
                                    <TableCell className="text-center" >
                                        <span className="text-sm">{getTaskName(timesheet)}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{timesheet.date_clocked_out ? isTimeSheetPaid(timesheet) ? "Yes" : "No" : "-"}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{new Date(timesheet.date_clocked_in).toLocaleDateString()} {new Date(timesheet.date_clocked_in).toLocaleTimeString()}</span>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            !timesheet.date_clocked_out ? <></> :
                                                <span className="text-sm">{new Date(timesheet.date_clocked_out).toLocaleDateString()} {new Date(timesheet.date_clocked_out).toLocaleTimeString()} </span>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            timesheet.date_clocked_out ? <>{getHoursWorked(timesheet)}</> : null
                                        }
                                        <span className="text-sm"></span>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            timesheet.date_clocked_out ? <>£{getTotalWages(timesheet)}</> : null
                                        }
                                        <span className="text-sm"></span>
                                    </TableCell>
                                    <TableCell  >
                                        <div className="flex items-center space-x-4">
                                            {timesheet.date_clocked_out ? <Button onClick={() => {
                                                openModal(timesheet)
                                            }} layout="link" size="icon" aria-label="Edit">
                                                <MoneyIcon className="w-5 h-5" aria-hidden="true" />
                                            </Button> : null}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>


            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>Pay {!selectedTimeSheet ? null : getStaffName(selectedTimeSheet)}</ModalHeader>
                <ModalBody>
                    {selectedTimeSheet ? (<>{getTaskName(selectedTimeSheet)}</>) : null}

                    <Label className="mt-4">
                        £{selectedTimeSheet ? getTotalWages(selectedTimeSheet) : null}

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
                        <Button onClick={handleSendPayment} >Send Payment</Button>
                    </div>
                    <div className="block w-full sm:hidden">
                        <Button block size="large" layout="outline" onClick={closeModal}>
                            Close
                        </Button>
                    </div>
                    <div className="block w-full sm:hidden">
                        <Button onClick={handleSendPayment} block size="large">
                            Update Job
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>

        </>
    )
}

export default Timesheets
