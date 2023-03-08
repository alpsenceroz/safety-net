/**
 * @format
 */

import 'react-native-gesture-handler';
//it should be in top always
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

