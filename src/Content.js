import React, { useEffect, useState } from "react";
import "./styles/Content.css";
import CardGroup from "./components/CardGroup/CardGroup";

const Content = () => {
  const [groupBy, setGroupBy] = useState(() => localStorage.getItem("groupBy") || "status");
  const [sortBy, setSortBy] = useState(() => localStorage.getItem("sortBy") || "priority");
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [showContainer, setShowContainer] = useState(false);

  const handleGroupingOption = (e) => {
    setGroupBy(e.target.value);
    groupedData = groupedTickets();
    // console.log(groupedData);
  };
  const handleSortingOption = (e) => {
    setSortBy(e.target.value);
    groupedData = groupedTickets();
    // console.log(groupedData);
  };
  const handleNavButtonClick = () => {
    setShowContainer(!showContainer);
    console.log(showContainer);
  };

  // fetch and Try to Load saved state from localStorage
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment "
      );
      const data = await response.json();
      // console.log(data);
      setTickets(data.tickets);
      setUsers(data.users);
    };
    fetchData();
  }, []);

  // Save view state in localStorage upon any change
  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
    localStorage.setItem("sortBy", sortBy);
  }, [groupBy, sortBy]);

  // Sorting function
  const sortedTickets = tickets.slice().sort((a, b) => {
    if (sortBy === "priority") return b.priority - a.priority;
    if (sortBy === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  // Grouping function
  const groupedTickets = () => {
    switch (groupBy) {
      case "status":
        return groupByField("status");
      case "userId":
        return groupByField("userId");
      case "priority":
        return groupByField("priority");
      default:
        return {};
    }
  };

  // Helper function to group tickets by a given field
  const groupByField = (field) => {
    const data = sortedTickets.reduce((acc, ticket) => {
      const key =
        field === "userId"
          ? users.find((user) => user.id === ticket[field])?.name || "Unknown"
          : ticket[field];
      if (!acc[key]) acc[key] = [];
      acc[key].push(ticket);
      return acc;
    }, {});
    if (field === "priority") {
      const priorityKeys = ["0", "1", "2", "3", "4"];
      for (let key of priorityKeys) {
        if (!data[key]) data[key] = [];
      }
    }
    if (field === "status") {
      const statusKeys = [
        "Todo",
        "Done",
        "Cancelled",
        "In progress",
        "Backlog",
      ];
      for (let key of statusKeys) {
        if (!data[key]) data[key] = [];
      }
    }
    return data;
  };

  let groupedData = groupedTickets();
  return (
    <>
      <div className="navbar">
        <button className="nav-display-button" onClick={handleNavButtonClick}>
          <img src="assets/Display.svg" alt="Display" />
          Display
          <img src="assets/Down.svg" alt="Display" />
        </button>
      </div>
      {/* Grouping and Ordering */}
      {showContainer && (
        <div className="grouping-ordering-container">
          <div className="grouping-section">
            <label className="label">Grouping</label>
            <select
              className="dropdown"
              value={groupBy}
              onChange={handleGroupingOption}>
              <option value="userId">User</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div className="ordering-section">
            <label className="label">Ordering</label>
            <select
              className="dropdown"
              value={sortBy}
              onChange={handleSortingOption}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
      {/* Groups */}
      <div className="tickets-container">
        {Object.keys(groupedData).map((group) => (
          <div key={group} className="group">
            <CardGroup
              users={users}
              groupBy={groupBy}
              groupedData={groupedData}
              group={group}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Content;
