import React from 'react';
import {FlexWidget, ImageWidget, TextWidget} from 'react-native-android-widget';

interface QrWidgetProps {
    text: string;
}

export const QrWidget: React.FC<QrWidgetProps> = ({text}) => {

  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 16,
      }}>
        {text ? (
            <ImageWidget
                image={`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${text}`}
                imageWidth={200}
                imageHeight={200}
            />
        ) : (
            <ImageWidget
                image={require('../assets/img/refresh.png')} // 새로고침 이미지 파일의 경로를 적절하게 수정하세요
                imageWidth={200}
                imageHeight={200}
            />
        )}
        <TextWidget
            text="새로고침"
            clickAction="refresh"
            clickActionData={{ id: 0 }}
            style={{
                fontSize: 32,
                fontFamily: 'Inter',
                color: '#000000',
            }}
        />
    </FlexWidget>
  );
}
