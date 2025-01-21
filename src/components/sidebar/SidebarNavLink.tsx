import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  icon: React.ElementType;
  navLink: string;
  iconSize: string;
  marginTop?: string;
  marginLeft?: string;
  title: string;
  titleMarginLeft: string;
}

const SidebarNavLink = ({
  icon: Icon,
  navLink,
  iconSize,
  marginTop,
  marginLeft,
  title,
  titleMarginLeft,
}: Props) => {
  return (
    <>
      <Flex
        ml={marginLeft}
        mt={marginTop}
        alignItems="center"
        userSelect="none"
        cursor="pointer"
      >
        <Icon
          size={iconSize}
          color={location.pathname.startsWith(navLink) ? "#E64A19" : undefined}
        />
        <Link to={navLink}>
          <Text
            ml={titleMarginLeft}
            _hover={{ color: "#E64A19" }}
            fontWeight="semibold"
            color={
              location.pathname.startsWith(navLink) ? "#FF5722" : "white.500"
            }
          >
            {title}
          </Text>
        </Link>
      </Flex>
    </>
  );
};

export default SidebarNavLink;
