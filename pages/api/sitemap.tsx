import fs from 'fs';
import path from 'path';

export default function(req, res) {
  const id = req.query.id;
  const filePath = path.join(process.cwd(), `/public/sitemap.xml`);
  console.log(filePath)
//   res.status(200).json({ error: true, message: 'Image not found' });
  try {
    const imageBuffer = fs.readFileSync(filePath);
    res.setHeader('Content-Type', 'text/xml');
    res.send(imageBuffer);
  } catch (e) {
    res.status(400).json({ error: true, message: 'Ressource not found' });
  }
}