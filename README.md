# MyClothes Wardrobe - Frontend

This is the **frontend** for the _MyClothes Wardrobe_ application, a personal wardrobe management tool where users can add, view, and organize their clothes and collections.  
The frontend is built with **React**, styled using **Tailwind CSS**, and uses **Clerk** for authentication. Images are handled with **Cloudinary**.

---

## 🚀 Features

- **Authentication & User Management** via Clerk
- **Add Clothes** with image upload
- **View Clothes** in a neat tabbed grid layout
- **Add Collections** for organizing clothes
- **View Collections**
- **Responsive Design** (mobile & desktop)
- **Cloudinary Integration** for image storage
- **React Router** for navigation

---

## 🛠️ Tech Stack

- React.Js
- Vite
- Tailwind CSS
- Clerk (authentication)
- Cloudinary (image management)
- Remove.bg (Api to remove braground)
- Axios (API requests)
- React Router

---

## Installation & Setup

1. Clone the repository
2. Install dependencies - npm install
3. Set up environment variables
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_BASE_URL=http://localhost:7777
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   VITE_REMOVE_BG_API_KEY=your_REMOVE_BG_API_KEY
4. Run the development server -npm run dev

---

## Authentication Flow

- Users must Sign Up or Sign In via Clerk.
- Upon signing in, users can access wardrobe features.
- Sign out is available via the menu icon.

---

## Workflow

1. User Authentication

   - The user lands on the sign-in page.
   - Uses Clerk to authenticate via email/password or social login.

2. Dashboard Access
   Once signed in, the main wardrobe interface is shown.
   A personalized greeting with the user’s name appears.

3. Clothes Management

   - View Clothes: Displays a list of all clothes.
   - Add Clothes: User uploads an image, provides details, and saves it.
     - Image is uploaded to Cloudinary.
     - Metadata is sent to the backend API.

4. Collection Management

   - View Collections: Displays all clothing collections created.
   - Add Collection: User creates a named group of clothes.

5. Sign Out
   - The user can log out via the menu icon in the top-right.

---

## Frontend

Front end is deployed in Vercel

## Backend Wait time:

The backend is deployed on Render, a cloud hosting platform.

Render uses an idle-to-active scaling mechanism to optimize costs. When the backend remains inactive for a certain period, it enters an idle state. Upon the first request after idling, Render performs a cold start to bring the service online, which typically takes ~15 seconds. Subsequent requests are served without delay until the service idles again.
