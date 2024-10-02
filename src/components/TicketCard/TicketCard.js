import React from "react";
import "./TicketCard.css";

const TicketCard = ({ ticket, user }) => {
  const userProfilePic = (name) => {
    return `https://ui-avatars.com/api/?name=${name
      .split(" ")
      .join("+")
      .toUpperCase()}&background=random`;
  };
  const statusIcons = {
    Todo: "assets/To-do.svg",
    "In progress": "assets/in-progress.svg",
    Backlog: "assets/Backlog.svg",
    Done: "assets/Done.svg",
    Cancelled: "assets/Cancelled.svg",
  };
  const priorityIcons = {
    "0": "assets/IMG - Low Priority.svg",
    "1": "assets/IMG - Medium Priority.svg",
    "2": "assets/IMG - High Priority.svg",
    "3": "assets/SVG - Urgent Priority grey.svg",
    "4": "assets/SVG - Urgent Priority colour.svg",
  };
  return (
    <div className="card-container">
      <div className="card-user-details">
        <div className="card-user-id">{ticket.id}</div>
        <img
          className="card-user-picture"
          src={userProfilePic(user.name)}
          alt="profile"
        />
      </div>
      <div className="card-title-container">
        <img className="card-status-icon" src={statusIcons[ticket.status]} alt="status" />
        <p className="card-title">{ticket.title}</p>
      </div>
      <div className="card-info-container">
        <div className="priority-icon-container">
          <img
            className="card-priority-icon"
            src={priorityIcons[ticket.priority]}
            alt="icon"
          />
        </div>
        <div className="card-tags">
          <img src="assets/dot.png" alt="dot" />
          <p className="card-tag">Feature Request</p>
        </div>
      </div>
    </div>
  );
};
export default TicketCard;
