import React from 'react';
import type {WidgetTaskHandlerProps} from 'react-native-android-widget';
import {QrWidget} from './widgets/QrWidget.tsx';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {login} from "./utils/Login.tsx";
import {getMemberInfo} from "./utils/getMemberInfo.tsx";

const nameToWidget = {
  // Hello will be the **name** with which we will reference our widget.
  Qr: QrWidget,
};

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget =
    nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
      props.renderWidget(<Widget text={""} state={null}/>);
      break;

    case 'WIDGET_UPDATE':
      props.renderWidget(<Widget text={""} state={null}/>);
      break;

    case 'WIDGET_RESIZED':
      // Not needed for now
      break;

    case 'WIDGET_DELETED':
      // Not needed for now
      break;

    case 'WIDGET_CLICK':

      if (props.clickAction === 'refresh') {
        console.log("ss")
        // AsyncStorage에서 아이디와 비밀번호를 얻어옵니다.
        const studentId = await AsyncStorage.getItem('studentId');
        const password = await AsyncStorage.getItem('password');
        console.log(studentId)
        if (studentId && password) {
          try {
            // 로그인을 시도하고 토큰을 얻어옵니다.
            props.renderWidget(<Widget text="" state={"로그인 시도 중"} isLoading={true}/>);
            const token = await login(studentId, password);

            // 토큰을 이용하여 회원 정보를 얻어옵니다.
            props.renderWidget(<Widget text="" state={"QR 정보 불러오는 중"} isLoading={true}/>);
            const membershipInfo = await getMemberInfo(token);

            // 얻어온 회원 정보를 Widget으로 전달합니다.
            props.renderWidget(<Widget text={membershipInfo} state={null} isLoading={false}/>);
          } catch (error) {
            // 에러가 발생하면 에러 메시지를 Widget으로 전달합니다.
            props.renderWidget(<Widget text={""} state={"인터넷 연결 안됨"} isLoading={true}/>);
          }
        } else {
          props.renderWidget(<Widget text={""} state={"로그인 안됨"} isLoading={false}/>);
        }
      }
      // Not needed for now

      break;

    default:
      break;
  }
}
