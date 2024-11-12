import { Outlet } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";

const ErrorDashboard = () => {
  return (
    <div className="site-wrapper">
      <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
        <GridItem
          as="aside"
          colSpan={{ base: 6, lg: 2, xl: 1 }}
          bg="brand.50"
          minHeight={{ lg: "100vh" }}
          p={{ base: "20px", lg: "30px" }}
        >
          <Sidebar />
        </GridItem>

        <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 5 }} p="40px">
          <Outlet />
        </GridItem>
      </Grid>
    </div>
  );
};

export default ErrorDashboard;
