import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Cut from './Cut/Cut'

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loading /> : <Cut />

};

export default App;