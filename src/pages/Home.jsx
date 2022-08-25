import React, {useEffect, useState} from 'react';
import  { GetAllEmployees, GetAllSkills, GetAllExpertiseLevel, GetSkillsByEmployeeId}  from '../httpService.js';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Table from 'react-bootstrap/Table';
import ModalHomeSkills from './Modals/ModalHomeSkills.jsx';
import Loading from './loading/Loading.js';
const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [ employees, setEmployees ] = useState( [] )
  const [ filtersemployees, setFilterEmployees ] = useState( [] )
  const [ skills, setSkills ] = useState( [] )
  const [ expertises, setExpertises ] = useState( [] )
  const [loading, setLoading] = useState(false);
  const [skillsbyemployee, setskillsbyemployee] = useState([])
  const [employeeWithskill, setEmployee] = useState([])

  // For every search
  const [search, setSearch] = useState('');

  const sendDataEmployee = async (employeedata) => {
    const response = await getSkillsByEmployeeId(employeedata);
    setEmployee(employeedata)
    setskillsbyemployee(response.skills)
    setShowModal(true)
  }

  const getSkillsByEmployeeId = async (employeedata) => {
    const response = await GetSkillsByEmployeeId(employeedata);
    return(response.result);
  }

  useEffect ( () => {
    // setLoading(true)
    getAllEmployees()
    getAllSkills()
    getAllExpertiseLevel()
    // setLoading(false)
  }, [])

  const getAllEmployees = async () => {
    const response = await GetAllEmployees()
    setEmployees(response)
  }
  const getAllSkills = async () => {
    const response = await GetAllSkills()
    setSkills(response)
  }
  const getAllExpertiseLevel = async () => {
    const response = await GetAllExpertiseLevel()
    setExpertises(response)
  }
  const handleChange = (event) =>{ 
    setSearch(event.target.value); 
  }

  // const filteredEmployees = 
  //   employees.filter(
  //     employee => 
  //   employee.firstName.toLowerCase().includes(search.toLowerCase())
  //   )

    return (
      <Container>
        {loading && <Loading />}
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label >Search by Name</Label>
                <Input  id="Email" placeholder="Search Employees" onChange={(event) => handleChange(event)}/>
              </FormGroup>
              <FormGroup>
                <Label >Search by Expert Level</Label>
                <Input type="select" name="select" id="SelectExpert">
                  { expertises.map( (expertise) =>(
                     <option>{expertise.Order}. {expertise.Name}</option> 
                  ))}
                </Input>
              </FormGroup>             
            </Form>
          </Col>
          <Col>
            <FormGroup>
              <Label>Search by Skills</Label>
              <Input type="select" name="selectMulti" id="SelectMulti" multiple size={5}>
                { skills.map( (skill) =>(
                      <option>{skill.skillId}. {skill.name}</option> 
                    ))}                

              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 'auto', offset: 0 }}>
            <Button color="warning" size="sm"> Search Employees </Button>  
          </Col>
                  
        </Row>
        <Row>
          <FormGroup>
            <Label >Total Found: {employees.length} Results {' '}
              <Button color="secondary" size="sm">
                Export to Excel 
              </Button>
            </Label>
              <Table className='table table-striped' bordered size="sm">
                <thead className='text-dark'>
                  <tr>
                    <th> # </th>
                    <th>Name</th>
                    <th>Date of Joining</th>
                    <th>Designation</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  { employees.map( (employee) =>(
                      <tr key={employee.EmployeeId}>
                        <td> {employee.EmployeeId}</td>
                        <td> {employee.Name + " "+employee.LastName} </td>
                        <td> {employee.JoiningDate.slice(0, 9)} </td>
                        <td> {employee.Designation} </td>
                        <td> {employee.Email} </td>
                        <td>

                          {/* Pass Employee to modal */}
                        <Button color="info" size="sm" onClick={ () => sendDataEmployee(employee) }>View Skills</Button> 
                        </td>
                      </tr>
                  )) }
                </tbody>
              </Table>
          </FormGroup>
 
        </Row>

        <ModalHomeSkills 
          showModal = {showModal} 
          setShowModal = {setShowModal}
          skillstoShow = {skillsbyemployee}
        />


      </Container>
    );

}
export default Home;