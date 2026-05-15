const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const videoDir = path.join(__dirname, 'public', 'videos');

async function processVideos() {
  const files = fs.readdirSync(videoDir);
  
  for (const file of files) {
    if (file.endsWith('.mp4') || file.endsWith('.webm')) {
      const inputPath = path.join(videoDir, file);
      const outputPath = path.join(videoDir, `trimmed_${file}`);
      
      console.log(`Processing: ${file}`);
      
      await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .setDuration(30)
          .videoCodec('copy')
          .audioCodec('copy')
          .outputOptions(['-avoid_negative_ts make_zero']) // Sometimes required for accurate stream copy cut
          .on('end', () => {
            console.log(`Trimmed ${file}`);
            resolve();
          })
          .on('error', (err) => {
            console.error(`Error processing ${file}:`, err);
            resolve(); // Resolve anyway to continue with other files
          })
          .save(outputPath);
      });
      
      // Rename original and swap
      if (fs.existsSync(outputPath)) {
        const stats = fs.statSync(outputPath);
        if (stats.size > 0) {
          fs.renameSync(inputPath, inputPath + '.bak');
          fs.renameSync(outputPath, inputPath);
          fs.unlinkSync(inputPath + '.bak');
          console.log(`Successfully updated ${file} to 30 seconds max.`);
        } else {
          console.log(`Output file was empty, keeping original ${file}`);
          fs.unlinkSync(outputPath);
        }
      }
    }
  }
  console.log("All videos processed.");
}

processVideos();
