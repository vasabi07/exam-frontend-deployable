import React from 'react'
import {  useRecoilStateLoadable } from 'recoil'
import { allTeachersAtom, StudentpersonalInfoAtom,  } from '../components/atoms'
//list of teachers
//run a filter on them 
//selection and routing to /teacher/[id]
//userinfo
type teacher = {
    id: string
    name: string,
    email: string,
    image: string

}

type personalInfo = {
    id: string,
    name: string,
    email: string
    isTeacher: boolean,
    teachers: teacher[]
}

const StudentDashboard = () => {
    const personalInfo = useRecoilStateLoadable<personalInfo>(StudentpersonalInfoAtom);
    const allteachers = useRecoilStateLoadable<teacher[]>(allTeachersAtom);
  return (
    <div>
        {JSON.stringify(personalInfo)}
        {JSON.stringify(allteachers)}
    </div>
  )
}

export default StudentDashboard