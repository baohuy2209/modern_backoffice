import * as React from "react";
import { IColumnsBtn } from "../../types";
import { Button, Dropdown, Switch } from "antd";
import ColumnsIcon from "../../assets/icons/columns.svg";
import { Key } from "react";
const ColumnsBtn: React.FunctionComponent<IColumnsBtn> = ({
  columnsInfo,
  handleChangeColumns,
}) => {
  const handleCheck = (key: Key) => {
    if (!columnsInfo) {
      return;
    }
    const col = columnsInfo.find((col) => col?.key === key);
    if (!col) {
      return;
    }
    col.hidden = !col?.hidden;
    handleChangeColumns([...columnsInfo]);
  };
  const items = columnsInfo?.map((col, i) => {
    return {
      key: i,
      label: (
        <div>
          <p>{col?.title as string}</p>
          <Switch
            checked={!col?.hidden}
            onChange={() => {
              handleCheck(col?.key as Key);
            }}
          />
        </div>
      ),
    };
  });
  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <Button className="!text-violet-700 border !border-violet-700 hover:opacity-80">
        <img src={ColumnsIcon} alt="Columns" />
        Columns
      </Button>
    </Dropdown>
  );
};

export default ColumnsBtn;
