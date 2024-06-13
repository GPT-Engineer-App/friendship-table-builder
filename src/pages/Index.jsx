import React, { useState, useEffect } from 'react';
import { Container, Table, Thead, Tbody, Tr, Th, Td, Button, Select, Input, VStack } from "@chakra-ui/react";

const Index = () => {
  const [rows, setRows] = useState(Array(15).fill({
    name: '',
    sex: '',
    phone: '',
    street: '',
    city: '',
    country: '',
    zip: '',
    email: '',
    years: ''
  }));

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('friendsData'));
    if (savedData) {
      setRows(savedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('friendsData', JSON.stringify(rows));
  }, [rows]);

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, {
      name: '',
      sex: '',
      phone: '',
      street: '',
      city: '',
      country: '',
      zip: '',
      email: '',
      years: ''
    }]);
  };

  const sendReport = () => {
    const email = "ohad_gross@hotmail.com";
    const subject = `Names Report - ${new Date().toLocaleString()}`;
    const body = rows.map(row => 
      `Name: ${row.name}, Sex: ${row.sex}, Phone: ${row.phone}, Street: ${row.street}, City: ${row.city}, Country: ${row.country}, Zip: ${row.zip}, Email: ${row.email}, Years: ${row.years}`
    ).join('\n');
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <Container centerContent maxW="container.xl" py={10}>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th textAlign="center">Friend's Name</Th>
            <Th textAlign="center">Sex</Th>
            <Th textAlign="center">Phone Number</Th>
            <Th textAlign="center">Street Name</Th>
            <Th textAlign="center">City</Th>
            <Th textAlign="center">Country</Th>
            <Th textAlign="center">Zip Code</Th>
            <Th textAlign="center">Email</Th>
            <Th textAlign="center">Years of Friendship</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, index) => (
            <Tr key={index}>
              <Td><Input size="sm" value={row.name} onChange={(e) => handleChange(index, 'name', e.target.value)} /></Td>
              <Td>
                <Select size="sm" value={row.sex} onChange={(e) => handleChange(index, 'sex', e.target.value)}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Homo">Homo</option>
                  <option value="Lesbian">Lesbian</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Bi Sexual">Bi Sexual</option>
                </Select>
              </Td>
              <Td><Input size="sm" value={row.phone} onChange={(e) => handleChange(index, 'phone', e.target.value)} /></Td>
              <Td><Input size="sm" value={row.street} onChange={(e) => handleChange(index, 'street', e.target.value)} /></Td>
              <Td><Input size="sm" value={row.city} onChange={(e) => handleChange(index, 'city', e.target.value)} /></Td>
              <Td><Input size="sm" value={row.country} onChange={(e) => handleChange(index, 'country', e.target.value)} /></Td>
              <Td><Input size="sm" value={row.zip} onChange={(e) => handleChange(index, 'zip', e.target.value)} /></Td>
              <Td><Input size="sm" value={row.email} onChange={(e) => handleChange(index, 'email', e.target.value)} /></Td>
              <Td><Input size="sm" value={row.years} onChange={(e) => handleChange(index, 'years', e.target.value)} /></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <VStack spacing={4} mt={4}>
        <Button onClick={addRow}>Add Row</Button>
        <Button colorScheme="blue" onClick={sendReport}>Send Report</Button>
      </VStack>
    </Container>
  );
};

export default Index;