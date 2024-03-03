import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Lexend-Regular': require('./assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Bold': require('./assets/fonts/Lexend-Bold.ttf'),
  });
};