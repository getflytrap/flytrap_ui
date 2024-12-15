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

## 📗 How to Use Flytrap

### Admin Console

1. **Log in to the Admin Console:** Visit the Flytrap client dashboard URL in the browser (or use your custom domain if you've configured DNS). Log in
using the default admin email and password provided in the Terraform command line outputs. Select Change Password to update your default admin email and password.

![Login page](https://github.com/getflytrap/.github/blob/main/profile/loginPage.png)
*Flytrap Login Page*

2. **Create Projects:** Click on Create Project. Give your project a name and select from among the available SDKs (React,
Vanilla JS, Express, Flask).

![Create project page](https://github.com/getflytrap/.github/blob/main/profile/projectSetup.png)
*Create a New Flytrap Project*

3. **Follow SDK Setup Instructions:** The admin console provides detailed installation instructions for each SDK.
   - The React and Express SDKs are available as npm packages.
   - The Flask SDK is available as a PyPi package.
   - The Vanilla JS SDK is installed by adding a `<script>` tag to your existing application.

You'll be provided with a code snippet for initializing the Flytrap SDK in your application. You can also choose to manually add Flytrap's `captureException` method to your application as needed to catch data about handled errors (e.g., inside a try/catch block).

![SDK setup page](https://github.com/getflytrap/.github/blob/main/profile/reactSDKInstructions.png)
*Flytrap SDK Setup Instructions*

4. **Add Users to Projects:** Once a Flytrap SDK is initialized in your application, you can add developers to each project. Select Create New User in the admin console. You’ll be prompted to add users, who can then be assigned to specific projects. Users only have access to error data for the
projects they are assigned to.

![Manage users page](https://github.com/getflytrap/.github/blob/main/profile/adminConsole.png)
*Flytrap Admin Dashboard Page for Managing Users*

5. **Test Flytrap Setup:** The Flytrap SDK setup instructions include a code snippet for generating a sample error. You can add this to your application to test that the Flytrap infrastructure and SDK installation have been set up correctly.

### Developer Dashboard

1. **Access the Dashboard:** After being assigned to a project, developers can log in to the Flytrap dashboard using their credentials. The dashboard serves as the central hub for monitoring and resolving errors in near real-time.

![Projects dashboard](https://github.com/getflytrap/.github/blob/main/profile/projectsDashboard.png)
*Projects Overview Page in Flytrap Dashboard*

2. **View and Filter Errors:** Developers can view all project errors on the Issues page and use the filtering tools to focus on:
   - Handled versus unhandled errors
   - Resolved versus unresolved errors
   - Time periods

    This helps prioritize fixes for issues with the greatest user impact or urgency.

    ![Issues page](https://github.com/getflytrap/.github/blob/main/profile/issuesPage.png)
    *Issues Page for Viewing All Error Data for a Project*

3. **View Error Data:** The dashboard provides a near real-time view of all captured errors, sorted by project. Error data includes:
   - **Error type**
   - **Stack trace**
   - **Affected users**
   - **Timestamp**

   Use this data to understand the context and impact of each error.
   ![Error page](https://github.com/getflytrap/.github/blob/main/profile/errorPage.png)
   *Error Page for Viewing Details of a Single Error*

   When stack trace data is available, users can interact with it by clicking on each line in the stack trace. Clicking expands
   the corresponding section to reveal the error line with red syntax highlighting, providing quick visual context for the issue.

   ![Express stack trace](https://github.com/getflytrap/.github/blob/main/profile/expressStacktrace.png)
   *Expandable Error Stack Trace with Syntax Highlighting*

4. **Resolve Errors:** Errors can be:
   - Marked as handled (indicating that the error has been addressed).
   - Deleted (if the error no longer needs attention).

   The interface is designed to streamline error resolution and ensure a smooth workflow.

5. **Monitor User Impact:** Flytrap tracks the number of users affected by each error. This data provides actionable insights for prioritizing fixes, allowing developers to focus on high-impact issues first.

6. **Iterate and Improve:** Use Flytrap to continuously monitor your applications for new issues and ensure errors are resolved promptly. The dashboard’s intuitive interface minimizes distractions, allowing teams to focus on improving the user experience.

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