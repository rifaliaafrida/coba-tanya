// src/pages/HomePage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThreadList from "../components/ThreadList";
import { fetchThreads } from "../redux/slices/threadSlice";
import Header from "../components/Header"; // Pastikan Header diimpor dengan benar

const HomePage = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.threads);

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  useEffect(() => {
    console.log(data); // Contoh penggunaan data
  }, [data]);

  return (
    <div className="home-page">
      <Header /> {/* Memastikan Header diimpor dengan benar */}
      {status === "loading" && <p>Loading threads...</p>}
      {status === "success" && data && <ThreadList threads={data} />}
      {status === "failed" && <p>{error}</p>}
    </div>
  );
};

export default HomePage;
