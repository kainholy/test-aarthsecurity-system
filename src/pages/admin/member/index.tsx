"use client";
import {
  Box,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Badge,
  Grid,
} from "@chakra-ui/react";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Member() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3001/api/employees/${id}`)
      .then(() => {
        setEmployees(
          employees.filter((employee: { id: number }) => employee.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  return (
    <>
      <Navigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread />
        <Box p="64px 40px">
          <Grid gap="20px" templateColumns="repeat(3, 1fr)">
            {employees.map(
              (employee: {
                id: number;
                employee_number: string;
                name: string;
                name_en: string;
                qualifications: string;
                phone: string;
                email: string;
                employee_type: string;
              }) => (
                <Card p="17px 18px" key={employee.id}>
                  <Text fontSize="sm">No. {employee.employee_number}</Text>
                  <Flex gap="16px" align="flex-end" pt="4px">
                    <Heading fontSize="md">{employee.name}</Heading>
                    <Text fontSize="sm">{employee.name_en}</Text>
                  </Flex>
                  <Flex gap="4px" pt="6px" direction="column">
                    <Flex gap="4px" align="center">
                      <Text fontSize="sm">資格:</Text>
                      <Badge
                        variant="outline"
                        colorScheme={employee.qualifications ? "blue" : "gray"}
                        p="0 5px"
                      >
                        <Text p="1px 7px">{employee.qualifications}</Text>
                      </Badge>
                    </Flex>
                    <Text fontSize="sm">Tel: {employee.phone}</Text>
                    <Text fontSize="sm">Email: {employee.email}</Text>
                    <Text fontSize="sm">
                      雇用形態: {employee.employee_type}
                    </Text>
                  </Flex>
                </Card>
              )
            )}

            {/* コンポーネント */}
            <Card p="17px 18px">
              <Text fontSize="sm">No. 1001</Text>
              <Flex gap="16px" align="flex-end" pt="4px">
                <Heading fontSize="md">大倉聖哉</Heading>
                <Text fontSize="sm">Okura Seiya</Text>
              </Flex>
              <Flex gap="4px" pt="6px" direction="column">
                <Flex gap="4px" align="center">
                  <Text fontSize="sm">資格:</Text>
                  <Badge variant="outline" colorScheme="blue" p="0 5px">
                    <Text p="1px 7px">2級</Text>
                  </Badge>
                </Flex>
                <Text fontSize="sm">Tel: 090-6703-6735</Text>
                <Text fontSize="sm">Email: ookuraseiya0506@gmail.com</Text>
                <Text fontSize="sm">雇用形態: 正社員</Text>
              </Flex>
            </Card>
            {/* ここまで */}

            <Card p="17px 18px">
              <Text fontSize="sm">No. 1001</Text>
              <Flex gap="16px" align="flex-end" pt="4px">
                <Heading fontSize="md">大倉聖哉</Heading>
                <Text fontSize="sm">Okura Seiya</Text>
              </Flex>
              <Flex gap="4px" pt="6px" direction="column">
                <Flex gap="4px" align="center">
                  <Text fontSize="sm">資格:</Text>
                  <Badge variant="outline" colorScheme="gray" p="0 5px">
                    <Text p="1px 7px">なし</Text>
                  </Badge>
                </Flex>
                <Text fontSize="sm">Tel: 090-6703-6735</Text>
                <Text fontSize="sm">Email: ookuraseiya0506@gmail.com</Text>
                <Text fontSize="sm">雇用形態: 正社員</Text>
              </Flex>
            </Card>
            <Card p="17px 18px">
              <Text fontSize="sm">No. 1001</Text>
              <Flex gap="16px" align="flex-end" pt="4px">
                <Heading fontSize="md">大倉聖哉</Heading>
                <Text fontSize="sm">Okura Seiya</Text>
              </Flex>
              <Flex gap="4px" pt="6px" direction="column">
                <Flex gap="4px" align="center">
                  <Text fontSize="sm">資格:</Text>
                  <Badge variant="outline" colorScheme="blue" p="0 5px">
                    <Text p="1px 7px">2級</Text>
                  </Badge>
                </Flex>
                <Text fontSize="sm">Tel: 090-6703-6735</Text>
                <Text fontSize="sm">Email: ookuraseiya0506@gmail.com</Text>
                <Text fontSize="sm">雇用形態: 正社員</Text>
              </Flex>
            </Card>
            <Card p="17px 18px">
              <Text fontSize="sm">No. 1001</Text>
              <Flex gap="16px" align="flex-end" pt="4px">
                <Heading fontSize="md">大倉聖哉</Heading>
                <Text fontSize="sm">Okura Seiya</Text>
              </Flex>
              <Flex gap="4px" pt="6px" direction="column">
                <Flex gap="4px" align="center">
                  <Text fontSize="sm">資格:</Text>
                  <Badge variant="outline" colorScheme="blue" p="0 5px">
                    <Text p="1px 7px">2級</Text>
                  </Badge>
                </Flex>
                <Text fontSize="sm">Tel: 090-6703-6735</Text>
                <Text fontSize="sm">Email: ookuraseiya0506@gmail.com</Text>
                <Text fontSize="sm">雇用形態: 正社員</Text>
              </Flex>
            </Card>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
