import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { TeacherpersonalInfoAtom } from "../components/atoms";

type Student = {
  id: string;
  name: string;
  email: string;
};

type TeacherInfo = {
  id: string;
  name: string;
  email: string;
  isTeacher: boolean;
  students: { student: Student }[];
  QPs: {
    id: string;
    name: string;
  }[];
};

const TeacherDashboard = () => {
  const personalInfo = useRecoilValueLoadable<TeacherInfo>(TeacherpersonalInfoAtom);

  // Check loading state
  if (personalInfo.state === "loading") {
    return <div className="text-center p-4">Loading personal info...</div>;
  } else if (personalInfo.state === "hasValue") {
    return (
      <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Teacher Dashboard</h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <p className="text-gray-700">ID: {personalInfo.contents.id}</p>
          <p className="text-gray-700">Name: {personalInfo.contents.name}</p>
          <p className="text-gray-700">Email: {personalInfo.contents.email}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold">Subscribed Students</h2>
          {personalInfo.contents.students.length > 0 ? (
            personalInfo.contents.students.map(({ student }) => (
              <div className="border-b-2 p-4 bg-blue-50" key={student.id}>
                <p className="text-gray-800 font-medium">{student.name}</p>
                <p className="text-gray-600">{student.email}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No subscribed students found.</p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold">Question Papers</h2>
          {personalInfo.contents.QPs.length > 0 ? (
            personalInfo.contents.QPs.map((qp) => (
              <div className="p-4 bg-stone-200 rounded mb-2" key={qp.id}>
                <span className="font-medium">{qp.name}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No question papers available.</p>
          )}
        </div>
      </div>
    );
  }

  return null; // Optional: Handle the "hasError" state if needed
};

export default TeacherDashboard;
