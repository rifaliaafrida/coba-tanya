import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchThreads } from '../redux/slices/threadSlice';
import Loader from './Loader';

function DataFetchingComponent() {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    dispatch(fetchThreads())
      .then(() => {
        setTimeout(() => {
          setShowLoader(false);
        }, 3000);
      })
      .catch(() => {
        setShowLoader(false);
      });
  }, [dispatch]);

  if (showLoader) {
    return <Loader />;
  }

  return (
    <div>
      <Loader />
    </div>
  );
}

export default DataFetchingComponent;
