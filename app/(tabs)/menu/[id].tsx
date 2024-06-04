import { useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import products, { defaultPizzaImage } from "@/assets/data/products";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("S");
  const { addItem } = useCart();

  const { id } = useLocalSearchParams();

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if (!product) return;

    addItem(product, selectedSize);

    router.push("/cart");
  };

  if (!product) return <Text>Product is not Found</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        resizeMode="contain"
        style={styles.image}
      />

      <Text>Select Size</Text>
      <View style={styles.sizesContainer}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.sizeContainer,
              selectedSize === size && styles.selectedSizeContainer,
            ]}
          >
            <Text
              style={[
                styles.size,
                {
                  color: selectedSize === size ? "black" : "gray",
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>Price: ${product.price}</Text>

      <Button text="Add to cart" onPress={addToCart} />
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
  sizesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  sizeContainer: {
    backgroundColor: "white",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedSizeContainer: {
    backgroundColor: "gainsboro",
  },
  size: {
    fontSize: 20,
    fontWeight: "500",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {},
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
});
