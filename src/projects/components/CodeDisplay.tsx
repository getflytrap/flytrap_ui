import React from "react";
import { Box } from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as Prism from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeDisplayProps {
  language: string;
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ language, code }) => {
  const { tomorrow } = Prism;

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
