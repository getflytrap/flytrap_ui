![Organization Logo](https://raw.githubusercontent.com/getflytrap/.github/main/profile/flytrap_logo.png)

# Flytrap UI
The Flytrap UI is the visual dashboard for the Flytrap error monitoring system, acting as the command center where users can manage projects, review error details, and receive real-time updates about incoming issues. Think of it as the control tower for your application's error tracking — keeping everything organized and in view while enabling efficient management.

This guide will walk you through setting up the Flytrap UI locally for development and testing. If you want to use Flytrap in a production environment, refer to the [Flytrap Installation Guide](https://github.com/getflytrap/flytrap_terraform) for complete setup instructions.

To learn more about Flytrap, check out our [case study](https://getflytrap.github.io/).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🛠️ Key Features
- **User and Project Management:** Add and manage users and projects seamlessly.
- **Error Insights and Stats:** View error details, including code context for stack frames, and analyze error trends per project.
- **Error Management:** Delete errors or mark them as resolved to keep your data clean and actionable.
- **Near Real-Time Notifications:** Stay updated with WebSocket-driven notifications for new errors as they happen.

## 🚀 Getting Started
### Prerequisites
1. Node.js

### Installation
1. Clone the Repository:

    ```bash
    git clone https://github.com/your-org/flytrap-ui.git
    cd flytrap-ui
    ```

2. Install Dependencies:

    ```bash
    npm install
    ```

3. Add a `.env` file in the root of the project and add the following variables:

    ```plaintext
    VITE_BASEURL=<API_URL>
    VITE_FLYTRAP_SDK_URL=http://localhost:3000
    ```

    VITE_BASEURL: The URL where your Flytrap API is running, e.g. `http://localhost:5000`.
    VITE_FLYTRAP_SDK_URL: The URL where your Flytrap Processor is running. By default, this points to a local instance on port 3000.  

4. Run the Application: Start the development server:

    ```bash
    npm run dev
    ```

## 🖥️ End-to-End Testing with Flytrap Architecture

To test the Flytrap UI as part of the complete Flytrap architecture:

- **Set Up the API:** Follow the [Flytrap API setup guide](https://github.com/getflytrap/flytrap_api) to start the API locally.
- **Set Up the Processor:** Install and run the [Flytrap Processor](https://github.com/getflytrap/flytrap_processor) for backend error processing.
- **Integrate an SDK:** Use one of the Flytrap SDKs to collect error data from your application:  
  - [Flytrap React SDK](https://github.com/getflytrap/flytrap_react)  
  - [Flytrap Vanilla JavaScript SDK](https://github.com/getflytrap/flytrap_javascript)  
  - [Flytrap Express SDK](https://github.com/getflytrap/flytrap_express)  
  - [Flytrap Flask SDK](https://github.com/getflytrap/flytrap_flask)  

### Verifying the System
- **Trigger Errors:** Use the app in which you integrated the SDK to generate errors or promise rejections in your application.
- **View Errors in the Dashboard:** Log in to the Flytrap UI to see the errors displayed in real-time with detailed stack traces and project-specific statistics.

## 🧑‍💻 Tech Stack
The Flytrap UI is built using:

- React: For a fast and dynamic user interface.
- TypeScript: To ensure type safety and better code maintainability.
- Chakra UI: For beautiful and accessible design components.

For questions or issues, feel free to open an issue in this repository or contact the Flytrap team. 🚀

---

<div align="center">
  🪰🪤🪲🌱🚦🛠️🪴
</div>