import { View, Window, Text, Button, Image, toPixmapFile } from "@cervisebas/react-nodegui";
import IconAsset from "./assets/nodegui.png";
import { QIcon } from "@nodegui/nodegui";

const winIcon = new QIcon(toPixmapFile(IconAsset));
const minSize = {
  width: 400,
  height: 480,
};

export function App() {
  return (
    <Window
      minSize={minSize}
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
            text={'Open dialog'}
            on={{
              clicked() {
                console.log('Hi');
              },
            }}
          />
        </View>
      </View>
    </Window>
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