
// ...existing code...

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';

const PageContainer = styled.div`
  background: #EAEAEA !important;
  min-height: 100vh;
  width: 100vw;
  padding: 0;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem 2rem 1.5rem;
    max-width: 100%;
    box-sizing: border-box;
  }
`;

const Title = styled.h1`
  font-family: 'Canela Text', 'Playfair Display', serif;
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
    margin: 0 0 2rem 0;
    padding: 0;
  }
`;

const Subtitle = styled.h2`
  font-family: 'Canela Text', 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: left;
  
  @media (max-width: 768px) {
    text-align: center;
    margin: 0 0 2.5rem 0;
    padding: 0;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const Field = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;

const Label = styled.label`
  font-family: 'Satoshi', 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    margin: 0 0 0.5rem 0;
    padding: 0;
  }
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid #222;
  font-size: 1.2rem;
  padding: 0.7rem 0;
  margin-bottom: 0.5rem;
  font-family: 'Satoshi', 'Inter', sans-serif;
  outline: none;
  color: #111;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.8rem 0;
    border-bottom: 2px solid #333;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Select = styled.select`
  background: transparent;
  border: none;
  border-bottom: 2px solid #222;
  font-size: 1.2rem;
  padding: 0.7rem 0;
  margin-bottom: 0.5rem;
  font-family: 'Satoshi', 'Inter', sans-serif;
  outline: none;
  color: #111;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.8rem 0;
    border-bottom: 2px solid #333;
    background: rgba(255, 255, 255, 0.1);
    min-height: 44px;
  }
`;

const Textarea = styled.textarea`
  background: transparent;
  border: 2px solid #222;
  border-radius: 8px;
  font-size: 1.2rem;
  padding: 1rem;
  font-family: 'Satoshi', 'Inter', sans-serif;
  outline: none;
  min-height: 140px;
  margin-bottom: 0.5rem;
  color: #111;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 1rem;
    border: 2px solid #333;
    background: rgba(255, 255, 255, 0.1);
    min-height: 120px;
  }
`;

const CharCount = styled.div`
  font-size: 1rem;
  color: #222;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    text-align: right;
    margin: 0 0 2rem 0;
    padding: 0;
  }
`;

const FooterText = styled.div`
  font-family: 'Canela Text', 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    text-align: center;
    margin: 2rem 0;
    padding: 0;
    font-size: 1.1rem;
  }
`;

const SendButton = styled.button`
  background: #111;
  color: #fff;
  font-size: 1.3rem;
  font-family: 'Satoshi', 'Inter', sans-serif;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  padding: 1rem 3rem;
  cursor: pointer;
  margin-left: auto;
  display: block;
  
  @media (max-width: 768px) {
    width: 100%;
    margin: 2rem 0 0 0;
    padding: 1.2rem 2rem;
    font-size: 1.2rem;
    min-height: 50px;
    border-radius: 12px;
  }
`;

function ContactPage() {
  const [message, setMessage] = useState('');
  // Remove sending and sent state
  const maxChars = 1000;
  const form = useRef();

  // Uncomment and configure for EmailJS
  // const sendEmail = (e) => {
  //   e.preventDefault();
  //   setSending(true);
  //   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
  //     .then(() => {
  //       setSent(true);
  //       setSending(false);
  //     }, () => {
  //       setSending(false);
  //     });
  // };
  
  // Step-by-step EmailJS integration:
  // 1. Go to emailjs.com, add Zoho Mail as your email service (SMTP setup).
  // 2. Create an email template for your contact form fields.
  // 3. Get your Service ID, Template ID, and Public Key from EmailJS dashboard.
  // 4. Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY' below.
  
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      'service_iysukui',
      'template_dszswtm',
      form.current,
      'zsjbgEVyZHWMJ6zCH'
    )
      .then(() => {
        setMessage('');
        // Clear all form fields
        if (form.current) form.current.reset();
      }, () => {
        // On error, just clear fields as well
        setMessage('');
        if (form.current) form.current.reset();
      });
  };

  return (
    <PageContainer>
      <FormContainer ref={form} onSubmit={sendEmail}>
        <Title>Contact Us</Title>
        <Subtitle>Let’s Create Something Quietly Powerful.</Subtitle>
        <Row>
          <Field>
            <Label htmlFor="title">Title *</Label>
            <Select id="title" name="title" required>
              <option value="">Select a title</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
              <option value="Dr">Dr</option>
            </Select>
          </Field>
          <Field>
            <Label htmlFor="firstName">First name *</Label>
            <Input id="firstName" name="firstName" required />
          </Field>
        </Row>
        <Row>
          <Field>
            <Label htmlFor="lastName">Last name *</Label>
            <Input id="lastName" name="lastName" required />
          </Field>
          <Field>
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" required />
          </Field>
        </Row>
        <Row>
          <Field>
            <Label htmlFor="phone">Phone number *</Label>
            <Input id="phone" name="phone" required />
          </Field>
          <Field>
            <Label htmlFor="topic">Topic *</Label>
            <Select id="topic" name="topic" required>
              <option value="">Select a topic</option>
              <option value="General">General</option>
              <option value="Collaboration">Collaboration</option>
              <option value="Support">Support</option>
              <option value="Other">Other</option>
            </Select>
          </Field>
        </Row>
        <Field>
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            name="message"
            maxLength={maxChars}
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            placeholder="Type your message here ...."
          />
          <CharCount>{maxChars - message.length} characters max</CharCount>
        </Field>
        <FooterText>Built with intention. From Africa to the world.</FooterText>
  <SendButton type="submit">Send</SendButton>
      </FormContainer>
    </PageContainer>
  );
}

export default ContactPage;