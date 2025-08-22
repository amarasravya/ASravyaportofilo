# How to Add Your Profile Picture

## Option 1: Add to Public Folder (Recommended)

1. **Add your photo to the public folder**:
   - Place your profile picture in `frontend/public/` folder
   - Name it something like `profile.jpg` or `amara-sravya.jpg`

2. **Update the Home component**:
   - Open `frontend/src/components/Home.js`
   - Find line with `src="/api/placeholder/400/400"`
   - Replace it with `src="/profile.jpg"` (or your filename)

3. **Update the About component** (if you want the same photo there):
   - Open `frontend/src/components/About.js`
   - Find line with `src="/api/placeholder/300/400"`
   - Replace it with `src="/profile.jpg"`

## Option 2: Use External URL

If you have your photo hosted online (like on LinkedIn, GitHub, or Google Drive):

1. **Get the direct image URL**
2. **Replace the placeholder URLs** with your image URL in both components

## Option 3: Use Base64 (for small images)

1. **Convert your image to base64** using an online converter
2. **Replace the src** with the base64 string

## Example Update:

In `frontend/src/components/Home.js`, change:
```javascript
<img 
  src="/api/placeholder/400/400" 
  alt="Amara Sravya"
  // ... rest of props
/>
```

To:
```javascript
<img 
  src="/profile.jpg" 
  alt="Amara Sravya"
  // ... rest of props
/>
```

## Image Recommendations:
- **Size**: 400x400 pixels (square)
- **Format**: JPG or PNG
- **File size**: Under 500KB for faster loading
- **Quality**: Professional headshot or clear portrait

## Current Fallback:
If no image is found, it will show your initials "AS" in a styled circle.
