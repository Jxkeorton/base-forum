import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LocationCard = ({ location }) => {
    const [totalHeight, setTotalHeight] = useState(location.total_height);
    const [rockDrop, setRockDrop] = useState(location.total_height);

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
        navigate(`/locations/${location.id}`); // Navigate to location details page using the ID
    };

    return (
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
        </Card>
    );
};

export default LocationCard;