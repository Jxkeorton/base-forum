import React, {useState, useEffect} from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import LocationCard from './LocationCard';

const CountryGroup = ({ country, locations, isFirst }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(() => {
      setIsCollapsed(!isFirst);
    }, [isFirst]);

    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <h2>
          {country} 
          <button
            onClick={toggleCollapse}
            aria-expanded={!isCollapsed}
            aria-label={`${isCollapsed ? 'Expand' : 'Collapse'} ${country} section`}
            className="btn btn-link p-0 border-0"
            style={{ cursor: 'pointer', marginLeft: '10px', display: 'inline-flex', alignItems: 'center' }}
          >
            <i className={isCollapsed ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up'} />
          </button>
        </h2>

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