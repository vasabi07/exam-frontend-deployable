import { teacherIdAtom, teacherIdSelector } from '@/app/components/atoms';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil';

const TeacherProfile = () => {
    const {teacherId} = useParams();
    const [_,setTeacherId] = useRecoilState(teacherIdAtom);
    useEffect(()=>{
        if(teacherId && typeof(teacherId)==="string"){
            setTeacherId(teacherId)
        }
    },[teacherId,setTeacherId])
    const teacherInfo = useRecoilValueLoadable(teacherIdSelector)
  return (
    <div>
        {
            //get subscription status
            //display qps accordingly
            //display basic info no matter what
            //subscribe button logic 
            //qp clicked logic 
        }
        {JSON.stringify(teacherInfo)}
    </div>
  )
}

export default TeacherProfile