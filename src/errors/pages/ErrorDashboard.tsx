import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";

const ErrorDashboard = () => {
  return (
    <Flex direction="row" height="100%" bg="gray.50">
      {/* Sidebar */}
      <Flex
        as="aside"
        flex={{ base: "1", lg: "0 0 300px" }}
        display={{ base: "none", sm: "flex" }}
        bg="white"
        direction="column"
        overflow="hidden"
      >
        <Sidebar />
      </Flex>

      {/* Main Content */}
      <Flex as="main" flex="1" direction="column" overflowY="auto">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default ErrorDashboard;
