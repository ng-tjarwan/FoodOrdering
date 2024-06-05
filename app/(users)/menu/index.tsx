import { FlatList, View } from "react-native";
import React from "react";
import products from "@/assets/data/products";
import ProductListItem from "@/components/ProductListItem";

const MenuScreen = () => {
  return (
    <View style={{ backgroundColor: "#e3e3e3" }}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default MenuScreen;
