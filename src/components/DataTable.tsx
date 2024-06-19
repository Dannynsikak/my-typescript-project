// src/components/DataTable.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ITableRow } from "./Models/Data";
import { useNavigate } from "react-router-dom";

interface IDataTableProps {}

const DataTable: React.FC<IDataTableProps> = () => {
  const [data, setData] = useState<ITableRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Define button handling functions (replace with your actual logic)
  const handleViewButton = (rowData: ITableRow) => {
    // window.open(`/view-row/${rowData.id}`, "_blank");
    navigate(`/view-row/${rowData.id}`);
  };
  const handleDeleteButton = async (rowData: ITableRow) => {
    console.log("Delete button clicked for row:", rowData);

    // Replace with your actual API endpoint and method (likely DELETE)
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${rowData.id}`
    );

    if (response.status === 200) {
      // Assuming successful deletion
      // Update data state to remove the deleted row
      setData(data.filter((item) => item.id !== rowData.id));
    } else {
      console.error("Error deleting data:", response);
      // Handle deletion errors (optional: show a user notification)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<ITableRow[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <p className="text-center text-xl">Loading data...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase "
              >
                userId
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase "
              >
                id
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase "
              >
                title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                body
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row: ITableRow) => (
              <tr key={row.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.userId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.body}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex space-x-2">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-bold"
                    onClick={() => handleViewButton(row)}
                  >
                    View
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-bold"
                    onClick={() => handleDeleteButton(row)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataTable;
