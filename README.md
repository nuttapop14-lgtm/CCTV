# CCTV System Project

## Overview
This project involves the development of a comprehensive CCTV (Closed-Circuit Television) system designed for effective surveillance and monitoring. The system will enable remote access to live video feeds and recorded footage while ensuring data security.

## Features
- **Real-time Video Monitoring:** Users can view live feeds from multiple cameras.
- **Motion Detection:** Automated alerts are sent when motion is detected.
- **Video Recording:** Footage is recorded and stored for later retrieval.
- **Remote Access:** Users can access the system from different devices and locations.
- **User Authentication:** Secure login to prevent unauthorized access.
- **High-Definition Video Quality:** Support for HD video resolution.

## Components
- **Cameras:** High-resolution cameras capable of recording in various lighting conditions.
- **Server:** A backend server to manage video feeds, storage, and user access.
- **Client Application:** A web or mobile application for user interaction with the CCTV system.

## Technologies Used
- **Programming Languages:** Python, JavaScript
- **Frameworks:** Flask for the backend, React for the frontend
- **Database:** MongoDB for storing user credentials and video metadata
- **Cloud Storage:** AWS S3 for video storage

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/nuttapop14-lgtm/CCTV.git
   ```
2. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure the application settings (database, storage, etc.).
4. Run the application:
   ```bash
   python app.py
   ```

## Usage
- Access the application at `http://localhost:5000` in your web browser after starting the server.
- Log in with your credentials to start monitoring and managing the CCTV system.

## Contribution
We welcome contributions to improve this project. Please submit a pull request if you have suggestions or improvements.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.