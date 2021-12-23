import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
} from "react-native";
import { ProductItem } from "./ProductItem";
import CustomText from "../../../components/UI/CustomText";
import Colors from "../../../utils/Colors";
import { BlurView } from "expo-blur";
//PropTypes check
import PropTypes from "prop-types";

export class CategorySection extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }
    render() {
        const { data, name, navigation } = this.props;
        const nu = data.filter((nu) => nu.category.name === "Thời Trang Nữ");
        const nam = data.filter((nam) => nam.category.name === "Thời Trang Nam");
        const tv = data.filter((tv) => tv.category.name === "TV & Thiết Bị Điện Gia Dụng");
        const dt = data.filter((dt) => dt.category.name === "Thiết Bị Điện Tử");
        const sk = data.filter((sk) => sk.category.name === "Sức Khoẻ & Làm Đẹp");
        const mb = data.filter((mb) => mb.category.name === "Hàng Mẹ, Bé & Đồ Chơi");
        const st = data.filter((st) => st.category.name === "Siêu Thị Tạp Hoá");
        const ds = data.filter((ds) => ds.category.name === "Hàng Gia Dụng Và Đời Sống");
        const tt = data.filter((tt) => tt.category.name === "Thể Thao & Du Lịch");

        function getItems() {
            const items =
                name === "Thời Trang Nữ"
                ? nu
                : name === "Thời Trang Nam"
                ? nam
                : name === "TV & Thiết Bị Điện Gia Dụng"
                ? tv 
                : name === "Thiết Bị Điện Tử"
                ? dt
                : name === "Sức Khoẻ & Làm Đẹp"
                ? sk
                : name === "Hàng Mẹ, Bé & Đồ Chơi"
                ? mb
                : name === "Siêu Thị Tạp Hoá"
                ? st
                : name === "Hàng Gia Dụng Và Đời Sống"
                ? ds
                : tt
            return items;
        }
        return (
            <View style={[styles.category]}>
                {/* <Image style={styles.background} source={bg} blurRadius={10} /> */}
                <View style={styles.titleHeader}>
                    <CustomText style={styles.title}>{name}</CustomText>
                </View>
                <View style={styles.productList}>
                    <FlatList
                        data={getItems()}
                        keyExtractor={(item) => item._id}
                        numColumns={2}

                        columnWrapperStyle={styles.list}
                        renderItem={({ item }) => {
                            return (
                                <ProductItem
                                    key={item._id}
                                    item={item}
                                    navigation={navigation}
                                />
                            );
                        }}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Product")}
                    style={{ marginHorizontal: 10 }}
                >
                    <BlurView tint="light" intensity={100} style={styles.seeMore}>
                        <CustomText style={styles.seeMoreText}>Xem Thêm</CustomText>
                    </BlurView>
                </TouchableOpacity>
            </View>
        );
    }
}

CategorySection.propTypes = {
    data: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    category: {
        height: 518,
        marginHorizontal: 5,
        marginVertical: 5,
        paddingVertical: 15,
        borderRadius: 5,
        overflow: "hidden",
    },
    background: {
        position: "absolute",
        resizeMode: "stretch",
        borderRadius: 5,
        height: 518,
        width: "100%",
        bottom: 0,
    },
    titleHeader: {
        marginHorizontal: 10,
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        color: Colors.light_green,
        fontWeight: "500",
    },
    list: {
        justifyContent: "space-between",
    },
    productList: {
        width: "100%",
        marginTop: 10,
        paddingHorizontal: 10,
    },
    seeMore: {
        // backgroundColor: "rgba(255, 255, 255, 0.9)",
        width: "100%",
        height: 45,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    seeMoreText: {
        fontSize: 14,
        color: Colors.lighter_green,
    },
});
