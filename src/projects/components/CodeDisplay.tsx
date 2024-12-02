import React, { useState } from "react";
import { Box, Flex, Button, Tooltip } from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoCopyOutline } from "react-icons/io5";

interface CodeDisplayProps {
  language: string;
  code: string;
}

/**
 * A component that displays a block of code with syntax highlighting and a copy-to-clipboard button.
 *
 * @param language - The language of the code snippet for syntax highlighting.
 * @param code - The code snippet to display.
 * @returns A styled code block with syntax highlighting and a copy button.
 */
const CodeDisplay: React.FC<CodeDisplayProps> = ({ language, code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
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
        <Tooltip
          label="Copied!"
          isOpen={isCopied}
          bg="brand.600"
          color="white"
          placement="top"
          lineHeight="2rem"
          hasArrow
        >
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
        </Tooltip>
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
