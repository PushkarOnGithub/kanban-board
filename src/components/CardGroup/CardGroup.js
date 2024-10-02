import React from "react";
import TicketCard from "../TicketCard/TicketCard";
import "./CardGroup.css";

const CardGroup = ({ group, groupBy, users, groupedData }) => {
  const priorityNames = {
    0: "Low",
    1: "Medium",
    2: "High",
    3: "Urgent",
    4: "Urgent",
  };
  const statusIcons = {
    Todo: "assets/To-do.svg",
    "In progress": "assets/in-progress.svg",
    Backlog: "assets/Backlog.svg",
    Done: "assets/Done.svg",
    Cancelled: "assets/Cancelled.svg",
  };
  const priorityIcons = {
    0: "assets/IMG - Low Priority.svg",
    1: "assets/IMG - Medium Priority.svg",
    2: "assets/IMG - High Priority.svg",
    3: "assets/SVG - Urgent Priority grey.svg",
    4: "assets/SVG - Urgent Priority colour.svg",
  };
  const userProfilePic = (name) => {
    return `https://ui-avatars.com/api/?name=${name
      .split(" ")
      .join("+")
      .toUpperCase()}&background=random`;
  };
  return (
    <>
      <div className="group-heading">
        {groupBy === "status" && (
          <img
            className="group-image"
            src={statusIcons[group]}
            alt="group-image"
          />
        )}
        {groupBy === "userId" && (
          <img
            className="group-image"
            src={userProfilePic(group)}
            alt="group-image"
          />
        )}
        {groupBy === "priority" && (
          <img
            className="group-image"
            src={priorityIcons[group]}
            alt="group-image"
          />
        )}
        <h3 className="group-title">{priorityNames[group] || group}</h3>
        <p className="group-count">{groupedData[group].length}</p>
        <img className="group-add-icon" src="assets/add.svg" alt="add" />
        <img
          className="group-menu-icon"
          src="assets/3 dot menu.svg"
          alt="add"
        />
      </div>
      {groupedData[group].map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          user={users.find((u) => u.id === ticket.userId)}
        />
      ))}
    </>
  );
};

export default CardGroup;
