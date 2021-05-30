import { Flex, Box } from "@chakra-ui/react";
import ReactMarkdown from "@uiw/react-markdown-preview";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import * as reflect from "jsii-reflect";
import { Documentation } from "../api/docgen/view/documentation";

export interface PackageDocsProps {
  assembly: reflect.Assembly;
  language: string;
  submodule?: string;
}

export function PackageDocs(props: PackageDocsProps) {
  const doc = new Documentation({
    assembly: props.assembly,
    language: props.language,
    submoduleName: props.submodule,
  });

  const source = doc.render().render();

  return (
    <Flex width="100%">
      <Box height="100%" width={0.2}></Box>
      <ReactMarkdown skipHtml components={ChakraUIRenderer()} source={source} />
    </Flex>
  );
}
