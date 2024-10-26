import React from 'react'
import { useRecoilValueLoadable } from 'recoil';
import { StudentpersonalInfoAtom } from './atoms';

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

const PICard = () => {
    const personalInfo = useRecoilValueLoadable<personalInfo>(StudentpersonalInfoAtom);

    if (personalInfo.state === "loading") {
        return <div>personalInfo details are loading...</div>;
      } else if(personalInfo.state === "hasValue") {
        return (
          <div className='flex flex-col bg-blue-100 shadow-md'>
           <span>{personalInfo.contents.id}</span> 
           <span>{personalInfo.contents.name}</span>  
           <span></span> {personalInfo.contents.email}
            
            {personalInfo.contents.teachers.map((teacher)=>{
              return ( <div className='border-b-2 shadow-sm p-2 bg-blue-100 '>
                        <span>{teacher.image}</span>
                        <span>{teacher.name}</span>
                        <span>{teacher.email}</span>
                        
                </div>)
            })}
          </div>
        );
      }
    };
    

export default PICard