import {AppRegistry} from 'react-native';
import {
  registerWidgetConfigurationScreen,
  registerWidgetTaskHandler,
} from 'react-native-android-widget';
import {name as appName} from './app.json';
import App from './App';
import {widgetTaskHandler} from './src/widget-task-handler';
import {WidgetConfigurationScreen} from './src/WidgetConfigurationScreen';

AppRegistry.registerComponent(appName, () => App);
registerWidgetTaskHandler(widgetTaskHandler);
registerWidgetConfigurationScreen(WidgetConfigurationScreen);
