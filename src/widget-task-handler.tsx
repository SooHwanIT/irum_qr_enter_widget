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
      props.renderWidget(<Widget text={""}/>);
      break;

    case 'WIDGET_UPDATE':
      // Not needed for now
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
          // 로그인을 시도하고 토큰을 얻어옵니다.
          const token = await login(studentId, password);
          // 토큰을 이용하여 회원 정보를 얻어옵니다.
          const membershipInfo = await getMemberInfo(token);
          // 얻어온 회원 정보를 Widget으로 전달합니다.
          props.renderWidget(<Widget text={membershipInfo}/>);
        }else{
          props.renderWidget(<Widget text={""}/>);
        }
      }
      // Not needed for now

      break;

    default:
      break;
  }
}
