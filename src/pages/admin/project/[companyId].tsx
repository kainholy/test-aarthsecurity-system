import { Box, Flex, Card, Text, Heading, Grid } from "@chakra-ui/react";
import axios from "axios";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Project {
  id: number;
  name: string;
  qualifications: string;
  qualificationsPersonCount: number;
  needMember: number;
  type: string;
  price: string;
  date: string;
  startDate: string;
  endDate: string;
  staff: string;
  staffPhone: string;
  note: string;
}

interface Company {
  id: number;
  name: string;
}

export default function CompanyProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const router = useRouter();
  const { companyId } = router.query;

  useEffect(() => {
    if (companyId) {
      axios
        .get(`http://localhost:3001/api/companies/${companyId}/projects`)
        .then((response) => {
          setProjects(response.data.projects);
          setCompany(response.data.company);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    }
  }, [companyId]);

  return (
    <>
      <Navigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread />
        <Box p="64px 40px">
          <Heading size="lg">{company?.name}の案件</Heading>
          <Grid gap="20px" templateColumns="repeat(3, 1fr)" mt="20px">
            {projects.map((project) => (
              <Card p="17px 18px" key={project.id}>
                <Heading fontSize="md">{project.name}</Heading>
                <Text fontSize="xs">必要資格: {project.qualifications}</Text>
                <Flex gap="4px" pt="6px" direction="column">
                  <Text fontSize="sm">
                    資格保持者数: {project.qualificationsPersonCount}
                  </Text>
                  <Text fontSize="sm">必要隊員数: {project.needMember}</Text>
                  <Text fontSize="sm">単価: {project.type}</Text>
                  <Text fontSize="sm">金額: {project.price}</Text>
                  <Text fontSize="sm">
                    日にち: {new Date(project.date).toLocaleDateString()}
                  </Text>
                  <Text fontSize="sm">
                    開始時間: {new Date(project.startDate).toLocaleTimeString()}
                  </Text>
                  <Text fontSize="sm">
                    終了時間: {new Date(project.endDate).toLocaleTimeString()}
                  </Text>
                  <Text fontSize="sm">担当者: {project.staff}</Text>
                  <Text fontSize="sm">
                    担当者電話番号: {project.staffPhone}
                  </Text>
                  <Text fontSize="sm">備考: {project.note}</Text>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
