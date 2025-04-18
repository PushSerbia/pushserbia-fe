# Push Serbia

Push Serbia is a platform for supporting and promoting open-source projects that aim to create positive social impact in Serbia. The platform allows users to propose projects, vote on them, and track their progress from inception to completion.

## 🚀 Features

- **Project Showcase**: Browse and discover impactful open-source projects
- **Voting System**: Community-driven project prioritization
- **Project Lifecycle Management**: Track projects through various stages (Pending, Voting, In Progress, Maintenance, Closed)
- **User Profiles**: Create and manage your profile
- **Project Creation**: Propose new open-source projects for community support
- **Admin Dashboard**: Moderation and management tools for platform administrators
- **Authentication System**: Secure user authentication and authorization

## 🛠️ Technology Stack

- **Frontend Framework**: Angular 19
- **UI Components**: Tailwind CSS, Flowbite
- **Rich Text Editing**: ngx-quill
- **Authentication**: Angular Fire
- **Error Tracking**: Sentry
- **Server-Side Rendering**: Angular SSR with Express
- **Build Tools**: Angular CLI

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v19 or higher)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-organization/pushserbia-fe.git
   cd pushserbia-fe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create environment files based on the examples in the `src/environments` directory

## 🚦 Development

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## 🏗️ Building for Production

Build the project for production:
```bash
npm run build
```

This will create optimized production files in the `dist/` directory and handle Sentry sourcemaps for error tracking.

## 🧪 Testing

Run unit tests:
```bash
npm test
```

## 🌐 Deployment

To serve the SSR (Server-Side Rendering) version:
```bash
npm run serve:ssr:pushserbia-fe
```

## 👥 Contributing

We welcome contributions to Push Serbia! Here's how you can help:

1. **Fork the Repository**: Create your own fork of the project
2. **Create a Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Make Your Changes**: Implement your feature or bug fix
4. **Run Tests**: Ensure your changes don't break existing functionality
5. **Commit Your Changes**: `git commit -m 'Add some amazing feature'`
6. **Push to the Branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Submit your changes for review

### Contribution Guidelines

- Follow the Angular style guide
- Write clean, maintainable, and testable code
- Include appropriate tests for new features
- Update documentation as needed
- Respect the existing code architecture
- Be open to feedback and willing to make changes to your contributions

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

## 🙏 Acknowledgements

- All the contributors who have helped shape Push Serbia
- Our partners and backers, including Greenpeace, United Nations, WWF, and Oxfam
- The open-source community for their invaluable tools and libraries
