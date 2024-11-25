import { Text } from "@chakra-ui/react";
import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // Optional fallback UI (a custom UI to show when an error is caught)
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * The `ErrorBoundary` component is a class-based component that wraps
 * its children in an error boundary to catch JavaScript errors
 * in the component tree. When an error occurs, it displays fallback UI
 * or an error message, ensuring the app remains functional.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  // This method is called when an error is thrown by any of the components inside this boundary
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error: error,
    };
  }

  // This method is called with detailed information about the error
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Global ErrorBoundary caught an error", error, errorInfo);
    this.setState({
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <Text my="30px">Error message: {this.state.error?.message}</Text>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
