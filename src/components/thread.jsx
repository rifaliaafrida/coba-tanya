// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ThreadList from "./components/ThreadList";

const thread = () => {
  const [threads, setThreads] = useState([]);
  const [usersMap, setUsersMap] = useState({});

  useEffect(() => {
    const fetchThreadsAndUsers = async () => {
      try {
        // Fetch threads
        const threadsResponse = await axios.get("https://forum-api.dicoding.dev/v1/threads");
        setThreads(threadsResponse.data.data.threads);

        // Fetch users
        const usersResponse = await axios.get("https://forum-api.dicoding.dev/v1/users");
        const users = usersResponse.data.data.users;

        // Create a map from userId to user details
        const usersMap = users.reduce((map, user) => {
          map[user.id] = user;
          return map;
        }, {});
        setUsersMap(usersMap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchThreadsAndUsers();
  }, []);

  return (
    <div>
      <h1>Thread List</h1>
      <ThreadList threads={threads} usersMap={usersMap} />
    </div>
  );
};

export default thread;
