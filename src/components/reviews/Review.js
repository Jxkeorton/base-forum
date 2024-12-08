import React from "react";
import { MDBCardImage, MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import styles from "./css/Review.module.css";

// Credit for the components of a Review https://mdbootstrap.com/docs/react/extended/comments/

const Review = ({ review, onEdit, onDelete }) => {

  const {
    profile_image,
    owner,
    created_at,
    hazard,
    is_owner,
    id,
    subject,
    content
  } = review;

  return (
    <>
      <div className={`d-flex flex-start ${styles.reviewContainer}`}>
        <MDBCardImage
          className={`rounded-circle shadow-1-strong me-3 ${styles.avatar}`}
          src={profile_image}
          alt="avatar"
          width="60"
          height="60"
        />
        <div>
          <MDBTypography
            tag="h6"
            className={`fw-bold mb-1 ${styles.ownerName}`}
          >
            {owner}
          </MDBTypography>

          <div
            className={`d-flex align-items-center mb-3 ${styles.reviewMeta}`}
          >
            <p className="mb-0">
              {created_at}
              {hazard && (
                <span className={`badge bg-danger ${styles.hazardBadge}`}>
                  Hazard
                </span>
              )}
            </p>

            {is_owner && (
              <div className={`ms-2 ${styles.iconButtons}`}>
                <a
                  href="#!"
                  className={styles.linkMuted}
                  onClick={() => onEdit(review)}
                >
                  <MDBIcon fas icon="pencil-alt" />
                </a>
                <a
                  href="#!"
                  className={`ms-2 ${styles.linkMuted}`}
                  onClick={() => onDelete(id)}
                >
                  <MDBIcon fas icon="trash" />
                </a>
              </div>
            )}
          </div>

          <MDBTypography
            tag="h5"
            className={`text-decoration-underline mb-1 ${styles.subject}`}
          >
            {subject}
          </MDBTypography>

          <p className={`mb-0 ${styles.reviewContent}`}>{content}</p>
        </div>
      </div>
      <hr className="my-0" />
    </>
  );
};

export default Review;
