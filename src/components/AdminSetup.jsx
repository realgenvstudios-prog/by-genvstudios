import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import styled from 'styled-components';

const SetupContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #0056b3;
  }
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  
  &.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  &.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
`;

const InfoBox = styled.div`
  background: #e7f3ff;
  border: 1px solid #b8daff;
  color: #004085;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

export default function AdminSetup() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    email: user?.emailAddresses?.[0]?.emailAddress || '',
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createFirstAdmin = useMutation(api.setupAdmin.createFirstAdmin);
  const hasAdmins = useMutation(api.setupAdmin.hasAdmins);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // First check if admins already exist
      const adminsExist = await hasAdmins();
      
      if (adminsExist) {
        setMessage('Admin users already exist. Contact your system administrator to be added as an admin.');
        setIsSuccess(false);
        setIsLoading(false);
        return;
      }

      // Create the first admin
      const result = await createFirstAdmin({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
      });

      setMessage(result.message);
      setIsSuccess(true);
      
      // Refresh the page after a short delay to show the success message
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('Error creating admin:', error);
      setMessage(error.message || 'Failed to create admin user. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <SetupContainer>
      <Title>Admin Setup</Title>
      
      <InfoBox>
        <strong>First Time Setup:</strong> Create your first admin user account. 
        This user will have super admin privileges and can create additional admin users.
      </InfoBox>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <Input
          type="email"
          name="email"
          placeholder="Your Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating Admin...' : 'Create First Admin User'}
        </Button>
      </Form>

      {message && (
        <Message className={isSuccess ? 'success' : 'error'}>
          {message}
        </Message>
      )}
    </SetupContainer>
  );
}