import React, { useState, useEffect } from 'react';
import axios from 'axios';
import lunr from 'lunr';
import { Formik, Form, Field } from 'formik';
import { useLunr } from 'react-lunr';

import './App.css';

const pathPrefix = process.env.NODE_ENV === "development" ? '' : '/Prod';

function App() {  
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('*');
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${pathPrefix}/users.json`
      );
      setData(result.data);
    };
    fetchData();
  }, []);
  
  const index = lunr(function() {
    this.ref('id');
    this.field('firstname');
    this.field('lastname');
    this.field('email');

    data.forEach(function(doc) {
        this.add(doc);
    }, this);
  });
  
  const userById = data.reduce((acc, cv) => {
      acc[cv.id] = cv;
      return acc;
  }, {});

  const results = useLunr(query, index, userById);

  return (
    <div>
      <Formik
          initialValues={{ query: '' }}
          onSubmit={(values, { setSubmitting }) => {
              setQuery(values.query ? values.query : '*');
              setSubmitting(false);
          }}
      >
          <Form className="w-full max-w-sm"> 
            <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
              <Field name="query" placeholder="firstname, lastname, email" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"/>
            </div>
          </Form>
      </Formik>
    
      <div>
        {
          results.map(user => (
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
    </div>
  );
}

export default App;
