"use client";
import { Box, Flex, Card, Text, Heading, Grid } from "@chakra-ui/react";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Member() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/companies")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3001/api/companies/${id}`)
      .then(() => {
        setCompanies(
          companies.filter((employee: { id: number }) => employee.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting company", error);
      });
  };

  return (
    <>
      <Navigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread />
        <Box p="64px 40px">
          <Grid gap="20px" templateColumns="repeat(3, 1fr)">
            {companies.map(
              (company: {
                id: number;
                name: string;
                address: string;
                phone: string;
                email: string;
              }) => (
                <Link
                  href={`/admin/company/list?id=${company.id}`}
                  key={company.id}
                  passHref
                >
                  <Card p="17px 18px" cursor="pointer">
                    <Heading fontSize="md">{company.name}</Heading>
                    <Text fontSize="xs">会社電話番号: {company.phone}</Text>
                    <Flex gap="4px" pt="6px" direction="column">
                      <Text fontSize="sm">会社住所: {company.address}</Text>
                      <Text fontSize="sm">email: {company.email}</Text>
                    </Flex>
                  </Card>
                </Link>
              )
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
