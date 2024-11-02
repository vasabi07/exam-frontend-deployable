"use client";
import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { allTeachersAtom } from "../components/atoms";
import PICard from "../components/PICard";
type Teacher = {
  id: string;
  name: string;
  email: string;
  image: string;
}
const StudentDashboard = () => {
    const allTeachers = useRecoilValueLoadable<Teacher[]>(allTeachersAtom);

    return (
        <div className="max-w-3xl mx-auto text-black p-4">
            <PICard />
            <h2 className="text-2xl font-semibold mb-4">All Teachers</h2>
            {allTeachers.state === "loading" ? (
                <div className="text-center text-gray-500">Loading teachers...</div>
            ) : allTeachers.state === "hasValue" ? (
                <div className="space-y-4">
                  <span className="text-white text-2xl">Check out more teachers here:</span>
                    {allTeachers.contents.length > 0 ? (
                        allTeachers.contents.map((teacher) => (
                            <div key={teacher.id} className="bg-white border rounded-lg shadow-md p-4 flex items-center space-x-4">
                                <img src={teacher.image} alt={teacher.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <h3 className="font-semibold">{teacher.name}</h3>
                                    <p className="text-gray-500">{teacher.email}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500">No teachers available</div>
                    )}
                </div>
            ) : (
                <div className="text-red-500">Error loading teachers.</div>
            )}
        </div>
    );
};

export default StudentDashboard;
