// YearContainer.js
import React from 'react';
import SemesterTable from './SemesterTable';
import styled from 'styled-components';


const Container = styled.div`
  background-color:  #cf7fdf;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px; /* Add padding for spacing */
`
const TableContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px; /* Add margin for spacing between tables */
`
const Table = styled.div`
  background-color: #f5cffc;
  border: 1px solid #ccc;
  padding: 10px;
  width: 48%;
  margin-top: 10px; /* Add margin for spacing between tables */
`

const YearContainer = () => {
    return (
      <div className="year-container">
      <Container>
        <h2>First Year</h2>
        <TableContainer>
          <Table>
       
            <SemesterTable semester="Fall" />
          </Table>
          <Table>
   
            <SemesterTable semester="Spring" />
          </Table>
        </TableContainer>
      </Container>
      </div>
    );
  };
  

export default YearContainer;
