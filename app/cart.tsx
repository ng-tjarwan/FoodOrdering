import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";

const CartScreen = () => {
  const { items, totalPrice } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10, flex: 1 }}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Image
              source={{ uri: "../assets/images/icon.png" }}
              resizeMode="cover"
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ fontSize: 32, fontWeight: "700" }}>
              Cart is empty
            </Text>
            <Text>please add your favorite pizzas to cart</Text>
          </View>
        )}
      />

      {items.length > 0 && (
        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          Total Price: {totalPrice}
        </Text>
      )}

      <Button
        text="Checkout"
        disabled={items.length === 0}
        style={{ width: "100%" }}
      />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
    justifyContent: "center",
    // alignItems: "center",
  },
});
