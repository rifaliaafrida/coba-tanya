// src/services/api.js
const BASE_URL = "https://forum-api.dicoding.dev/v1";

const api = (() => {
  function putAccessToken(token) {
    localStorage.setItem("access_token", token);
  }

  function getAccessToken() {
    return localStorage.getItem("access_token");
  }

  async function fetchWithAuth(url, options = {}) {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      return response.json();
    } catch (error) {
      throw new Error("Fetch failed: " + error.message);
    }
  }

  async function register({ name, email, password }) {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed. Please try again.");
      }

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }

      return data.user;
    } catch (error) {
      throw new Error("Register failed: " + error.message);
    }
  }

  async function login({ email, password }) {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }

      putAccessToken(data.token); // Store token in local storage
      return data.token;
    } catch (error) {
      throw new Error("Login failed: " + error.message);
    }
  }

  async function getAllUsers() {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/users`);

      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }

      return data.users;
    } catch (error) {
      throw new Error("Fetch all users failed: " + error.message);
    }
  }

  async function getOwnProfile() {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/users/me`);

      if (!response.ok) {
        throw new Error("Failed to fetch own profile.");
      }

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }

      return data.user;
    } catch (error) {
      throw new Error("Get own profile failed: " + error.message);
    }
  }

  async function createThread({ title, body, category = "" }) {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create thread.");
      }

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }

      return data.thread;
    } catch (error) {
      throw new Error("Create thread failed: " + error.message);
    }
  }

  async function getAllThreads() {
    try {
      const response = await fetch(`${BASE_URL}/threads`);

      if (!response.ok) {
        throw new Error("Failed to fetch threads.");
      }

      const { status, message, data } = await response.json();

      console.log(data);

      if (status !== "success") {
        throw new Error(message);
      }

      return data.threads;
    } catch (error) {
      throw new Error("Fetch all threads failed: " + error.message);
    }
  }

  async function getDetailThread(threadId) {
    try {
      const response = await fetch(`${BASE_URL}/threads/${threadId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch thread detail.");
      }

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }

      return data.detailThread;
    } catch (error) {
      throw new Error("Fetch thread detail failed: " + error.message);
    }
  }

  async function createComment({ id, content }) {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/threads/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create comment.");
      }

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }

      return data.comment;
    } catch (error) {
      throw new Error("Create comment failed: " + error.message);
    }
  }

  async function upVoteThread(threadId) {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/up-vote`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upvote thread.");
      }

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }

      return data.vote;
    } catch (error) {
      throw new Error("Upvote thread failed: " + error.message);
    }
  }

  async function downVoteThread(threadId) {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/down-vote`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to downvote thread.");
      }

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }

      return data.vote;
    } catch (error) {
      throw new Error("Downvote thread failed: " + error.message);
    }
  }

  async function neutralVoteThread(threadId) {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/neutral-vote`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to vote thread neutrally.");
      }

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }

      return data.vote;
    } catch (error) {
      throw new Error("Neutral vote thread failed: " + error.message);
    }
  }

  async function upVoteComment(threadId, commentId) {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upvote comment.");
      }

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }

      return data.vote;
    } catch (error) {
      throw new Error("Upvote comment failed: " + error.message);
    }
  }

  async function downVoteComment(threadId, commentId) {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to downvote comment.");
      }

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }

      return data.vote;
    } catch (error) {
      throw new Error("Downvote comment failed: " + error.message);
    }
  }

  async function neutralVoteComment(threadId, commentId) {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to vote comment neutrally.");
      }

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }

      return data.vote;
    } catch (error) {
      throw new Error("Neutral vote comment failed: " + error.message);
    }
  }

  async function getLeaderboards() {
    try {
      const response = await fetch(`${BASE_URL}/leaderboards`);

      if (!response.ok) {
        throw new Error("Failed to fetch leaderboards.");
      }

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }

      return data.leaderboards;
    } catch (error) {
      throw new Error("Fetch leaderboards failed: " + error.message);
    }
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getAllUsers,
    getOwnProfile,
    createThread,
    getAllThreads,
    getDetailThread,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
    getLeaderboards,
  };
})();

export default api;
