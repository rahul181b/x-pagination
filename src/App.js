import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      setData(res.data);
    } catch (e) {
      alert("failed to fetch data")
      console.log(e);
    }
  }

  let lastIndex = currentPage * 10;
  let firstIndex = lastIndex - 10;
  const currentItems = data.slice(firstIndex, lastIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div >
      <div className="heading"><h2>Employee Data Table</h2></div>
      <div>
        <table className="table" >
          <thead>
            <tr className="headingRow" >
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {
              currentItems.map((item, index) => (
                <tr className="body-row" key={index}>
                  <td className="table-data">{item.id}</td>
                  <td className="table-data">{item.name}</td>
                  <td className="table-data">{item.email}</td>
                  <td className="table-data">{item.role}</td>
                </tr>
              ))
            }

          </tbody>

        </table>
      </div>
      <div className="button-container">
        <button onClick={() => { paginate(currentPage - 1) }} disabled={currentPage === 1}>Previous</button>
        <button>{currentPage}</button>
        <button onClick={() => { paginate(currentPage + 1) }} disabled={lastIndex >= data.length}>Next</button>
      </div>

    </div>
  );
}

export default App;
