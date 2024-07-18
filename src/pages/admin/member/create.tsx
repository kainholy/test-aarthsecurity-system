import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Select,
  useToast,
} from "@chakra-ui/react";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";
import axios from "axios";

function MemberCreate() {
  const [formData, setFormData] = useState({
    employee_number: "",
    last_name: "",
    first_name: "",
    last_name_en: "",
    first_name_en: "",
    address: "",
    phone: "",
    birth_date: "",
    email: "",
    employment_type: "",
    employment_start_date: "",
    emergency_contact_relationship: "",
    emergency_contact_phone: "",
    qualifications: "",
  });

  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //名前を結合
    const fullName = `${formData.last_name} ${formData.first_name}`;
    const fullNameEn = `${formData.last_name_en} ${formData.first_name_en}`;

    // prismaの仕様に合わせるため日付をISO-8601形式に変換
    const formattedBirthDate = new Date(formData.birth_date).toISOString();
    const formattedEmploymentStartDate = new Date(
      formData.employment_start_date
    ).toISOString();

    //送信するデータ
    const dataToSubmit = {
      employee_number: formData.employee_number,
      name: fullName,
      name_en: fullNameEn,
      address: formData.address,
      phone: formData.phone,
      birth_date: formattedBirthDate,
      email: formData.email,
      employment_type: formData.employment_type,
      employment_start_date: formattedEmploymentStartDate,
      emergency_contact_relationship: formData.emergency_contact_relationship,
      emergency_contact_phone: formData.emergency_contact_phone,
      qualifications: formData.qualifications,
    };
    axios
      .post("http://localhost:3001/api/employees", dataToSubmit)
      .then((response) => {
        toast({
          title: "従業員が登録されました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error registering employee:", error);
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
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                隊員番号
              </FormLabel>
              <NumberInput
                max={9999}
                min={1000}
                name="employee_number"
                value={formData.employee_number}
                onChange={(valueString) =>
                  setFormData({ ...formData, employee_number: valueString })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <Flex flex="1" gap="40px">
              <FormControl isRequired>
                <FormLabel fontSize="sm" color="gray.800">
                  性
                </FormLabel>
                <Input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="山田"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="sm" color="gray.800">
                  名
                </FormLabel>
                <Input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="太郎"
                />
              </FormControl>
            </Flex>

            <Flex flex="1" gap="40px">
              <FormControl isRequired>
                <FormLabel fontSize="sm" color="gray.800">
                  性(ローマ字)
                </FormLabel>
                <Input
                  type="text"
                  name="last_name_en"
                  value={formData.last_name_en}
                  onChange={handleChange}
                  placeholder="Yamada"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize="sm" color="gray.800">
                  名(ローマ字)
                </FormLabel>
                <Input
                  type="text"
                  name="first_name_en"
                  value={formData.first_name_en}
                  onChange={handleChange}
                  placeholder="Taro"
                />
              </FormControl>
            </Flex>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                生年月日
              </FormLabel>
              <Input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired as="fieldset">
              <FormLabel as="legend" fontSize="sm" color="gray.800">
                性別
              </FormLabel>
              <RadioGroup defaultValue="男">
                <HStack spacing="24px">
                  <Radio value="男">男</Radio>
                  <Radio value="女">女</Radio>
                  <Radio value="その他">その他</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                電話番号
              </FormLabel>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="09000000000"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                メールアドレス
              </FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="template@gmail.com"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                雇用開始日
              </FormLabel>
              <Input
                type="date"
                name="employment_start_date"
                value={formData.employment_start_date}
                onChange={handleChange}
              />
            </FormControl>

            <Flex flex="1" gap="40px">
              <FormControl isRequired>
                <FormLabel fontSize="sm" color="gray.800">
                  緊急連絡先
                </FormLabel>
                <Input
                  type="tel"
                  name="emergency_contact_phone"
                  value={formData.emergency_contact_phone}
                  onChange={handleChange}
                  placeholder="09000000000"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="sm" color="gray.800">
                  属柄
                </FormLabel>
                <Input
                  type="text"
                  name="emergency_contact_relationship"
                  value={formData.emergency_contact_relationship}
                  onChange={handleChange}
                  placeholder="父"
                />
              </FormControl>
            </Flex>

            <FormControl>
              <FormLabel fontSize="sm" color="gray.800">
                資格情報
              </FormLabel>
              <Select
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                placeholder="なし"
              >
                <option value="なし">なし</option>
                <option value="1級">1級</option>
                <option value="2級">2級</option>
                <option value="3級">3級</option>
              </Select>
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
