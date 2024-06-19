import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook

interface ITableRow {
  // Define your row data structure
  id: number;
  userId: number;
  title: string;
  body: string;
}

function ViewRow() {
  const [rowData, setRowData] = useState<ITableRow | null>(null);
  const { id } = useParams(); // Get the :id parameter from the URL

  useEffect(() => {
    // Fetch data for the specific row ID from your API or local storage
    // Replace with your actual data fetching logic
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`) // Assuming an API endpoint
      .then((response) => response.json())
      .then((data) => setRowData(data));
  }, [id]);

  return (
    <div>
      {/* Display details of the retrieved row data */}
      {rowData && (
        <>
          <p>User ID: {rowData.userId}</p>
          <p>ID: {rowData.id}</p>
          <p>Title: {rowData.title}</p>
          <p>Body: {rowData.body}</p>
        </>
      )}
    </div>
  );
}

export default ViewRow;
