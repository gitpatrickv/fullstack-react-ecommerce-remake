import { Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  navLink: string;
  title: string;
}

const SidebarTextLink = ({ navLink, title }: Props) => {
  const location = useLocation();
  return (
    <>
      <Link to={navLink}>
        <Text
          color={location.pathname === navLink ? "#FF5722" : "white.500"}
          cursor="pointer"
          _hover={{ color: "#FF5722" }}
        >
          {title}
        </Text>
      </Link>
    </>
  );
};

export default SidebarTextLink;
