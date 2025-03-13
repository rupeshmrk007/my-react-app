import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const initialRow = { name: '', city: '', country: '' };

const App = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabData, setTabData] = useState(
    Array(7).fill().map(() => [{ ...initialRow }])
  );

  const handleAddRow = () => {
    setTabData((prevData) => {
      const newData = [...prevData];
      newData[activeTab - 1] = [...newData[activeTab - 1], { ...initialRow }];
      return newData;
    });
  };

  const handleDeleteRow = (index) => {
    setTabData((prevData) => {
      const newData = [...prevData];
      newData[activeTab - 1] = newData[activeTab - 1].filter((_, i) => i !== index);
      return newData;
    });
  };

  const handleInputChange = (index, field, value) => {
    setTabData((prevData) => {
      const newData = [...prevData];
      newData[activeTab - 1][index][field] = value;
      return newData;
    });
  };

  const handleCopyToAll = () => {
    setTabData((prevData) => {
      const currentTabData = [...prevData[activeTab - 1]];
      return prevData.map(() => [...currentTabData]);
    });
  };

  const handleSubmit = () => {
    console.clear();
    tabData.forEach((data, index) => {
      console.log(`Tab ${index + 1} Data:`, data);
    });
    alert('Data submitted! Check console for details.');
  };

  return (
    <Router basename="/my-react-app">
    <div className="app">
      <header className="header">a<span className="highlight">i</span>ra</header>
      <div className="tabs">
        {Array.from({ length: 7 }, (_, i) => (
          <button
            key={i}
            className={`tab ${activeTab === i + 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(i + 1)}
          >
            TAB {i + 1}
          </button>
        ))}
      </div>

      <div className="content">
        <div className="actions">
          <button className="copy-btn" onClick={handleCopyToAll}>COPY TO ALL</button>
          <button className="add-btn" onClick={handleAddRow}>ADD ROW</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tabData[activeTab - 1]?.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    placeholder="Name"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.city}
                    onChange={(e) => handleInputChange(index, 'city', e.target.value)}
                    placeholder="City"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.country}
                    onChange={(e) => handleInputChange(index, 'country', e.target.value)}
                    placeholder="Country"
                  />
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDeleteRow(index)}>DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="submit-container">
          <button className="submit-btn" onClick={handleSubmit}>SUBMIT</button>
        </div>
      </div>
    </div>
    </Router>
  );
};

export default App;
