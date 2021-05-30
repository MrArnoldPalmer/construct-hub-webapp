import { Box, Flex } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

export interface NavItem {
  title: string;
  path: string;
  children: NavItem[];
  isActive: boolean;
}

export interface PackageNavProps {
  items: NavItem[];
}

function PackageNavItem({ title, path, isActive }: NavItem) {
  return (
    <Box>
      <Link to={path}>
        {title}-{isActive}
      </Link>
    </Box>
  );
}

export function PackageNav({ items }: PackageNavProps) {
  const { hash } = useLocation();
  return (
    <Flex h="100%" bg="purple.50" direction="column" px={2} pt={2}>
      {items.map((item) => {
        const isActive = hash === item.path;
        return (
          <>
            <PackageNavItem
              {...item}
              title={`${item.title} ${item.path} ${hash}`}
              isActive={isActive}
            />
            {isActive ?? <PackageNav items={item.children} />}
          </>
        );
      })}
    </Flex>
  );
}
