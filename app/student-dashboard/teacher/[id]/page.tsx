import { teacherIdAtom, teacherIdSelector } from "@/app/components/atoms";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
type teacherInfo = {
  name: string;
  email: string;
  image: string;
  subscribed: boolean;
  QPs: {
    id: string;
    name: string;
  };
};
const TeacherProfile = () => {
  const { teacherId } = useParams();
  const [_, setTeacherId] = useRecoilState(teacherIdAtom);
  useEffect(() => {
    if (teacherId && typeof teacherId === "string") {
      setTeacherId(teacherId);
    }
  }, [teacherId, setTeacherId]);
  const teacherInfo = useRecoilValueLoadable<teacherInfo>(teacherIdSelector);
  const HandleSubscribe =async ()=>{
    const response = await axios.get(`http://localhost:8000/${teacherId}/question-papers`,{
        withCredentials: true
    })
    //handle the response
  }
  return (
    <div>
      <div className="p-2">
        {teacherInfo.contents.image}
        {teacherInfo.contents.name}
        {teacherInfo.contents.email}
      </div>
      <div>
        {teacherInfo.contents.subscribed && (
            <div className="p-2 rounded-lg bg-gray-300 text-stone-800 ">
                <button>Subscribed</button>
            </div>
        )}
         {!teacherInfo.contents.subscribed && (
            <div onClick={HandleSubscribe} className="p-2 rounded-lg bg-red-700 text-white shadow-sm">
                <button>Subscribe</button>
            </div>
        )}
      </div>
      <div>
        {/* may be put the qps in a seperate state to make the fetching and using becomes easy. */}
        {teacherInfo.contents.QPs.map((qp: {name: string,id: string})=>{
           return <div className=" w-24 h-24 bg-gray-100 shadow-sm cursor-pointer">
                <span className="text-lg font-bold">{qp.name}</span>
            </div>
        })}
      </div>
       {/* //subscribe button logic //qp clicked logic */}

    </div>
  );
};

export default TeacherProfile;
