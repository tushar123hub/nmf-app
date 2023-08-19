//TODO: check if this import is needed, since secrets are in eas, it might not be the case
import "dotenv/config";

const buildNumber = 50;

module.exports = () => {
  return {
    name: "tushar.earth",
    plugins: ["sentry-expo"],
    slug: "tusharappforcio2",
    privacy: "public",
    platforms: ["ios", "android"],
    version: "0.10.0",
    orientation: "portrait",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    extra: {
      eas: {
        projectId: "ae4ee989-54e4-4242-82f4-5b2fe8f6aaef",
      },
    },
    ios: {
      icon: "./assets/images/ios.icon.png",
      bundleIdentifier: "nmf.earth",
      supportsTablet: true,
      buildNumber: buildNumber.toString(),
    },
    android: {
      icon: "./assets/images/android.icon.png",
      package: "nmf.earth",
      versionCode: buildNumber,
    },
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: "nmf",
            project: "nmf-earth",
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        },
      ],
    },
  };
};
