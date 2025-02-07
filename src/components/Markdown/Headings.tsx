import { Heading, As } from "@chakra-ui/react";
import { Children, FunctionComponent, ReactNode } from "react";
import ReactDOMServer from "react-dom/server";
import { sanitize } from "../../util/sanitize-anchor";
import { NavLink } from "../NavLink";

interface HeadingResolverProps {
  level: number;
  children: ReactNode;
}

/**
 * Extracts the string leaves from the provided ReactNode.
 *
 * @param node the node from which string data should be fetched.
 *
 * @returns the visible string content from the node.
 */
const stringContent = (node: ReactNode): string => {
  return Children.toArray(node)
    .reduce((acc: string, child) => {
      if (typeof child === "string") {
        return acc + child;
      }
      if (typeof child === "object" && "props" in child) {
        return acc + stringContent(child.props.children);
      }
      return acc;
    }, "")
    .trim();
};

export const Headings: FunctionComponent<HeadingResolverProps> = ({
  level,
  children,
}) => {
  const size: string = ["2xl", "xl", "lg", "md", "sm", "xs"][level - 1];
  const elem = `h${level}` as As<any>;

  // Use DOMParser to look for data attribute for link ID
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    ReactDOMServer.renderToStaticMarkup(children as React.ReactElement),
    "text/html"
  );

  const dataElement = doc.querySelector(
    "span[data-heading-title][data-heading-id]"
  ) as HTMLElement;
  const title = dataElement?.dataset.headingTitle ?? stringContent(children);

  const id = dataElement?.dataset.headingId ?? sanitize(title);

  return (
    <>
      <Heading
        as={elem}
        backgroundColor={level === 5 ? "gray.50" : undefined}
        borderBottom="1px solid"
        borderBottomColor="gray.100"
        color="gray.800"
        level={level}
        marginBottom={4}
        marginTop={level >= 4 ? "1.5em" : 4}
        paddingBottom={2}
        paddingTop={2}
        paddingX={level >= 4 ? 2 : undefined}
        size={size}
      >
        <NavLink
          data-heading-id={`#${id}`}
          data-heading-level={level}
          data-heading-title={title}
          id={id}
          replace
          sx={{ "> code": { color: "blue.800", fontSize: "inherit" } }}
          to={`#${id}`}
        >
          {children}
        </NavLink>
      </Heading>
    </>
  );
};
