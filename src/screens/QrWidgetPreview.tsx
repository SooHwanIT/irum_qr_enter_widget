import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {WidgetPreview} from 'react-native-android-widget';

import {QrWidget} from '../widgets/QrWidget.tsx';

 function QrWidgetPreview() {
  return (
    <View style={styles.container}>
      <WidgetPreview
        renderWidget={() => <QrWidget />}
        width={320}
        height={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

 export  default  QrWidgetPreview;
