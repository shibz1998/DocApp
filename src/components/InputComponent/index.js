import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';

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
        rules={{required: true, validate: true}}
        render={({field: {value, onChange}}) => {
          return (
            <TextInput
              style={[styles.input, style]}
              value={value || defaultValue}
              placeholder={placeholder}
              onChangeText={onChange}
              autoCapitalize={autoCapitalize}
              secureTextEntry={secureTextEntry}
              placeholderTextColor="black"
              testID={testID}
            />
          );
        }}
      />

      {error && error?.message.length > 0 && (
        <Text style={styles.errorStyle}>{`*${error.message}`}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  input: {
    // backgroundColor: '#eecb9a',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    // backgroundColor: 'yellow',
    width: 250,
  },

  errorStyle: {
    marginHorizontal: 10,
    marginTop: 5,
    color: 'red',
  },
});
