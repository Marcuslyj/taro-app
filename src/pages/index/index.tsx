import React, { useCallback, useEffect } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import emitter from "@/common/utils/emitter";
import STATUS from "@/appLibs/status";
import logo from "./hook.png";
import "./index.scss";

const Index = () => {
  const env = useEnv();
  const [_, { setTitle }] = useNavigationBar({ title: "Taro Hooks" });
  const [show] = useModal({
    title: "Taro Hooks!",
    showCancel: false,
    confirmColor: "#8c2de9",
    confirmText: "支持一下",
    mask: true,
  });
  const [showToast] = useToast({ mask: true });

  const handleModal = useCallback(() => {
    show({ content: "不如给一个star⭐️!" }).then(() => {
      showToast({ title: "点击了支持!" });
    });
  }, [show, showToast]);

  const onEmit = () => {
    emitter.emit("lala", "kkk");
  };

  useEffect(() => {
    emitter.once("lala", function (arg) {
      console.log("lala======");
      console.log(arg);
    });

    // 测试状态机
    STATUS.globalData.must().then(() => {
      console.log("oops! globalData ready, do something...");
    });
    console.log('begin to wait globalData ready...')

    setTimeout(() => {
      STATUS.globalData.success();
    }, 3000);
  }, []);

  return (
    <View className="wrapper">
      <Image className="logo" src={logo} />
      <Text className="title">为Taro而设计的Hooks Library</Text>
      <Text className="desc">
        目前覆盖70%官方API. 抹平部分API在H5端短板. 提供近40+Hooks!
        并结合ahook适配Taro!
      </Text>
      <View className="list">
        <Text className="label">运行环境</Text>
        <Text className="note">{env}</Text>
      </View>
      <Button className="button" onClick={() => setTitle("Taro Hooks Nice!")}>
        设置标题
      </Button>
      <Button className="button" onClick={handleModal}>
        使用Modal
      </Button>
      <Button onClick={onEmit}>emit</Button>
    </View>
  );
};

export default Index;
