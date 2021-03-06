import React from "react";
import styled from "styled-components";

import AdminRight from "./AdminRight";
import UserRight from "./UserRight";

const RightSide = ({
  bookingList,
  setBookingList,
  isAdmin,
  setTrack,
  track,
  services,
  setAdminClick,
  adminClick,
  setUserClick,
  userClick,
  setTrackStatus,
  trackStatus,
}) => {
  return (
    <StyledRightSidebar className="col-md-8 offset-md-1">
      {/* SHOW ORDERS  */}
      {isAdmin ? (
        <AdminRight
          bookingList={bookingList}
          setBookingList={setBookingList}
          isAdmin={isAdmin}
          setTrack={setTrack}
          track={track}
          services={services}
          setAdminClick={setAdminClick}
          adminClick={adminClick}
          setTrackStatus={setTrackStatus}
          trackStatus={trackStatus}
        ></AdminRight>
      ) : (
        <UserRight
          bookingList={bookingList}
          isAdmin={isAdmin}
          setUserClick={setUserClick}
          userClick={userClick}
        ></UserRight>
      )}
    </StyledRightSidebar>
  );
};

const StyledRightSidebar = styled.div`
  background: #c7ced9;
  padding: 0rem;
  min-height: 80vh;
  color: white;
  @media (max-width: 500px) {
    padding: 0rem;
  }
`;
export default RightSide;
