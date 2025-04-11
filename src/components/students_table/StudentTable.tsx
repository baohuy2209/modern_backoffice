import * as React from "react";
import TableTitle from "../table_title/TableTitle";
import TableHeader from "../table_header/TableHeader";
import { Pagination, PaginationProps, Spin, Table, Tooltip } from "antd";
import AddDrawer from "../drawer/AddDrawer";
import AcionDropDown from "../action_dropdown/ActionDropDown";
import AvatarIcon from "../../assets/icons/avatar.svg";
const StudentsTable: React.FunctionComponent<IStudentsTableProps> = () => {
  return (
    <>
      <TableTitle totalStudents={totalStudents} />
      <div className="list_view">
        <TableHeader />
      </div>
    </>
  );
};

export default StudentsTable;
