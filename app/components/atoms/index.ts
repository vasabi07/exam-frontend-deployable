import axios from "axios";
import { atom, selector } from "recoil";

export const StudentpersonalInfoAtom  = atom({
    key: "StudentpersonalInfoAtom",
    default: selector({
        key: "StudentpersonalInfoAtomSelector",
        get:async ()=>{
            const response = await axios.get("http://localhost:8000/student/personalinfo",{
                withCredentials: true
            })
            return response.data.payload
        }
    })
})
export const TeacherpersonalInfoAtom  = atom({
    key: "TeacherpersonalInfoAtom",
    default: selector({
        key: "TeacherpersonalInfoAtomSelector",
        get:async ()=>{
            const response = await axios.get("http://localhost:8000/teacher/personalinfo",{
                withCredentials: true
            })
            return response.data.payload
        }
    })
})

export const allTeachersAtom = atom({
    key: "allTeachersAtom",
    default: selector({
        key: "allTeachersAtomSelector",
        get: async ()=>{
            const response = await axios.get("http://localhost:8000/allTeachers",{
                withCredentials: true
            })
            return response.data.payload
        }
    })
})
export const teacherIdAtom = atom({
    key: "teacherIdAtom",
    default: ""
})

export const teacherIdSelector = selector({
    key: "teacherIdSelector",
    get:async ({get})=>{
        const teacherId = get(teacherIdAtom);
        if(!teacherId) return null;
        const response = await axios.get(`http://localhost:8000/teacher/${teacherId}`,{
            withCredentials: true
        })
        return response.data.payload
    }
})

export const answerpapersforTeacherAtom = atom({
    key: "answerpapersforTeacherAtom",
    default: selector({
        key: "answerpapersforTeacherAtomSelector",
        get:async ()=>{
            const response = await axios.get("http://localhost:8000/teachers/answerpapers",{
                withCredentials: true
            });
            return response.data.payload;

        }
    })
})