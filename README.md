# Segmint

Segmint is a professional persona and content management platform that helps professionals and businesses establish a powerful online presence. The application simplifies the process of creating consistent, high-quality content across social media platforms by leveraging AI-powered persona generation and content recommendations.

## What is Segmint?

In today's digital world, maintaining a professional online presence is crucial for career growth and business success. Segmint helps you create a cohesive professional identity online by:

- **Understanding your professional profile** - Extract insights from your LinkedIn or other professional data
- **Creating personalized content strategies** - Based on your goals, audience, and industry
- **Generating on-brand content** - Produce content that aligns with your professional voice and objectives
- **Managing content across platforms** - Coordinate your messaging across different social media channels

## Key Features

### Persona Management

- **LinkedIn Profile Analysis**: Upload your LinkedIn profile to automatically create a professional persona
- **Customizable Profiles**: Define your content goals, target audience, tone of voice, and key topics
- **Multiple Persona Support**: Create and manage different personas for various professional contexts
- **AI-Enhanced Profiles**: Our AI helps identify your key strengths and unique selling points

### Content Studio

- **AI-Powered Content Creation**: Generate professional content based on your persona
- **Multi-platform Support**: Create content for LinkedIn, Twitter, Medium, and other platforms
- **Content Calendar**: Schedule and organize your content publication
- **Content Analytics**: Track performance of your published content
- **Content Templates**: Access professionally designed templates for different content types

### User Management

- **Seamless Authentication**: Easy signup and login process
- **Profile Customization**: Personalize your account settings
- **Preference Management**: Set your content preferences and notification settings
- **Secure Access Control**: Role-based permissions for team accounts

### Integration Capabilities

- **Make.com Integration**: Connect with Make.com for automated workflows
- **Firebase Backend**: Reliable and scalable data storage
- **API Access**: Extend functionality through our comprehensive API
- **Export Options**: Download your content in various formats

## Project Structure

Segmint consists of two main components:

- [**Frontend**](./frontend/README.md): A modern, responsive web application built with React, providing an intuitive user interface for all Segmint features
- [**Backend**](./backend/README.md): A powerful API built with FastAPI that handles data processing, AI integrations, and storage

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed and configured:

- **Node.js** (LTS version recommended) - Powers the frontend application
- **Python 3.9+** - Required for the backend API
- **Firebase account** - Used for data storage and authentication
- **OpenAI API key** - Powers the AI-driven persona and content generation

### Step-by-Step Installation

1. **Clone the repository**:

```bash
git clone <repository-url>
cd segmint
```

2. **Set up the backend**:

```bash
# Navigate to the backend directory
cd backend

# Install dependencies using uv (a faster Python package installer)
uv pip install -r requirements.txt

# Create environment configuration
cp .env.example .env

# Edit the .env file with your configurations:
# - Add your OpenAI API key
# - Configure Firebase credentials
# - Set other required parameters
```

3. **Set up the frontend**:

```bash
# Navigate to the frontend directory
cd frontend

# Install JavaScript dependencies
npm install

# Create environment configuration
echo "VITE_API_URL=http://localhost:8000" > .env
```

4. **Start the backend server**:

```bash
cd backend
uvicorn app.main:app --reload
```

5. **Start the frontend development server**:

```bash
cd frontend
npm run dev
```

6. **Access the application**:

- **Main Application**: Open [http://localhost:5173](http://localhost:5173) in your browser
- **API Endpoints**: Available at [http://localhost:8000](http://localhost:8000)
- **API Documentation**: Interactive docs at [http://localhost:8000/docs](http://localhost:8000/docs)

## How Segmint Works

1. **Create Your Persona**: Sign up and create your professional persona by providing your LinkedIn profile or filling out our questionnaire
2. **Define Your Content Strategy**: Set your goals, target audience, and preferred content types
3. **Generate Content**: Use the Content Studio to create posts, articles, and other content aligned with your persona
4. **Schedule and Publish**: Plan your content calendar and publish directly or export to your preferred platforms
5. **Analyze and Refine**: Track performance and refine your strategy based on analytics

## Use Cases

- **Professionals**: Build a consistent personal brand across social media platforms
- **Consultants**: Establish thought leadership in your area of expertise
- **Small Businesses**: Create a cohesive brand voice for your company
- **Marketing Teams**: Streamline content creation for clients or company executives
- **Job Seekers**: Enhance your professional online presence to attract employers

## Documentation

Detailed documentation is available for both components of the application:

- [**Frontend Documentation**](./frontend/README.md): Learn about the user interface, components, and frontend architecture
- [**Backend Documentation**](./backend/README.md): Explore the API endpoints, data models, and integration options

## Technologies

### Frontend

- **React & TypeScript**: For a robust, type-safe user interface
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS & Shadcn UI**: Beautiful, responsive design components
- **React Router**: Seamless navigation between application features
- **Tanstack Query**: Efficient data fetching and state management
- **React Hook Form & Zod**: Form handling with validation

### Backend

- **FastAPI**: High-performance Python web framework
- **Firebase Admin SDK**: Secure data storage and authentication
- **OpenAI API**: Powering AI-driven content and persona generation
- **Docker Support**: For containerized deployment

## Contributing

We welcome contributions to Segmint! Here's how you can help:

1. **Follow coding standards**: Review our style guide before submitting code
2. **Write clear commit messages**: Describe your changes concisely
3. **Test thoroughly**: Ensure your changes work as expected
4. **Submit a pull request**: We'll review your contribution and provide feedback

## Support

If you encounter any issues or have questions, please:

- Check the [documentation](./backend/README.md)
- File an issue in our issue tracker
