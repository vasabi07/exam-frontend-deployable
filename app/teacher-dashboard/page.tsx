import React from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { TeacherpersonalInfoAtom } from '../components/atoms'

const TeacherDashboard = () => {
    const personalInfo = useRecoilValueLoadable(TeacherpersonalInfoAtom)
    //we get teacherinfo,qps,subscribed students list all in one query.
  return (
    <div>
        {JSON.stringify(personalInfo)}
    </div>
  )
}

export default TeacherDashboard