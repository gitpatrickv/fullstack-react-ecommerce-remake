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
import AllOrders from "./components/AllOrders";
import CancelledOrders from "./components/CancelledOrders";
import CompletedOrders from "./components/CompletedOrders";
import ToPayOrders from "./components/ToPayOrders";
import ToReceiveOrders from "./components/ToReceiveOrders";
import ToShipOrders from "./components/ToShipOrders";

const MyPurchasePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabRoutes = [
    "/user/purchase/order/all",
    "/user/purchase/order/to-pay",
    "/user/purchase/order/to-ship",
    "/user/purchase/order/to-receive",
    "/user/purchase/order/completed",
    "/user/purchase/order/cancelled",
  ];

  useEffect(() => {
    switch (location.pathname) {
      case "/user/purchase/order/all":
        setSelectedIndex(0);
        break;
      case "/user/purchase/order/to-pay":
        setSelectedIndex(1);
        break;
      case "/user/purchase/order/to-ship":
        setSelectedIndex(2);
        break;
      case "/user/purchase/order/to-receive":
        setSelectedIndex(3);
        break;
      case "/user/purchase/order/completed":
        setSelectedIndex(4);
        break;
      case "/user/purchase/order/cancelled":
        setSelectedIndex(5);
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
          <Tab>To Pay</Tab>
          <Tab>To Ship</Tab>
          <Tab>To Receive</Tab>
          <Tab>Completed</Tab>
          <Tab>Cancelled</Tab>
        </TabList>
      </Card>
      <TabIndicator mt="-3px" height="4px" bg="#E64A19" />
      <TabPanels>
        <TabPanel>
          <AllOrders />
        </TabPanel>
        <TabPanel>
          <ToPayOrders />
        </TabPanel>
        <TabPanel>
          <ToShipOrders />
        </TabPanel>
        <TabPanel>
          <ToReceiveOrders />
        </TabPanel>
        <TabPanel>
          <CompletedOrders />
        </TabPanel>
        <TabPanel>
          <CancelledOrders />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MyPurchasePage;
