import React from "react";
import { Box, Text, useBreakpointValue } from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"; // You can use other styles, e.g., 'okaidia', 'tomorrow', etc.

const CodeDisplay = ({ language, code }) => {
  return (
    <Box
      borderWidth={1}
      borderRadius="md"
      overflow="hidden"
      p={4}
      my={4}
      bg="gray.800"
      color="white"
      boxShadow="md"
    >
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        showLineNumbers={true}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeDisplay;
