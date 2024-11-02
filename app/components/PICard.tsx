"use client";
import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { StudentpersonalInfoAtom } from './atoms';

type Teacher = {
    id: string;
    name: string;
    email: string;
    image: string;
}

type PersonalInfo = {
    id: string;
    name: string;
    email: string;
    isTeacher: boolean;
    teachers: Teacher[];
}

const PICard = () => {
    const personalInfo = useRecoilValueLoadable<PersonalInfo>(StudentpersonalInfoAtom);

    if (personalInfo.state === "loading") {
        return <div className="text-center p-4 text-gray-500">Personal info is loading...</div>;
    } else if (personalInfo.state === "hasValue") {
        return (
            <div className='flex flex-col bg-white shadow-lg rounded-lg p-6 mb-4'>
                <h2 className="text-xl font-bold mb-2">{personalInfo.contents.name}</h2>
                <span className="text-gray-600 mb-2">{personalInfo.contents.email}</span>
                <span className="text-gray-500">ID: {personalInfo.contents.id}</span>
                <h3 className="mt-4 text-lg font-semibold">Teachers:</h3>
                {personalInfo.contents.teachers.length > 0 ? (
                    personalInfo.contents.teachers.map((teacher) => (
                        <div key={teacher.id} className='border-b border-gray-300 py-2 flex items-center space-x-4'>
                            <img src={teacher.image} alt={teacher.name} className="w-10 h-10 rounded-full" />
                            <div>
                                <span className="font-semibold">{teacher.name}</span>
                                <br />
                                <span className="text-gray-500">{teacher.email}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500">No teachers assigned</div>
                )}
            </div>
        );
    }
};

export default PICard;
