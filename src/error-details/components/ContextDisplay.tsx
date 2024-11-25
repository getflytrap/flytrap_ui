import { Text } from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CodeContext } from "../../types";

const CONTEXT_LINES: number = 5;

interface CodeContextDisplayProps {
  codeContext: CodeContext | null;
}

/**
 * A component that displays a snippet of code with syntax highlighting and line numbers.
 * It highlights the line where an error occurred.
 *
 * @param {CodeContextDisplayProps} props - The props for the component.
 * @param {CodeContext | null} props.codeContext - The code snippet and line number to display.
 * If null, a placeholder message is shown.
 */
const CodeContextDisplay = ({ codeContext }: CodeContextDisplayProps) => {
  if (!codeContext) {
    return <Text>No code context available.</Text>;
  }

  const { context, line } = codeContext;

  // Calculate the starting line number
  const startLineNumber = line - CONTEXT_LINES;

  return (
    <SyntaxHighlighter
      language="javascript"
      style={atomOneLight}
      showLineNumbers
      startingLineNumber={startLineNumber > 0 ? startLineNumber : 1}
      wrapLines
      lineProps={(lineNumber: number) => {
        let style: React.CSSProperties = { display: "block" };
        if (lineNumber === line) {
          style.backgroundColor = "rgba(255, 0, 0, 0.3)"; // Highlight the error line
        }
        return { style };
      }}
      customStyle={{
        fontSize: "12px",
      }}
    >
      {context}
    </SyntaxHighlighter>
  );
};

export default CodeContextDisplay;
