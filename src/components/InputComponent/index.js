import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";

export default function InputComponent({
  error,
  control,
  placeholder,
  name,
  autoCapitalize,
  secureTextEntry,
  style,
  defaultValue,
  testID,
}) {
  return (
    <View style={styles.container}>
      <Controller
        name={name}
        control={control}
        rules={{
          required: { value: true, message: `${name} is required` },
          validate: true,
        }}
        render={({ field: { value, onChange }, fieldState }) => {
          return (
            <TextInput
              style={[styles.input, style]}
              value={value || defaultValue}
              placeholder={placeholder}
              onChangeText={onChange}
              autoCapitalize={autoCapitalize}
              secureTextEntry={secureTextEntry}
              placeholderTextColor="grey"
              testID={testID}
            />
          );
        }}
      />
      {error && <Text style={styles.errorStyle}>{`*${error.message}`}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  input: {
    // backgroundColor: "#eecb9a",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 10,
    width: 250,
  },

  errorStyle: {
    marginHorizontal: 10,
    marginTop: 3,
    color: "red",
  },
});
