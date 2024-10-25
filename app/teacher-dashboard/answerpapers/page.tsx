import { answerpapersforTeacherAtom } from '@/app/components/atoms'
import React from 'react'
import { useRecoilValueLoadable } from 'recoil'
//get all answerpapers related to this teacherId
//seperate the ones that has been corrected and the ones that havent been 
const Answerpapers = () => {
    const answerpapers = useRecoilValueLoadable(answerpapersforTeacherAtom);
    //this gives me allanswerpapers with student details and correponding qpId(not need tho)
  return (
    <div>
        {JSON.stringify(answerpapers)}
    </div>
  )
}

export default Answerpapers
