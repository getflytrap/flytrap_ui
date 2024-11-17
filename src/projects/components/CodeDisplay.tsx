import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import * as Prism from "react-syntax-highlighter/dist/esm/styles/prism";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoCopyOutline } from "react-icons/io5";

interface CodeDisplayProps {
  language: string;
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ language, code }) => {

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
  };

  return (
    <Box
      borderWidth={1}
      borderRadius="md"
      overflow="hidden"
      p={4}
      my={4}
      bg="#1e1e1e"
      color="white"
      boxShadow="md"
    >
      <Flex justify="flex-end" borderBottom="1px solid gray">
        <Button
          size="sm"
          bg="transparent"
          color="gray"
          onClick={handleCopy}
          mb={2}
          _hover={{
            bg: "rgba(200, 200, 200, 0.2)",
          }}
        >
          <IoCopyOutline />
        </Button>
      </Flex>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={true}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeDisplay;
