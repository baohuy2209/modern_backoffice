import * as React from "react";

interface ITableTitleProps {
  totalStudents: number;
}

const TableTitle: React.FunctionComponent<ITableTitleProps> = ({
  totalStudents,
}) => {
  return (
    <div className="flex gap-10 items-center">
      <p className="text-[3.2rem] font-semibold">Students Table</p>
      <p className="text-[1.6rem] shadow-lg py-2 px-6 text-violet-700 font-semibold border border-violet-700 rounde-full bg-violet-100">
        {totalStudents} Students
      </p>
    </div>
  );
};

export default TableTitle;
