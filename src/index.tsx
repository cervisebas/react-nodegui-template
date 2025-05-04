import { Renderer, View, Window, Text, Button } from "@cervisebas/react-nodegui";

function App() {
  return (
    <Window styleSheet={styleSheet}>
      <View id={'container'}>
        <View id={'textContainer'}>
          <Text>React NodeGUI!</Text>
        </View>

        <Button
          id={'button'}
          text={'Open dialog'}
          on={{
            clicked() {
              
            },
          }}
        />
      </View>
    </Window>
  );
}

const styleSheet = `
  #container {
    width: 100%;
  }
  #textContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

Renderer.render(<App />);