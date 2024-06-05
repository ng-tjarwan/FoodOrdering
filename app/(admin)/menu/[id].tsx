import { Stack, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import products, { defaultPizzaImage } from "@/assets/data/products";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const product = products.find((p) => p.id.toString() === id);

  if (!product) return <Text>Product is not Found</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        resizeMode="contain"
        style={styles.image}
      />

      <Text style={styles.title}>Title: {product.name}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>

      {/* <Button text="Add to cart" onPress={addToCart} /> */}
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
