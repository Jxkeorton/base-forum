import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { axiosReq } from '../../../shared/api/axiosDefault';
import ConfirmationModal from '../../../shared/components/ConfirmationModal';
import { useCurrentUser } from '../../auth/context/CurrentUserContext';

const LocationCard = ({ location }) => {
    const [totalHeight, setTotalHeight] = useState(location.total_height);
    const [rockDrop, setRockDrop] = useState(location.total_height);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { isAdmin } = useCurrentUser();
    

    const navigate = useNavigate();

    useEffect(() => {
        if (location.total_height == null) {
            setTotalHeight('Unknown');
        } else {
            setTotalHeight(location.total_height);
        }

        if (location.rock_drop == null) {
            setRockDrop('Unknown');
        } else {
            setRockDrop(location.rock_drop);
        }
    }, [location]);

    const handleMoreInfoClick = () => {
        navigate(`/locations/${location.id}`);
    };

    const handleEditLocation = () => {
        navigate(`/locations/update/${location.id}`);
    };

    const handleDeleteLocation = async () => {
        try {
            const response = await axiosReq.delete(`/locations/${location.id}/`);
            if (response.status === 204) {
                setShowDeleteModal(false);
                toast.success('Location deleted successfully');
                navigate('/locations');
            }
        } catch (err) {
            console.error('Delete failed:', err.response?.data || err);
        }
    };

    return (
        <>
            <Card className="shadow-sm p-2 mb-3 d-flex flex-column" style={{ height: '400px', width: '350px'}}>
                {/* Image */}
                {location.image && (
                    <Card.Img
                        variant="top"
                        src={location.image}
                        alt={location.name}
                        style={{ height: '150px', objectFit: 'cover' }}
                    />
                )}
                
                <Card.Body>
                    <Card.Title style={{ fontSize: '1rem', fontWeight: 'bold' }}>{location.name}</Card.Title>
                    <Card.Text style={{ fontSize: '0.8rem' }}><strong>Opened by:</strong> {location.opened_by}</Card.Text>
                    <Card.Text style={{ fontSize: '0.8rem' }}>
                        <strong>Total Height:</strong> {totalHeight !== 'Unknown' ? `${totalHeight} Feet` : 'Unknown'}
                    </Card.Text>
                    <Card.Text style={{ fontSize: '0.8rem' }}>
                        <strong>Rock Drop:</strong> {rockDrop !== 'Unknown' ? `${rockDrop} Feet` : 'Unknown'}
                    </Card.Text>
                    <Button onClick={handleMoreInfoClick} variant="primary" size="sm">More Info</Button>
                </Card.Body>
                {isAdmin &&
                    <Card.Footer>
                        <Button className='me-3' variant="warning" onClick={handleEditLocation} size="sm">Edit Location</Button>
                        <Button variant="danger" onClick={() => setShowDeleteModal(true)} size="sm">Delete Location</Button>
                    </Card.Footer>
                }
            </Card>

            <ConfirmationModal 
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleAction={handleDeleteLocation}
                title = 'Delete Location'
                bodyText = 'Are you sure you want to delete this location? This cannot be undone.'
                actionLabel = 'Delete'
                cancelLabel = 'Cancel'
            />
        </>
    );
};

export default LocationCard;