# 🎵 OpenMySpotifyApp

An Ionic-based Angular application that interacts with the Spotify API, allowing users to authenticate, browse playlists, and play music.

## 🚀 Features

- **Spotify Authentication**: Secure login using the Spotify API.
- **Music Playback**: Stream music using the Cordova Media plugin.
- **In-App Navigation**: Open external Spotify links using the InAppBrowser plugin.
- **Ionic UI**: Smooth, mobile-friendly UI built with Ionic Framework.

## 📋 Prerequisites

Ensure you have the following tools and frameworks installed:

- **Node.js**: v10.x or later (Tested with Node.js 10-12)
- **npm**: v6.x or later (comes with Node.js)
- **Ionic CLI**: v5.0.0 or later
  ```bash
  npm install -g @ionic/cli
  ```
- **Angular CLI**: v8.1.2 (compatible with Angular 8)
  ```bash
  npm install -g @angular/cli@8.1.2
  ```
- **Cordova**: v9.0.0 or later (for Android deployment)
  ```bash
  npm install -g cordova
  ```
- **Android Studio** (for building Android applications)

## 🛠️ Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/alvarofelipe12/OpenMySpotifyApp.git
   cd OpenMySpotifyApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Ensure you have valid **Spotify API credentials**. Create a `.env` file and add the following:

   ```env
   SPOTIFY_CLIENT_ID=your-client-id
   SPOTIFY_REDIRECT_URI=your-redirect-uri
   ```

## 📱 Running the Application

### Development Server

To start the Ionic development server, run:

```bash
ionic serve
```

Access the app at `http://localhost:8100`.

### 📦 Android Deployment

1. Add the Android platform (if not added):

   ```bash
   ionic cordova platform add android
   ```

2. Build and run the app on an Android device:

   ```bash
   ionic cordova run android
   ```

## 🗂️ Project Structure

```
OpenMySpotifyApp/
├── src/
│   ├── app/               # Core Angular modules and pages
│   ├── assets/            # Static assets
│   ├── environments/      # Environment configuration
│   └── index.html         # Main HTML template
├── config.xml             # Cordova configuration
└── package.json           # Project metadata and dependencies
```

## 📚 Key Dependencies

- **Angular 8.1.2**: Frontend framework
- **Ionic 4.7.1**: Hybrid mobile framework
- **Cordova Android 8.1.0**: Android platform support
- **cordova-plugin-inappbrowser**: Open external URLs
- **cordova-plugin-media**: Handle media playback

## ⚙️ Troubleshooting

- Ensure your Android device is in **Developer Mode** and **USB Debugging** is enabled.
- If you encounter environment issues, verify your `SPOTIFY_CLIENT_ID` and `SPOTIFY_REDIRECT_URI`.

## 🪪 License

This project is licensed under the MIT License.

