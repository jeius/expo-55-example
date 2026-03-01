# MapView Tile Loading Issue Reproduction

A reproducible example demonstrating the Google Maps tile loading issue in `react-native-google-maps-plus` where map tiles fail to render unless `liteMode` is enabled.

## Issue Overview

When initializing `MapView` with `initialProps.liteMode` set to `false` (or undefined), Google Maps tiles fail to render. However, when `liteMode` is set to `true`, the map tiles load and display correctly.

**Expected Behavior:** Map tiles should load regardless of the `liteMode` setting.

**Actual Behavior:** Map tiles only load when `liteMode=true`.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v10.30.3 or higher) - Package manager used in this project
- **Android Studio** (for Android) or **Xcode** (for iOS) - For native development
- **Git** - For version control

### Install Expo CLI

```bash
npm install -g expo-cli
```

## Installation

### 1. Clone or Download the Repository

```bash
git clone <repository-url>
cd expo-55-example
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory by copying the `.env.example` template:

```bash
cp .env.example .env
```

Edit the `.env` file and add your Google Maps API key:

```dotenv
ANDROID_MAPS_API_KEY="YOUR_ACTUAL_ANDROID_MAPS_API_KEY_HERE"
```

**Steps to get your Google Maps API Key:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Maps SDK for Android API
4. Create an API key (Restricted to Android apps)
5. Add your app's package name and signing certificate SHA-1
6. Copy the API key to your `.env` file

### 4. Set Up Permissions (Android/iOS)

The app requires location and maps permissions. These are typically handled by Expo during the first run, but you may need to grant permissions manually.

#### Android:

- Location services
- Maps API key (configured via `.env` file)

#### iOS:

- Location services

## Running the App

Opens the app in your default web browser at `http://localhost:19006`

### Android (Emulator)

```bash
pnpm android
```

Requires Android Studio and an emulator or connected Android device.

### Android (Physical Device)

```bash
expo run:android
```

This starts the Expo development server and displays options to run on web, Android, or iOS.

## Project Structure

```
expo-55-example/
├── app/
│   ├── _layout.tsx              # Root layout with tab navigation
│   ├── (home)/
│   │   ├── _layout.tsx          # Home tab stack navigator
│   │   └── index.tsx            # Home screen with issue explanation
│   └── (maps)/
│       ├── _layout.tsx          # Maps tab stack navigator
│       ├── broken.tsx           # MapView with liteMode=false (issue)
│       └── working.tsx          # MapView with liteMode=true (working)
├── components/
│   ├── MapView.tsx              # MapView component wrapper
│   ├── StyledText.tsx           # Styled text component
│   ├── useColorScheme.ts        # Color scheme hook
│   └── useColorScheme.web.ts    # Web color scheme hook
├── constants/
│   ├── Colors.ts                # Color palette
│   └── index.ts                 # Exported constants
├── lib/                         # Utility libraries
├── package.json                 # Project dependencies
├── app.config.ts                # Expo app configuration
├── metro.config.js              # Metro bundler configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
└── global.css                   # Global styles
```

## Using the Issue Reproduction

### Navigation Flow

1. **Home Tab** - Read the issue description
   - Overview of the MapView tile loading issue
   - Expected vs actual behavior
   - Reproduction steps
   - Environment information

2. **Maps Tab** - Compare the two scenarios
   - **Broken Screen**: MapView with `liteMode=false`
   - **Working Screen**: MapView with `liteMode=true`

### Reproduction Steps

1. Launch the app
2. Start on the **Home** tab to understand the issue
3. Tap **"View Maps"** button or navigate to the **Maps** tab
4. View the **"Broken"** screen (liteMode=false)
   - Observe that map tiles do not render
   - Only the base map layer is visible
5. Tap **"Working"** to switch to the working scenario (liteMode=true)
   - Observe that map tiles render correctly
6. Toggle between both screens to confirm the behavior

### Key Components

