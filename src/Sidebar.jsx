import PropTypes from "prop-types";
import "./Sidebar.css";

function Sidebar({ userData }) {
  return (
    <section id="sidebar">
      <h4>Liked</h4>
      {userData.liked.length > 0 ? (
        <ul>
          {userData.liked.map((title) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      ) : (
        <p>No movies liked yet!</p>
      )}

      <h4>Watched</h4>
      {userData.watched.length > 0 ? (
        <ul>
          {userData.watched.map((title) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      ) : (
        <p>Empty. Visit the cinema!</p>
      )}
    </section>
  );
}

Sidebar.propTypes = {
  userData: PropTypes.object.isRequired,
};
export default Sidebar;
