import { FC } from "react";
import { filterValue, TODO_FILTERS } from "../types";

interface FiltersProps {
  filterSelected: filterValue;
  onFilterChange: (filter: filterValue) => void;
}

export const Filters: FC<FiltersProps> = ({
  filterSelected,
  onFilterChange,
}) => {
  return (
    <ul className="filters">
      {Object.values(TODO_FILTERS).map((filter) => (
        <li key={filter}>
          <a
            href={`/?filter=${filter}`}
            className={filter === filterSelected ? "selected" : ""}
            onClick={(e) => {
              e.preventDefault();
              onFilterChange(filter);
            }}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </a>
        </li>
      ))}
    </ul>
  );
};
