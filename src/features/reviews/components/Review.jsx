import { MDBCardImage, MDBIcon, MDBTypography } from 'mdb-react-ui-kit';
import React from 'react';
import { Link, useMatch } from 'react-router-dom';

import styles from './css/Review.module.css';

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
    content,
    location_name,
    location,
  } = review;

  const match = useMatch('/locations/:id');

  return (
    <>
      <div className={`d-flex flex-start ${styles.reviewContainer}`}>
        <MDBCardImage
          className={`rounded-circle shadow-1-strong me-3 ${styles.avatar}`}
          src={profile_image}
          alt={`${owner}'s profile`}
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
                <button
                  className={`${styles.linkMuted} btn btn-link p-0`}
                  onClick={() => onEdit(review)}
                  aria-label={`Edit review: ${subject}`}
                >
                  <MDBIcon fas icon="pencil-alt" />
                  <span className="visually-hidden">Edit</span>
                </button>
                <button
                  className={`ms-2 ${styles.linkMuted} btn btn-link p-0`}
                  onClick={() => onDelete(id)}
                  aria-label={`Delete review: ${subject}`}
                >
                  <MDBIcon fas icon="trash" />
                  <span className="visually-hidden">Delete</span>
                </button>
              </div>
            )}
          </div>
          <div className={styles.reviewMainContent}>
            <div className={styles.headerContainer}>
              <MDBTypography tag="h5" className={styles.subject}>
                {subject}
              </MDBTypography>
              {!match && (
                <Link
                  to={`/locations/${location}`}
                  className={styles.locationLink}
                  aria-label={`View location: ${location_name}`}
                >
                  <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                  <p>{location_name}</p>
                </Link>
              )}
            </div>
            <p className={styles.contentText}>{content}</p>
          </div>
        </div>
      </div>
      <hr className="my-0" />
    </>
  );
};

export default Review;