import React, { useRef, useState } from "react";
import { View, Window, Text, Button, Image, toPixmapFile, Dialog, RNWindow } from "@cervisebas/react-nodegui";
import IconAsset from "./assets/nodegui.png";
import { QIcon } from "@nodegui/nodegui";

const winIcon = new QIcon(toPixmapFile(IconAsset));
const minSizeWindow = {
  width: 400,
  height: 480,
};

const sizeDialog = {
  width: 240,
  height: 120,
};

export function App() {
  const [showDialog, setShowDialog] = useState(false);
  const [windowSize, setWindowSize] = useState('0x0');
  const refWindow = useRef<RNWindow>(null);

  return (
    <React.Fragment>
      <Window
        ref={refWindow}
        minSize={minSizeWindow}
        windowIcon={winIcon}
        styleSheet={styleSheet}
        windowTitle={process.title}
      >
        <View id={'container'}>
          <Image
            id={'logo'}
            src={IconAsset}
            size={{
              width: 100,
              height: 100,
            }}
          />

          <Text id={'title'}>
            React NodeGUI!
          </Text>

          <View id={'button_container'}>
            <Button
              id={'button'}
              text={'Ver tamaño de ventana'}
              on={{
                clicked() {
                  const size = refWindow.current?.native.size();

                  setWindowSize(`${size?.width()}x${size?.height()}`);
                  setShowDialog(true);
                },
              }}
            />
          </View>
        </View>
      </Window>

      <Dialog
        visible={showDialog}
        windowIcon={winIcon}
        windowTitle={'Test dialog'}
        size={sizeDialog}
        minSize={sizeDialog}
        maxSize={sizeDialog}
        styleSheet={dialogStyleSheet}
      >
        <View id={'container'}>
          <Text id={'title'}>Tamaño: {windowSize}</Text>
        </View>
      </Dialog>
    </React.Fragment>
  );
}

const styleSheet = `
  #container {
    align-items: 'center';
    padding-top: 20px;
  }
  #button_container {
    padding-top: 20px;
  }
  #title {
    font-size: 24px;
    font-weight: bold;
    padding-top: 12px;
  }
  #logo {
    width: 100px;
    height: 100px;
  }
`;

const dialogStyleSheet = `
  #container {
    flex: 1;
    justify-content: 'center';
    align-items: 'center';
  }
  #title {
    font-size: 18px;
    font-weight: bold;
  }
`;
