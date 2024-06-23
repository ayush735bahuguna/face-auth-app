import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

const DialogComponent = ({
  trigger,
  title,
  content,
  handlertext,
  onPressHandler,
  visible,
  setVisible,
}) => {
  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    onPressHandler();
  };

  return (
    <View>
      <TouchableOpacity onPress={showDialog}>{trigger}</TouchableOpacity>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => {
            setVisible(false);
          }}
        >
          <Dialog.Title>
            <Text>{title}</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{content}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>{handlertext}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogComponent;
