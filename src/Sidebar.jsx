import PropTypes from "prop-types";

function Sidebar({ userData }) {
    return (
        <>
            <h4>Watched</h4>
            <div>{userData.watched}</div>
            <h4>Liked</h4>
            <div>{userData.liked}</div>
        </>
    )
}

Sidebar.propTypes = {
    userData: PropTypes.object.isRequired,
}
export default Sidebar;