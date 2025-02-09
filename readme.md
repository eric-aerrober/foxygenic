# Foxygenic

Foxygenic is a full-stack project that combines a modern Next.js front-end with AWS cloud infrastructure managed by the AWS Cloud Development Kit (CDK). The repository is organized into two main parts: one for cloud resources and one for the site.

## Table of Contents

-   [Overview](#overview)
-   [Project Structure](#project-structure)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Usage](#usage)
    -   [Developing the Front-End](#developing-the-front-end)
    -   [Building the Projects](#building-the-projects)
    -   [Linting](#linting)
    -   [AWS CDK Operations](#aws-cdk-operations)
-   [Deployment](#deployment)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)

## Overview

Foxygenic is designed to deploy and run a modern web application using:

-   **AWS CDK**: For defining and provisioning cloud infrastructure (e.g., DynamoDB, compute resources, etc.).
-   **Next.js**: For building the site with server-side rendering and a rich user interface.

This modular approach allows you to manage your cloud resources and web application code in a single repository.

## Project Structure

-   **cdk/**  
    Contains the AWS CDK project. Key files include:

    -   `package.json`: Defines the dependencies (e.g., `aws-cdk-lib`, `constructs`, and AWS SDK modules) and deployment scripts.
        > The deploy script `"deploy:foxygen": "cdk deploy --profile foxygen"` indicates that the stack can be deployed using an AWS profile named “foxygen”.

-   **site/**  
    Contains the Next.js application. Key files include:

    -   `package.json`: Manages dependencies such as Next.js, React, and various UI libraries.
    -   Project-specific configurations for running, building, and linting the website.

-   Other files such as `.prettierrc.json` help enforce code style across the project.

## Prerequisites

Before getting started, ensure you have the following installed:

-   [Node.js (20.x)](https://nodejs.org/)
-   npm (or yarn)
-   [AWS CLI](https://aws.amazon.com/cli/) – configured with your credentials and the “foxygen” profile
-   AWS CDK (install globally using `npm install -g aws-cdk`)

## Installation

Clone the repository and install dependencies for each component:

1. **Clone the Repository**
    ```bash
    git clone https://github.com/eric-aerrober/foxygenic.git
    cd foxygenic
    ```
