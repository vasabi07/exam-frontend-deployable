import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { allTeachersAtom } from "../components/atoms";
import PICard from "../components/PICard";
//list of allteachers
//run a filter on them

type teacher = {
  id: string;
  name: string;
  email: string;
  image: string;
};

const StudentDashboard = () => {
  const allteachers = useRecoilValueLoadable<teacher[]>(allTeachersAtom);
  return (
    <div>
      <PICard />
      {JSON.stringify(allteachers)}
    </div>
  );
};

export default StudentDashboard;
