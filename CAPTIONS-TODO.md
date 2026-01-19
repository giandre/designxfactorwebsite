# Video Captions TODO

## Current Status

The lead gen landing page video player is now fully accessible with comprehensive keyboard controls and ARIA labels. However, **captions/subtitles still need to be generated**.

## Video Information

- **Video URL**: `https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/dxf-start.mp4`
- **Location**: Cloudflare R2 bucket
- **Current Caption URL**: Not yet created (component ready to accept it)

## Steps to Add Captions

### 1. Generate Caption File using Whisper AI

You can use OpenAI's Whisper AI to automatically transcribe the video and generate timestamped captions:

```bash
# Install whisper (requires Python and FFmpeg)
pip install -U openai-whisper

# Download the video
curl -o dxf-start.mp4 https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/dxf-start.mp4

# Generate captions in VTT format
whisper dxf-start.mp4 --model base --output_format vtt --output_dir ./captions

# This will create: captions/dxf-start.vtt
```

**Alternative**: Use web-based services:
- [OpenAI Whisper API](https://platform.openai.com/docs/guides/speech-to-text)
- [Rev.com](https://www.rev.com/) - Professional human captions
- [YouTube Studio](https://studio.youtube.com/) - Upload video temporarily to auto-generate captions

### 2. Review and Edit Caption File

Open the generated `.vtt` file and ensure:
- Timestamps are accurate
- Text is properly punctuated
- Speaker identification if needed
- No typos or transcription errors

Example VTT format:
```vtt
WEBVTT

00:00:00.000 --> 00:00:03.500
You've got the expertise. You've got the content.

00:00:03.500 --> 00:00:06.800
But turning that into actual training? That's a whole different challenge.

00:00:06.800 --> 00:00:10.200
Traditional training focuses on delivering information. We don't do that.
```

### 3. Upload Caption File to R2

```bash
# Upload to Cloudflare R2 (same bucket as video)
wrangler r2 object put pub-e5994fd168b34b10b119b4228ec3bf11/dxf-start.vtt --file=captions/dxf-start.vtt
```

The caption file URL will be:
`https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/dxf-start.vtt`

### 4. Update the Code

Once the caption file is uploaded, update `LeadGenLanding.tsx`:

```tsx
<AccessibleVideoPlayer
  src="https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/dxf-start.mp4"
  title="Design X Factor Introduction"
  description="Learn how we transform your content into engaging learning experiences..."
  captionsUrl="https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/dxf-start.vtt"  // ADD THIS LINE
  autoPlay
  className="absolute inset-0"
/>
```

### 5. Test the Captions

1. Visit the deployed site: https://designxfactorwebsite.pages.dev/#start
2. Click the video to start playback
3. Click the CC (captions) button in the video controls
4. Verify captions display correctly and are synchronized with audio
5. Test keyboard shortcut: Press `C` to toggle captions

## Accessibility Features Already Implemented

✅ **Keyboard Controls**:
- `Space` or `K` - Play/Pause
- `M` - Mute/Unmute
- `F` - Toggle fullscreen
- `C` - Toggle captions
- `Left Arrow` - Rewind 5 seconds
- `Right Arrow` - Forward 5 seconds

✅ **Screen Reader Support**:
- ARIA labels on all controls
- Live regions for time updates
- Video description panel (Info button)

✅ **Visual Controls**:
- Play/Pause button
- Volume control
- Progress bar with seek
- Time display
- Captions toggle button
- Info button for video description
- Fullscreen toggle

## Notes

- The `AccessibleVideoPlayer` component is already caption-ready
- Caption toggle button will automatically appear when `captionsUrl` is provided
- VTT format is recommended for web video captions
- Captions should be stored in the same R2 bucket for consistency

## Reference

- Component file: `components/AccessibleVideoPlayer.tsx`
- Usage: `pages/leadgen/LeadGenLanding.tsx:92-98`
- Whisper documentation: https://github.com/openai/whisper
- WebVTT format spec: https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API
