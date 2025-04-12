import * as React from "react";
import { ITableHeaderProps } from "../../types";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import { Button, Input } from "antd";
import ColumnsBtn from "../columns_btn/ColumnsBtn";
import FiltersBtn from "../filters_btn/FiltersBtn";
import PlusIcon from "../../assets/icons/plus.svg";
import FiltersComponent from "../filters_component/FiltersComponent";
const TableHeader: React.FunctionComponent<ITableHeaderProps> = ({
  columnsInfo,
  handleChangeColumns,
  handleFilterSubmit,
  handleSearch,
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    handleSearch(e.target.value);
  };
  const toggleDrawer = useToggleDrawer();
  const handleOpenFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };
  const handleOpenDrawer = () => {
    toggleDrawer(true, "showDrawerAdd");
  };
  return (
    <>
      <div className="mt-10 flex items-center justify-between">
        <Input
          placeholder="Search"
          className="w-1/2 p-3"
          value={searchValue}
          onChange={handleChangeSearch}
        />
        <div className="flex gap-6">
          <ColumnsBtn
            columnsInfo={columnsInfo}
            handleChangeColumns={handleChangeColumns}
          />
          <FiltersBtn handleClick={handleOpenFilters} />
          <Button type="primary" className="px-10" onClick={handleOpenDrawer}>
            <img src={PlusIcon} alt="Plus" />
            Add New Student
          </Button>
        </div>
      </div>
      <div className="mt-10">
        {isFiltersOpen && (
          <FiltersComponent handleFilterSubmit={handleFilterSubmit} />
        )}
      </div>
    </>
  );
};

export default TableHeader;
