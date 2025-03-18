"use client";
import React, { useState, useEffect, useMemo } from "react";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton"; // Import MUI Skeleton
import ActionButton from "../ActionButton";

interface Column {
  Header: string;
  accessor: string;
}

interface DataRow {
  [key: string]: any;
}

interface TableProps {
  columns: Column[];
  data: DataRow[];
  buttonText?: string;
  buttonCallback?: any;
  isAction: boolean;
  handleEdit?: (val: any) => void;
  handleDelete?: (id: string | undefined) => void;
  isLoading?: boolean; // Optional prop to indicate loading state
}

const Table: React.FC<TableProps> = ({
  isAction,
  columns,
  data,
  handleEdit,
  handleDelete,
  buttonText,
  buttonCallback = () => {},
  isLoading = false, // Default is false
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filteredData = useMemo(
    () =>
      data.filter((row) =>
        columns?.some((column) => {
          return row[column.accessor]
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        })
      ),
    [data, columns, searchTerm] // dependencies for memoization
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleView = (id: string) => {
    console.log(`View ${id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <input
            type="text"
            className="border rounded px-4 py-2 mr-2 mb-2 w-full sm:w-auto"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {buttonText && (
            <button
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700"
              onClick={buttonCallback}
            >
              {buttonText}
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className=" overflow-auto max-h-[500px] sm:max-h-[700px] border rounded-lg shadow-md w-full">
              {isLoading ? (
                // Render Skeletons while loading
                <table className="min-w-full border-collapse">
                  <thead className="bg-gradient-to-r from-green-700 to-green-500 sticky top-5 z-30 ">
                    {" "}
                    <tr>
                      {columns &&
                        columns.map((column) => (
                          <th
                            key={column.accessor}
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-green-700"
                          >
                            {column.Header}
                          </th>
                        ))}
                      {isAction && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[...Array(5)].map((_, index) => (
                      <tr key={index}>
                        {columns.map((column) => (
                          <td
                            key={column.accessor}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            <Skeleton variant="text" animation="wave" />
                          </td>
                        ))}
                        {isAction && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Skeleton
                              variant="rectangular"
                              animation="wave"
                              width={80}
                              height={40}
                            />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-green-700 to-green-500 sticky top-0 z-1">
                    <tr>
                      {columns &&
                        columns.map((column) => (
                          <th
                            key={column.accessor}
                            scope="col"
                            className={`px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider ${
                              (column.accessor === "totalPoint" ||
                                column.accessor === "transactionType") &&
                              "text-center"
                            }`}
                          >
                            {column.Header}
                          </th>
                        ))}
                      {isAction && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {displayedData && displayedData.length > 0 ? (
                      displayedData.map((row, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-100 transition duration-150"
                        >
                          {columns.map((column) => (
                            <td
                              key={column.accessor}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              {column.accessor === "image" ? (
                                <img
                                  className="h-20 w-20 object-contain"
                                  src={row[column.accessor]}
                                  alt={row.name}
                                />
                              ) : (
                                <div
                                  className={`text-sm text-gray-900 ${
                                    (column.accessor === "totalPoint" ||
                                      column.accessor === "transactionType") &&
                                    "text-center"
                                  } `}
                                >
                                  {row[column.accessor]}
                                </div>
                              )}
                            </td>
                          ))}
                          {isAction && (
                            <td className="px-6 py-4 whitespace-nowrap">
                              <ActionButton
                                onEdit={() => handleEdit && handleEdit(row)}
                                onDelete={() =>
                                  handleDelete && handleDelete(row.id)
                                }
                                onView={() => handleView(row.id)}
                              />
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={columns.length + (isAction ? 1 : 0)}
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      {!isLoading && (
        <div className="flex justify-end items-center py-2">
          <Pagination
            count={totalPages}
            page={currentPage}
            defaultPage={1}
            boundaryCount={1}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default Table;
