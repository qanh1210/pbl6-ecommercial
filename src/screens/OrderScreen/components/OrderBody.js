import React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import CustomText from "../../../components/UI/CustomText";
//Colors
import Colors from "../../../utils/Colors";
import Messages from "../../../messages/user";
import OrderItem from "./OrderItem";
//PropTypes check
import PropTypes from "prop-types";

export class OrderBody extends React.PureComponent {
  render() {
    const products = [
        {
          "_id" : "61c6f00d0849d51e4c3eb11c",
          "date": "2021-12-26",
          "name": "Ton That Quynh Anh",
          "deliveryAddress": "402 Le Duan",
          "phone": "0796854443",
          "status": "pending",
          "totalAmount": "29998",
          "paymentMethod": "Visa Card",
          "item": 
            {
              "_id": "61c6f00d0849d51e4c3eb11c",
              "name": "Áo vest quý tộc",
              "price": "29998",
              "quantity": "1",
              "avatar": "https://res.cloudinary.com/dfi8bluhn/image/upload/v1640429123/pbl6/1640429123649-shop_05_ktd1bo.jpg",
            }
        },  

        {
          "_id" : "81c6f00d0849d51e4c3eb11c",
          "date": "2021-12-26",
          "name": "Ton That Quynh Anh",
          "deliveryAddress": "402 Le Duan",
          "phone": "0796854443",
          "status": "shipping",
          "totalAmount": "31003",
          "paymentMethod": "Thanh toán tiền mặt",
          "item": 
            {
              "_id": "61c6f00d0849d51e4c3eb11c",
              "name": "Headphone 22",
              "price": "31003",
              "quantity": "1",
              "avatar": "https://res.cloudinary.com/dfi8bluhn/image/upload/v1639713904/pbl6/1639713904177-Headphone-la-gi-co-may-loai-thiet-ke-cua-headphone-4_dogjuy.jpg",
            }
        },

      ];
    const { navigation, user, isRefreshing } = this.props;
    return (
      <View style={styles.footer}>
        {Object.keys(user).length === 0 ? (
          <View style={styles.center}>
            <CustomText style={{ fontSize: 16 }}>
              {Messages["user.login.require"]}
            </CustomText>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <CustomText style={{ fontSize: 16, color: "#fff" }}>
                  Tiếp tục
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        ) 
        // : products.length === 0 ? (
        //   <View style={styles.center}>
        //     <CustomText style={{ fontSize: 16 }}>
        //       Bạn không có đơn hàng nào!
        //     </CustomText>
        //   </View>
        // ) 
        : (
          <FlatList
            data={products}
            // onRefresh={loadOrders}
            refreshing={isRefreshing}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return <OrderItem order={item} />;
            }}
          />
        )}
      </View>
    );
  }
}

OrderBody.propTypes = {
  user: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  loadOrders: PropTypes.func.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    marginTop: 5,
  },
  content: {
    marginVertical: 10,
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  button: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.lighter_green,
    borderRadius: 5,
    borderColor: Colors.lighter_green,
    marginTop: 10,
  },
});
