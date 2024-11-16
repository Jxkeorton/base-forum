import React, {useState} from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import LocationCard from './LocationCard';

const CountryGroup = ({ country, locations }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <h2>
          {country} 
          <i onClick={toggleCollapse} style={{ cursor: 'pointer', marginLeft: '10px' }}>
            <i className={isCollapsed ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-up"}></i>
          </i>
        </h2>

        {/* Conditionally render the location cards based on the collapse state */}
        {!isCollapsed && (
          <Row className="location-cards">
            {locations.map((location, index) => (
              <Col key={index} sm={12} md={4} lg={4} className="mb-3">
                <LocationCard location={location} />
              </Col>
            ))}
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default CountryGroup;