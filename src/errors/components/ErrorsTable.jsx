import { Link as RouterLink } from "react-router-dom";

const ErrorsTable = ({
  errors,
  prevPage,
  nextPage,
  currentPage,
  totalPages,
}) => {
  if (!errors?.length) {
    return (
      <div style={{ textAlign: "center", padding: "50px", margin: "50px" }}>
        <p
          style={{
            fontSize: "30px",
            padding: "50px",
            margin: "50px",
            border: "1px solid gray",
            backgroundColor: "#f1f1f1",
            borderRadius: "50px",
          }}
        >
          No Data
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Error Title
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Type</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Handled
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Time</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {errors.map((error) => (
            <tr key={error.error_id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <RouterLink
                  to={`/errors/${error.error_id}`}
                  style={{
                    color: "#007bff",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {error.name}
                </RouterLink>
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {error.type}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <span
                  style={{
                    borderRadius: "20px",
                    backgroundColor: error.handled ? "#d4edda" : "#f8d7da",
                    color: error.handled ? "#155724" : "#721c24",
                    padding: "5px 10px",
                    display: "inline-block",
                    border: `1px solid ${
                      error.handled ? "#c3e6cb" : "#f5c6cb"
                    }`,
                  }}
                >
                  {error.handled ? "Handled" : "Unhandled"}
                </span>
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {new Date(error.created_at).toLocaleString()}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {error.resolved ? "Resolved" : "Unresolved"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous Page
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default ErrorsTable;
