import React from 'react';
import {FlexWidget, ImageWidget, TextWidget} from 'react-native-android-widget';

interface QrWidgetProps {
    text: string;
    state:string|null;
    isLoading : boolean;
}

export const QrWidget: React.FC<QrWidgetProps> = ({text,state, isLoading}) => {

  return (
    <FlexWidget
        clickAction={isLoading ? "OPEN_APP" : "refresh"}
        clickActionData={{ id: 0 }}
      style={{
        height: 'match_parent',
        width: 'match_parent',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 16,
      }}>
        <FlexWidget
            style={{
                    height: 'wrap_content',
                    width: 'match_parent',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
        {text ? (
            <ImageWidget
                image={`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${text}`}
                imageWidth={240}
                imageHeight={240}
            />
        ) : (
            <ImageWidget
                image={require('../assets/img/refresh.png')} // 새로고침 이미지 파일의 경로를 적절하게 수정하세요
                imageWidth={240}
                imageHeight={240}
            />
        )}
        </FlexWidget>
        <FlexWidget
            style={{
                height: 'wrap_content',
                width: 'match_parent',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:20,}}>
        <TextWidget
            text={state ? state : "새로고침"}
            style={{
                fontSize: 32,
                fontFamily: 'Inter',
                color: '#000000',
            }}
        />
        {isLoading && <TextWidget
            text="로딩중 클릭시 앱 실행"
            style={{
                fontSize:12,
                fontFamily: 'Inter',
                color: '#000000',
            }}
        />}
        </FlexWidget>
    </FlexWidget>
  );
}
