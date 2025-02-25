import React from "react";
import { Filters } from "./Filters";
import { filterValue, TODO_FILTERS } from "../types";

interface FooterProps {
  activeCount: number;
  completedCount: number;
  filterSelected: filterValue;
  setFilterChange: (filter: filterValue) => void;
  onClearCompleted: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  activeCount,
  completedCount,
  filterSelected,
  setFilterChange,
  onClearCompleted,
}) => {
  const plural = activeCount !== 1 ? "s" : "";
  return (
    <footer className="footer">
      <span className="todo-count">
        {`${activeCount} tarea${plural} pendiente${plural}`}
      </span>
      <Filters
        filterSelected={filterSelected}
        onFilterChange={setFilterChange}
      />
      {completedCount > 0 && filterSelected !== TODO_FILTERS.ACTIVE && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Borrar completados
        </button>
      )}
    </footer>
  );
};
