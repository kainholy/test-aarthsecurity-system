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
import axios from "axios";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <>
      <Navigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread />
        <Box p="64px 40px">
          <Heading size="lg">すべての案件</Heading>
          <Grid gap="20px" templateColumns="repeat(3, 1fr)" mt="20px">
            {projects.map((project) => (
              <Card p="17px 18px" key={project.id}>
                <Heading fontSize="md">{project.name}</Heading>
                <Flex gap="4px" pt="6px" direction="column">
                  <Flex gap="4px" align="center">
                    <Text fontSize="sm">必要資格:</Text>
                    <Badge variant="outline" colorScheme="blue" p="0 5px">
                      <Text p="1px 7px">
                        {project.qualifications}{" "}
                        {project.qualificationsPersonCount}名
                      </Text>
                    </Badge>
                  </Flex>
                  <Text fontSize="sm">必要隊員数: {project.needMember}人</Text>
                  <Flex gap="4px" align="center">
                    <Text fontSize="sm">単価:</Text>
                    <Badge variant="outline" colorScheme="orange" p="0 5px">
                      <Text p="1px 7px">日勤(平日)</Text>
                    </Badge>
                  </Flex>
                  <Text fontSize="sm">金額: {project.price}</Text>
                  <Text fontSize="sm">日にち: {project.date}</Text>
                  <Text fontSize="sm">
                    時間: {project.startDate} ~ {project.endDate}
                  </Text>
                  <Text fontSize="sm">担当者名: {project.staff}様</Text>
                  <Text fontSize="sm">
                    担当者電話番号: {project.staffPhone}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