#### Home Screen (`app/(home)/index.tsx`)

Displays:

- Issue title and description
- Expected behavior
- Reproduction steps
- Environment details
- Navigation to maps

#### Broken Map (`app/(maps)/broken.tsx`)

Shows MapView with configuration:

```typescript
<MapView initialProps={{ liteMode: false }} />
```

#### Working Map (`app/(maps)/working.tsx`)

Shows MapView with configuration:

```typescript
<MapView initialProps={{ liteMode: true }} />
```

## Configuration Files

### `app.config.ts` - Expo Configuration

Configure your app name, version, and permissions here.

### `metro.config.js` - Metro Bundler

Configures the bundler for React Native development.

### `tailwind.config.js` - Tailwind CSS

NativeWind styles configuration.

### `tsconfig.json` - TypeScript

TypeScript compiler configuration with path aliases:

- `@/*` → `./` (root directory shortcuts)

## Technologies Used

- **Expo 55** - React Native framework
- **Expo Router** - File-based routing
- **React Native 0.83.2** - Core framework
- **TypeScript** - Type safety
- **NativeWind** - Tailwind CSS for React Native
- **react-native-google-maps-plus** - Google Maps implementation
- **expo-location** - Location services
- **react-native-safe-area-context** - Safe area handling

## Dark Mode Support

The app includes built-in dark mode support using `useColorScheme` hook. Components automatically adapt their styling based on the system color scheme preference.

## Troubleshooting

### Build Errors

**Error: `Cannot find module '@/constants'`**

- Ensure `tsconfig.json` has the path aliases configured
- Run `pnpm install` to install dependencies

**Error: `expo-dev-client not found`**

- Install the development client: `pnpm add expo-dev-client`
- Rebuild the native app

### Map Not Displaying

1. **Check permissions**: Ensure location permissions are granted
2. **Verify API key**: Check that Google Maps API key is configured
3. **Check network**: Ensure internet connection is available
4. **Clear cache**: Run `pnpm install && pnpm start --reset-cache`

### Navigation Issues

**Link paths not working in TypeScript**

- Ensure routes are properly created in the `app/` directory
- Use full paths: `/(group)/screen` instead of relative paths

### Styling Issues

**NativeWind classes not applying**

- Ensure `global.css` is imported at the app root
- Run `pnpm install` to install NativeWind properly
- Clear Metro cache: `--reset-cache` flag

## Terminal Commands Reference

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# Run on web
pnpm web

# Run on Android
pnpm android

# Run on iOS
pnpm ios

# Build for Android (local, development)
pnpm build:local:android-dev

# Build for Android (local, preview)
pnpm build:local:android-preview
```

## Environment Details

This repository is configured for:

| Technology                    | Version         |
| ----------------------------- | --------------- |
| Expo                          | ~55.0.4         |
| React                         | 19.2.0          |
| React Native                  | 0.83.2          |
| React Navigation              | ^7.1.28         |
| TypeScript                    | ~5.9.2          |
| NativeWind                    | 5.0.0-preview.2 |
| Tailwind CSS                  | ^4.2.1          |
| react-native-google-maps-plus | 1.11.0          |

## Next Steps

### To Report the Issue

1. Note the exact steps to reproduce
2. Check if the issue occurs on both Android and iOS
3. Provide device/emulator details
4. Include console logs (run `pnpm start --dev`)
5. Report to the [react-native-google-maps-plus repository](https://github.com/react-native-google-maps-plus/maps-plus)

### To Debug

1. Open DevTools: Press `d` in the Expo CLI when running the app
2. Enable remote debugging
3. Use React Native Debugger to inspect props and state
4. Check native logs: `adb logcat` (Android) or Xcode console (iOS)

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review the Expo documentation: https://docs.expo.dev
3. Check react-native-google-maps-plus issues: https://github.com/react-native-google-maps-plus/maps-plus/issues
4. Open an issue in this repository

## License

This reproduction repository is provided as-is for debugging purposes.
