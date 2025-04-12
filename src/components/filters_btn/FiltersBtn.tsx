import * as React from "react";
import { Button } from "antd";
import FiltersIcon from "../../assets/icons/filters.svg";
interface IFilterBtnProps {
  handleClick: () => void;
}

const FilterBtn: React.FunctionComponent<IFilterBtnProps> = ({
  handleClick,
}) => {
  return (
    <Button
      className="!text-blue-500 border !border-blue-500 hover:opacity-80"
      onClick={handleClick}
    >
      <img src={FiltersIcon} alt="Filters" />
      Filters
    </Button>
  );
};

export default FilterBtn;
