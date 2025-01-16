
# Chattrix

Chattrix is a YouTube Comment Search application that allows users to fetch and filter comments from YouTube videos based on specific keywords. This project is designed for ease of use, featuring a responsive UI and powerful backend processing.

## Features
- **Fetch Comments**: Retrieve comments from any public YouTube video.
- **Keyword Search**: Filter comments based on a keyword.
- **Pagination**: View results page by page for better navigation.
- **Profile Image with Fallback**: Handles errors when loading user profile images.
- **Responsive Design**: Built with a modern and clean interface.

## Live Demo
- **Frontend**: [Chattrix on Vercel](https://chattrix.vercel.app/)
- **Backend API**: [Chattrix API on Render](https://chattrix-backend.onrender.com/)

## Project Structure
### Frontend
- **Framework**: Next.js (React)
- **Language**: TypeScript
- **Components**:
  - `Header.tsx`: Displays the app title, description, and a link to the GitHub repository.
  - `Footer.tsx`: Contains copyright info and social media links.
  - `Comments.tsx`: Main component to fetch YouTube comments based on video URL and keyword.
  - `Results.tsx`: Paginated results display with navigation and close functionality.
  - `CommentCard.tsx`: Renders individual comment details.
  - `ProfileImageWithFallBack.tsx`: Handles profile image rendering with fallback.
- **Utils**:
  - `fetchComments.ts`: Utility function to fetch comments from the backend.
  - `formatComment.tsx`: Formats comment text by decoding HTML and handling line breaks.

### Backend
- **Framework**: Flask
- **Language**: Python
- **Components**:
  - `app.py`: Main application file for handling API requests.
  - `fetch_comments.py`: Fetches YouTube comments using the YouTube Data API v3.
  - `library_loader.py`: Loads a shared C library for comment processing.
  - `comment_processor.c`: Contains C functions for keyword matching and string processing.

### Shared Library
- `comment_processor.c`: Implements efficient keyword matching and string processing in C.
- Compiled as `comment_processor.so` for use in Python scripts.

## Installation and Setup

### Prerequisites
- Node.js (Frontend)
- Python 3.9+ (Backend)
- C Compiler (for shared library)

### Clone Repository
```bash
git clone https://github.com/TheKingsident/chattrix.git
cd chattrix
```

### Frontend Setup
```bash
cd src
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scriptsctivate
pip install -r requirements.txt
python app.py
```

### Environment Variables
Create a `.env` file in both the `src` and `backend` directories with the following:

#### Frontend `.env`
```
NEXT_PUBLIC_API_BASE_URL=https://chattrix-backend.onrender.com
```

#### Backend `.env`
```
YOUTUBE_API_KEY=<Your YouTube Data API Key>
```

### Compile Shared Library
Navigate to the `backend/c_lib` directory and run:
```bash
gcc -shared -o comment_processor.so -fPIC comment_processor.c
```

## Usage
1. Visit [Chattrix](https://chattrix.vercel.app/).
2. Enter a YouTube video URL and a keyword.
3. Click "Fetch Comments" to view filtered results.

## Technologies Used
### Frontend
- React (Next.js)
- TypeScript
- Headless UI
- Tailwind CSS

### Backend
- Flask
- Python
- YouTube Data API v3
- C (Shared Library)

### Hosting
- **Frontend**: [Vercel](https://chattrix.vercel.app/)
- **Backend**: [Render](https://chattrix-backend.onrender.com/)

## Contributing
Feel free to contribute by opening issues or submitting pull requests. Make sure to follow the project's coding standards and include detailed descriptions of your changes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For inquiries or support, connect with us:
- **Twitter**: [CtrlAlt_Byte](https://x.com/CtrlAlt_Byte)
- **GitHub**: [TheKingsident](https://github.com/TheKingsident)
- **LinkedIn**: [Profile](https://www.linkedin.com/in/thekingsident/)
