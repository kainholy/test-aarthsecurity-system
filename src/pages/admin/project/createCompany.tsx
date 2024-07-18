import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";
import axios from "axios";

function MemberCreate() {
  const [companyData, setCompanyData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/companies", companyData)
      .then((response) => {
        toast({
          title: "会社が登録されました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error registering company:", error);
        setError(
          error.response
            ? error.response.data.details
            : "An unexpected error occurred"
        );
      });
  };

  return (
    <>
      <Navigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread />
        <Flex
          w="60%"
          maxW="600px"
          margin="80px auto"
          direction="column"
          gap="24px"
        >
          {/* 会社情報 */}
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                会社名
              </FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="〇〇会社"
                value={companyData.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                住所
              </FormLabel>
              <Input
                type="text"
                name="address"
                placeholder="000-0000 東京都足立区綾瀬"
                value={companyData.address}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                メールアドレス
              </FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="template@gmail.com"
                value={companyData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                電話番号
              </FormLabel>
              <Input
                type="tel"
                name="phone"
                placeholder="09000000000"
                value={companyData.phone}
                onChange={handleChange}
              />
            </FormControl>

            <Button mt={4} colorScheme="blue" type="submit">
              追加
            </Button>
          </form>
        </Flex>
      </Box>
    </>
  );
}

export default MemberCreate;
