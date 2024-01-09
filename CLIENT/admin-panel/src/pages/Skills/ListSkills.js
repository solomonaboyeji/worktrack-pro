import React, { useEffect } from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import { useState } from 'react'
import postData, { fetchData } from '../../http'

import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableContainer,
    Button,
} from '@windmill/react-ui'
import { TrashIcon, EditIcon } from '../../icons'

function ListSkills() {

    const [skills, setSkills] = useState([])

    const setReturnedSkills = (apiData) => {
        setSkills(apiData.responseData)
    }

    useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_USERS_API_URL}/api/skills`;
        fetchData(apiUrl, setReturnedSkills)
    }, [])

    return (
        <>
            <PageTitle>Skills</PageTitle>

            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

                <TableContainer className="mb-8">
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </tr>
                        </TableHeader>
                        <TableBody>


                            {skills.map((skill, index) => (
                                <TableRow key={skill.id}>
                                    <TableCell>
                                        <span className="text-sm">{skill.title}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{skill.description}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{new Date(skill.createdAt).toLocaleDateString()}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Button onClick={(e) => { alert("Not Working.") }} layout="link" size="icon" aria-label="Edit">
                                                <EditIcon className="w-5 h-5" aria-hidden="true" />
                                            </Button>
                                            <Button onClick={(e) => { alert("Not Working.") }} layout="link" size="icon" aria-label="Delete">
                                                <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

        </>
    )
}

export default ListSkills
