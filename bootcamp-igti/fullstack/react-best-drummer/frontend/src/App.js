import React, { useEffect, useState } from 'react';
import Spinner from './components/Spinner';
import Header from './components/Header';
import Candidates from './components/Candidates';

export default function App() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const interval = setInterval(() =>  {
      fetch("http://localhost:8080/votes").then(res => {
        return res.json().then(json => {

         setCandidates(json.candidates);
        });
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [candidates]);

    if (candidates.length === 0){
      return (<Spinner />)
    }
    return (
    <div className="container">
      <Header title="Election" />
      <Candidates candidates={candidates} />
    </div>
    )
}
