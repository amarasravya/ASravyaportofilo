# How to Add Project Images

To make your projects section visually appealing, you can add custom images for each project.

## 1. Prepare Your Images

- **Format**: Use `.png`, `.jpg`, or `.webp` formats.
- **Aspect Ratio**: A landscape aspect ratio like 16:9 or 4:3 works best (e.g., 1280x720 pixels).
- **File Size**: Optimize your images to be under 500KB for fast loading. You can use online tools like TinyPNG to compress them.

## 2. Add Images to the Project

- Create a new folder inside `frontend/public/` named `images`.
- Inside `frontend/public/images/`, create another folder named `projects`.
- Place all your project images inside `frontend/public/images/projects/`.

The final path should look like this: `frontend/public/images/projects/my-project-image.png`.

## 3. Update Your Project Data

- Open the data file at `backend/data/portfolioData.js`.
- Find the `projects` array.
- For each project object, add or update the `imageUrl` property. The URL should be a root-relative path starting from the `public` folder.

### Example:

If you added an image at `frontend/public/images/projects/logic-games.png`, you would update the data like this:

```javascript
// ... in backend/data/portfolioData.js

{
  title: "Logic Games Website",
  description: "...",
  technologies: ["..."],
  // ... other properties
  imageUrl: "/images/projects/logic-games.png", // <-- Add this line
  category: "Full Stack"
},
```

## 4. Re-seed Your Database

After updating the `portfolioData.js` file, you must run the seeder script to update your database with the new image URLs.

From the project's root directory, run:
```bash
node backend/seeder
```

Your portfolio will now display the new project images! If an `imageUrl` is not provided for a project, a default placeholder icon will be shown.