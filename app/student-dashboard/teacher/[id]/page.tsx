"use client";
import { teacherIdAtom, teacherIdSelector } from "@/app/components/atoms";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

type teacherInfo = {
  name: string;
  email: string;
  image: string;
  subscribed: boolean;
  QPs: QP[];
};

type QP = {
  id: string;
  name: string;
};

const TeacherProfile = () => {
  const teacherId = "97d127ef-e892-40a0-bb9b-ef2c7fdfd9b7";
  const [_, setTeacherId] = useRecoilState(teacherIdAtom);
  const teacherInfo = useRecoilValueLoadable<teacherInfo>(teacherIdSelector);
  const [qps, setQps] = useState<QP[]>([]);

  useEffect(() => {
    if (teacherId && typeof teacherId === "string") {
      setTeacherId(teacherId);
    }
  }, [teacherId, setTeacherId]);

  useEffect(() => {
    if (teacherInfo.state === "hasValue") {
      setQps(teacherInfo.contents.QPs || []);
    }
  }, [teacherInfo]);

  const HandleSubscribe = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/subscribe/${teacherId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const updatedTeacherInfo = await axios.get(`http://localhost:8000/teacher/${teacherId}`, {
          withCredentials: true,
        });

        if (updatedTeacherInfo.status === 200) {
          setQps(updatedTeacherInfo.data.payload.QPs || []);
        }
      } else {
        console.log("Error in subscription logic");
      }
    } catch (error) {
      console.log("Error during subscription:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white text-black rounded-lg shadow-md">
      {teacherInfo.state === "loading" && <p className="text-center text-gray-500">Loading...</p>}
      {teacherInfo.state === "hasError" && <p className="text-center text-red-500">Error loading teacher information.</p>}
      {teacherInfo.state === "hasValue" && (
        <>
          <div className="flex items-center mb-4">
            <img src={teacherInfo.contents.image} alt={teacherInfo.contents.name} className="w-16 h-16 rounded-full border-2 border-gray-300 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">{teacherInfo.contents.name}</h2>
              <p className="text-gray-600">{teacherInfo.contents.email}</p>
            </div>
          </div>
          <div className="mb-6">
            {teacherInfo.contents.subscribed ? (
              <div className="p-2 rounded-lg bg-gray-300 text-stone-800 text-center">
                <button disabled className="cursor-not-allowed">Subscribed</button>
              </div>
            ) : (
              <button
                onClick={HandleSubscribe}
                className="w-full p-2 rounded-lg bg-red-600 text-white shadow-md hover:bg-red-700 transition duration-300"
              >
                Subscribe
              </button>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Question Papers:</h3>
            {qps.length === 0 ? (
              <div className="text-gray-500">No QPs to display</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {qps.map((qp) => (
                  <div
                    key={qp.id}
                    className="p-4 bg-gray-100 text-black shadow-sm rounded-lg hover:shadow-lg transition duration-200 cursor-pointer"
                  >
                    <span className="text-lg font-bold">{qp.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherProfile;
