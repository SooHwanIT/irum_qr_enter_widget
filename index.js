import { AppRegistry } from 'react-native';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import { name as appName } from './app.json';
import App from './App';
import { widgetTaskHandler } from './src/widget-task-handler';

AppRegistry.registerComponent(appName, () => App);
registerWidgetTaskHandler(widgetTaskHandler);
