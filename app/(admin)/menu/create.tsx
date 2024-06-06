import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import Button from "@/components/Button";

import { defaultPizzaImage } from "@/assets/data/products";
import Colors from "@/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const product = products.find((product) => product.id.toString() === id);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setImage(product.image);
    }
  }, [product]);

  const onSubmit = async () => {
    // console.warn("creating product", name, price);
    if (!validateInput()) return;

    // TODO: Save data to database

    resetFields();
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {},
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  const onDelete = () => {
    console.warn("Delete!!!!");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result) return;

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validateInput = () => {
    setError("");

    if (!name) {
      setError("Name is required");
      return false;
    }

    if (!price) {
      setError("Price is required");
      return false;
    }

    if (isNaN(parseFloat(price))) {
      setError("Price is not a number");
      return false;
    }

    return true;
  };

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: `${isUpdating ? "Update" : "Create"} Product` }}
      />

      <Image
        source={{ uri: image || defaultPizzaImage }}
        resizeMode="contain"
        style={styles.image}
      />

      <Pressable onPress={pickImage}>
        <Text style={styles.textButton}>Select Image</Text>
      </Pressable>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        placeholder="Name"
        style={styles.input}
        onChangeText={setName}
      />
      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={{ color: "red" }}>{error}</Text>
      <Button text={`${isUpdating ? "Update" : "Create"}`} onPress={onSubmit} />
      {isUpdating && (
        <Text style={styles.textButton} onPress={confirmDelete}>
          Delete
        </Text>
      )}
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 50,
  },
  textButton: {
    color: Colors.light.tint,
    alignSelf: "center",
    fontWeight: "bold",
    marginVertical: 10,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderColor: "black",
    marginTop: 5,
    marginBottom: 20,
  },
});
