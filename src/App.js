import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

const pathPrefix = process.env.NODE_ENV === "development" ? '' : '/Prod';

function App() {  
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${pathPrefix}/users.json`
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
        {
          data.map(user => (
            <div className="flex items-center m-4" key={`${user.id}`}>
              <img className="w-10 h-10 rounded-full mr-4" src={`${user.profile}`} alt={`Avatar of ${user.firstname} ${user.lastname}`} />
              <div className="text-sm">
                <p className="text-gray-900 leading-none">{`${user.firstname} ${user.lastname}`}</p>
                <p className="text-gray-600">{`${user.email}`}</p>
              </div>
            </div>
          ))
        }
    </div>
  );
}

export default App;
