import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
//Colors
import Colors from "../../../utils/Colors";
//Item
import ItemList from "../../PreOrderScreen/components/PreOrderItem";
//Number format
import NumberFormat from "../../../components/UI/NumberFormat";
//Moment
import moment from "moment";
import "moment/min/locales";
//PropTypes check
import PropTypes from "prop-types";
import CustomText from "../../../components/UI/CustomText";
import Steps from "../../../components/UI/Steps";

moment.locale("vi");

export const OrderItem = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  const status = () => {
    switch (order.status) {
      case "pending":
        return 0;
      case "shipping":
        return 1;
      case "done":
        return 2;
      case "over":
        return 3;
      default:
        return 4;
    }
  };
  const total = +order.item.quantity * +order.item.price;

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={styles.textContainer}>
          <CustomText style={styles.text}>Mã đơn: </CustomText>
          <CustomText style={styles.detail}>
            CT-{order._id.substr(order._id.length - 10)}
          </CustomText>
        </View>

        <View style={styles.textContainer}>
          <CustomText style={styles.text}>Ngày đặt: </CustomText>
          <CustomText style={styles.detail}>
            {moment(order.date).format("Do MMMM  YYYY, hh:mm a ")}
          </CustomText>
        </View>
        <View style={styles.detailButtom}>
          <TouchableOpacity onPress={() => setShowDetails((prev) => !prev)}>
            <CustomText style={{ fontSize: 15, color: "#fff" }}>
              {showDetails ? "Ẩn đơn hàng" : "Chi tiết đơn hàng"}
            </CustomText>
          </TouchableOpacity>
        </View>
        {showDetails ? (
          <View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Tên người nhận: </CustomText>
              <CustomText style={styles.detail}>{order.name}</CustomText>
            </View>

            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Địa chỉ: </CustomText>
              <CustomText style={styles.detail}>{order.deliveryAddress}</CustomText>
            </View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Số điện thoại: </CustomText>
              <CustomText style={styles.detail}>{order.phone}</CustomText>
            </View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>
                Phương thức thanh toán:{" "}
              </CustomText>
              <CustomText style={styles.detail}>
                {order.paymentMethod}
              </CustomText>
            </View>
            <View style={styles.steps}>
              <Steps position={status()} />
            </View>

            <CustomText style={styles.text}>Sản phẩm đã đặt:</CustomText>
            <View style={styles.container1}>
              <View style={styles.left}>
                <Image
                  style={{
                    width: "100%",
                    height: 80,
                    resizeMode: "stretch",
                    borderRadius: 5,
                  }}
                  source={{ uri: order.item.avatar }}
                />
              </View>
              <View style={styles.right}>
                <View>
                  <CustomText style={styles.title}>{order.item.name}</CustomText>
                </View>
                <NumberFormat
                  value={total.toString()}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" đ"}
                  renderText={(formattedValue) => (
                    <View style={styles.priceContainer}>
                      <CustomText style={{ fontSize: 13, padding: 0 }}>
                        SL: x {order.item.quantity}
                      </CustomText>
                      <CustomText style={styles.price}>{formattedValue}</CustomText>
                    </View>
                  )}
                />
              </View>
            </View>
            {/* <FlatList
              data={order}
              keyExtractor={(item) => item.item._id}
              renderItem={({ item }) => {
                return <ItemList item={item} />;
              }}
            /> */}
            <View
              style={{
                ...styles.textContainer,
                marginTop: 10,
                justifyContent: "space-between",
              }}
            >
              <CustomText style={styles.text}>Tổng tiền:</CustomText>
              <NumberFormat
                price={order.totalAmount}
                style={{ fontSize: 15 }}
              />
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  detailButtom: {
    backgroundColor: Colors.lighter_green,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 15,
  },
  textContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  detail: {
    color: Colors.lighter_green,
  },
  steps: {
    width: "100%",
    height: 100,
  },
  left: {
    width: "20%",
    height: "100%",
    alignItems: "center",
  },
  right: {
    width: "80%",
    paddingLeft: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
  },
  container1: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 5,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 13,
    color: Colors.red,
  },
});

export default OrderItem;
