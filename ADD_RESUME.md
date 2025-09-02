# How to Add Your Resume

To enable the "Download Resume" button on the "About Me" page, you need to add your resume file to the project.

## 1. Prepare Your Resume

- **Format**: Ensure your resume is in PDF format (`.pdf`).
- **File Name**: For consistency, name the file `Amara_Sravya_Resume.pdf`. If you use a different name, you must update the link in the `About.js` component.

## 2. Add the File to the Project

- Place your resume PDF file inside the `frontend/public/` directory.

The final path should be: `frontend/public/Amara_Sravya_Resume.pdf`.

## 3. Verify the Link

The `About.js` component contains a link that points to this file:

```html
<a href="/Amara_Sravya_Resume.pdf" download className="btn resume-btn">
  <FaDownload /> Download Resume
</a>
```

Once the file is in the `public` folder, the button will automatically work, allowing visitors to download your resume directly.