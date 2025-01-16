import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

import { axiosReq } from '../../../shared/api/axiosDefault';
import LocationForm from '../components/LocationForm';
import { useLocationsContext } from '../context/LocationsContext';

const ManageLocations = () => {
    const { id } = useParams(); // This will be undefined for new locations
    const navigate = useNavigate();
    const { locations, loading: contextLoading } = useLocationsContext();
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(id ? true : false);

    useEffect(() => {
        if (id && locations.length > 0) {
          const foundLocation = locations.find(loc => loc.id === parseInt(id));
          
          if (foundLocation) {
            setLocation(foundLocation);
            setIsLoading(false);
          } else {
            // If location not found, redirect
            toast.error('Location not found');
            navigate('/locations');
          }
        } else if (!id) {
          setIsLoading(false);
        }
    }, [id, locations, navigate]);

    const handleSubmit = async (formData) => {
        try {
          // Implement your API call here
          const url = id ? `/locations/${id}/` : '/locations/';
          const method = id ? 'PUT' : 'POST';
    
          const response = await axiosReq({
            method,
            url,
            data: formData,
          });
          
          if (response.data) {
            toast.success(id ? 'Location updated successfully' : 'Location created successfully');
            navigate('/locations/update');
            return response.data;
          }
        } catch (error) {
            if (error.response?.data) {
                // DRF validation errors come as an object with field names as keys
                const errors = error.response.data;
                Object.keys(errors).forEach(key => {
                  const message = Array.isArray(errors[key]) 
                    ? errors[key].join(', ') 
                    : errors[key];
                  toast.error(`${key}: ${message}`);
                });
              } else {
                toast.error(`Failed to ${id ? 'update' : 'create'} location`);
            }
            throw error;
        }
    };

  return (
    <LocationForm 
      location={location}
      isLoading={isLoading}
      onSubmit={handleSubmit} 
    />
  );
};

export default ManageLocations;
