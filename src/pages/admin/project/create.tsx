import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";
import axios from "axios";

function MemberCreate() {
  const [projectData, setProjectData] = useState({
    name: "",
    qualifications: "",
    qualificationsPersonCount: 0,
    needMember: 0,
    type: "",
    price: "",
    date: "",
    startDate: "",
    endDate: "",
    staff: "",
    staffPhone: "",
    note: "",
    companyId: "",
  });

  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");

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

  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompanyId(e.target.value);
    setProjectData({
      ...projectData,
      companyId: e.target.value,
    });
  };

  const handleNumberChange = (name: string, value: string) => {
    setProjectData({
      ...projectData,
      [name]: parseInt(value, 10),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formatDate = new Date(projectData.date).toISOString();
    const formatStartDate = `1970-01-01T${projectData.startDate}:00.000Z`;
    const formatEndDate = `1970-01-01T${projectData.endDate}:00.000Z`;

    const projectDataToSubmit = {
      name: projectData.name,
      qualifications: projectData.qualifications,
      qualificationsPersonCount: projectData.qualificationsPersonCount,
      needMember: projectData.needMember,
      type: projectData.type,
      price: projectData.price,
      date: formatDate,
      startDate: formatStartDate,
      endDate: formatEndDate,
      staff: projectData.staff,
      staffPhone: projectData.staffPhone,
      note: projectData.note,
      companyId: projectData.companyId,
    };

    axios
      .post("http://localhost:3001/api/projects", projectDataToSubmit)
      .then((response) => {
        toast({
          title: "案件が登録されました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error registering project:", error);
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
                会社名
              </FormLabel>
              <Select
                placeholder="会社を選択"
                value={selectedCompanyId}
                onChange={handleCompanyChange}
              >
                {companies.map((company: { id: number; name: string }) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                案件名
              </FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="〇〇警備"
                value={projectData.name}
                onChange={handleChange}
              />
            </FormControl>

            <Flex flex="1" gap="40px">
              <FormControl>
                <FormLabel fontSize="sm" color="gray.800">
                  必要資格
                </FormLabel>
                <Select
                  name="qualifications"
                  value={projectData.qualifications}
                  onChange={handleChange}
                  placeholder="なし"
                >
                  <option value="なし">なし</option>
                  <option value="1級">1級</option>
                  <option value="2級">2級</option>
                  <option value="3級">3級</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" color="gray.800">
                  必要資格保持者数
                </FormLabel>
                <NumberInput
                  max={200}
                  min={1}
                  name="qualificationsPersonCount"
                  value={projectData.qualificationsPersonCount}
                  onChange={(valueString) =>
                    handleNumberChange("qualificationsPersonCount", valueString)
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                必要隊員数
              </FormLabel>
              <NumberInput
                max={200}
                min={1}
                name="needMember"
                value={projectData.needMember}
                onChange={(valueString) =>
                  handleNumberChange("needMember", valueString)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="gray.800">
                単価
              </FormLabel>
              <Select
                name="type"
                value={projectData.type}
                onChange={handleChange}
                placeholder=""
              >
                <option value="平日(日勤)">平日(日勤)</option>
                <option value="平日(夜勤)">平日(夜勤)</option>
                <option value="休日(日勤)">休日(日勤)</option>
                <option value="休日(夜勤)">休日(夜勤)</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                金額
              </FormLabel>
              <Input
                type="text"
                name="price"
                placeholder="金額を入力"
                value={projectData.price}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                日にち
              </FormLabel>
              <Input
                type="date"
                name="date"
                value={projectData.date}
                onChange={handleChange}
              />
            </FormControl>

            <Flex flex="1" gap="40px">
              <FormControl>
                <FormLabel fontSize="sm" color="gray.800">
                  開始時間
                </FormLabel>
                <Input
                  type="time"
                  name="startDate"
                  value={projectData.startDate}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" color="gray.800">
                  終了時間
                </FormLabel>
                <Input
                  type="time"
                  name="endDate"
                  value={projectData.endDate}
                  onChange={handleChange}
                />
              </FormControl>
            </Flex>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                担当者
              </FormLabel>
              <Input
                type="text"
                name="staff"
                placeholder="山田 太郎 様"
                value={projectData.staff}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                担当者の電話番号
              </FormLabel>
              <Input
                type="tel"
                name="staffPhone"
                placeholder="09000000000"
                value={projectData.staffPhone}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                備考欄
              </FormLabel>
              <Textarea
                name="note"
                value={projectData.note}
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
