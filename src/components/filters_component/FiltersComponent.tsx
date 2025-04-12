import * as React from "react";
import { IFilters } from "../../types";
interface IFiltersProp {
  handleFilterSubmit: (filters: IFilters) => void;
}
const FiltersComponent: React.FunctionComponent<IFiltersProp> = (
  handleFilterSubmit
) => {
  return <div>Filters</div>;
};

export default FiltersComponent;
