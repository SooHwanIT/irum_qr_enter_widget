import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const unitID =
    Platform.select({
        ios: 'ca-app-pub-9011101777574758/8743434767',
        android: 'ca-app-pub-9011101777574758/3594802446',
    }) || '';

const adUnitId = __DEV__ ? TestIds.BANNER : unitID;

const Admob = () => {
    return (
        <View style={styles.adContainer}>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.FULL_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    adContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
    },
});

export default Admob;
