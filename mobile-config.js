App.info({
  id: 'com.juangesino.mynews',
  name: 'MyNews',
  version: "0.0.1",
  description: 'Personal news aggregator.',
  author: 'Juan I. Gesino',
  email: 'juangesino@gmail.com',
  website: 'https://github.com/juangesino'
});

App.icons({
  'android_mdpi': 'resources/icons/mipmap-mdpi/icon.png',
  'android_hdpi': 'resources/icons/mipmap-hdpi/icon.png',
  'android_xhdpi': 'resources/icons/mipmap-xhdpi/icon.png',
  'android_xxhdpi': 'resources/icons/mipmap-xxhdpi/icon.png',
  'android_xxxhdpi': 'resources/icons/mipmap-xxxhdpi/icon.png',
});

App.launchScreens({
  'android_mdpi_portrait': 'resources/splash/splash-port-mdpi.png',
  'android_hdpi_portrait': 'resources/splash/splash-port-hdpi.png',
  'android_xhdpi_portrait': 'resources/splash/splash-port-xhdpi.png',
  'android_mdpi_landscape': 'resources/splash/splash-land-mdpi.png',
  'android_hdpi_landscape': 'resources/splash/splash-land-hdpi.png',
  'android_xhdpi_landscape': 'resources/splash/splash-land-xhdpi.png',
});

App.setPreference('StatusBarStyle', 'false');
App.setPreference('StatusBarBackgroundColor', '#5868f9');

App.accessRule('http://*');
App.accessRule('https://*');

App.appendToConfig('<platform name="android"><config-file target="AndroidManifest.xml" parent="./application/activity"><intent-filter><action android:name="android.intent.action.SEND" xmlns:android="http://schemas.android.com/apk/res/android" /><category android:name="android.intent.category.DEFAULT" xmlns:android="http://schemas.android.com/apk/res/android" /><data android:mimeType="text/*" xmlns:android="http://schemas.android.com/apk/res/android" /></intent-filter></config-file></platform>');
