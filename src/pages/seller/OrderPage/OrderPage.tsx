import {
  Card,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AllCustomerOrders from "./components/AllCustomerOrders";
import CancelledCustomerOrders from "./components/CancelledCustomerOrders";
import CompletedCustomerOrders from "./components/CompletedCustomerOrders";
import RatedCustomerOrders from "./components/RatedCustomerOrders";
import ShippingCustomerOrders from "./components/ShippingCustomerOrders";
import ToShipCustomerOrders from "./components/ToShipCustomerOrders";
import UnpaidCustomerOrders from "./components/UnpaidCustomerOrders";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabRoutes = [
    "/seller/order/all",
    "/seller/order/unpaid",
    "/seller/order/to-ship",
    "/seller/order/shipping",
    "/seller/order/completed",
    "/seller/order/rated",
    "/seller/order/cancelled",
  ];

  useEffect(() => {
    switch (location.pathname) {
      case "/seller/order/all":
        setSelectedIndex(0);
        break;
      case "/seller/order/unpaid":
        setSelectedIndex(1);
        break;
      case "/seller/order/to-ship":
        setSelectedIndex(2);
        break;
      case "/seller/order/shipping":
        setSelectedIndex(3);
        break;
      case "/seller/order/completed":
        setSelectedIndex(4);
        break;
      case "/seller/order/rated":
        setSelectedIndex(5);
        break;
      case "/seller/order/cancelled":
        setSelectedIndex(6);
        break;
      default:
        setSelectedIndex(0);
    }
  }, [location.pathname]);

  const handleTabsChange = (index: number) => {
    navigate(tabRoutes[index]);
  };

  return (
    <Tabs
      variant="unstyled"
      isLazy
      index={selectedIndex}
      onChange={handleTabsChange}
    >
      <Card borderRadius="none" padding="12px">
        <TabList display="flex" justifyContent="space-between">
          <Tab>All</Tab>
          <Tab>To Confirm</Tab>
          <Tab>To Ship</Tab>
          <Tab>Shipping</Tab>
          <Tab>Completed</Tab>
          <Tab>Rated</Tab>
          <Tab>Cancelled</Tab>
        </TabList>
      </Card>
      <TabIndicator mt="-3px" height="4px" bg="#E64A19" />
      <TabPanels>
        <TabPanel padding={0}>
          <AllCustomerOrders />
        </TabPanel>
        <TabPanel padding={0}>
          <UnpaidCustomerOrders />
        </TabPanel>
        <TabPanel padding={0}>
          <ToShipCustomerOrders />
        </TabPanel>
        <TabPanel padding={0}>
          <ShippingCustomerOrders />
        </TabPanel>
        <TabPanel padding={0}>
          <CompletedCustomerOrders />
        </TabPanel>
        <TabPanel padding={0}>
          <RatedCustomerOrders />
        </TabPanel>
        <TabPanel padding={0}>
          <CancelledCustomerOrders />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default OrderPage;
