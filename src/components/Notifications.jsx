import React from "react";
import { Link } from "react-router-dom";
import "../styles/Notifications.css";

const notifications = {
  new: [
    {
      user: "karennnne",
      action: "liked your photo",
      time: "1h",
      avatar: "../src/assets/images/5.jpg",
      thumbnail: "/../src/assets/images/1.jpg",
    },
  ],
  today: [
    {
      user: "kiero.d, zackjohn and 26 others",
      action: "liked your photo",
      time: "3h",
      avatar: "../src/assets/images/2.jpg",
      thumbnail: "../src/assets/images/5.jpg",
    },
  ],
  week: [
    {
      user: "craig_love",
      action: "mentioned you in a comment: '@jacob.w exactly...'",
      time: "2d",
      avatar: "../src/assets/images/3.jpg",
      type: "comment",
    },
    {
      user: "martini_rond",
      action: "started following you",
      time: "3d",
      avatar: "../src/assets/images/4.jpg",
      type: "follow",
    },
    {
      user: "maxjacobson",
      action: "started following you",
      time: "3d",
      avatar: "../src/assets/images/5.jpg",
      type: "follow",
    },
    {
      user: "mis_peter",
      action: "started following you",
      time: "3d",
      avatar: "../src/assets/images/6.jpg",
      type: "follow",
      showFollow: true,
    },
  ],
};

export default function Notifications() {
  return (
    <div className="notifications-container">
      <h5 className="section-title">New</h5>
      {notifications.new.map((n, i) => (
        <NotificationItem key={i} {...n} />
      ))}

      <h5 className="section-title">Today</h5>
      {notifications.today.map((n, i) => (
        <NotificationItem key={i} {...n} />
      ))}

      <h5 className="section-title">This Week</h5>
      {notifications.week.map((n, i) => (
        <NotificationItem key={i} {...n} />
      ))}
    </div>
  );
}

function NotificationItem({ user, action, time, avatar, thumbnail, type, showFollow }) {
  return (
    <div className="notification-item">
      <img src={avatar} alt={user} className="avatar" />
      <div className="notification-text">
        <span><strong>{user}</strong> {action}</span>
        <small className="text-muted">{time}</small>
        {type === "comment" && <a href="#" className="reply-link">Reply</a>}
      </div>
      {thumbnail && <img src={thumbnail} alt="thumb" className="thumb" />}
      {showFollow && <button className="btn btn-sm btn-primary">Follow</button>}
    </div>
  );
}
