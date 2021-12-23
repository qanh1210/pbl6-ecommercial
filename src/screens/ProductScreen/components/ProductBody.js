import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SectionList,
} from 'react-native';
import Animated, { Value } from 'react-native-reanimated';
//Color
import Colors from '../../../utils/Colors';
import HorizontalItem from './HorizontalItem';
import CustomText from '../../../components/UI/CustomText';
import { Header } from './Header';
//PropTypes check
import PropTypes from 'prop-types';

ITEM_HEIGHT = 100;

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

export const ProductBody = ({
  navigation,
  productsFilter,
  searchFilterFunction,
}) => {
  const DATA = [];
  const nu = productsFilter.filter((nu) => nu.category.name === "Thời Trang Nữ");
  const nam =productsFilter.filter((nam) => nam.category.name === "Thời Trang Nam");
  const tv = productsFilter.filter((tv) => tv.category.name === "TV & Thiết Bị Điện Gia Dụng");
  const dt = productsFilter.filter((dt) => dt.category.name === "Thiết Bị Điện Tử");
  const sk = productsFilter.filter((sk) => sk.category.name === "Sức Khoẻ & Làm Đẹp");
  const mb = productsFilter.filter((mb) => mb.category.name === "Hàng Mẹ, Bé & Đồ Chơi");
  const st = productsFilter.filter((st) => st.category.name === "Siêu Thị Tạp Hoá");
  const ds = productsFilter.filter((ds) => ds.category.name === "Hàng Gia Dụng Và Đời Sống");
  const tt = productsFilter.filter((tt) => tt.category.name === "Thể Thao & Du Lịch");

  DATA.push({ title: 'Thời Trang Nữ', data: nu });
  DATA.push({ title: 'Thời Trang Nam', data: nam });
  DATA.push({ title: 'TV & Thiết Bị Điện Gia Dụng', data: tv });
  DATA.push({ title: 'Thiết Bị Điện Tử', data: dt });
  DATA.push({ title: 'Sức Khoẻ & Làm Đẹp', data: sk });
  DATA.push({ title: 'Hàng Mẹ, Bé & Đồ Chơi', data: mb });
  DATA.push({ title: 'Siêu Thị Tạp Hoá', data: st });
  DATA.push({ title: 'Hàng Gia Dụng Và Đời Sống', data: ds });
  DATA.push({ title: 'Thể Thao & Du Lịch', data: tt });

  const scrollY = new Value(0);
  const sectionListRef = useRef(null);
  // const scrollToSection = (index) => {
  //   sectionListRef.current.scrollToLocation({
  //     animated: true,
  //     sectionIndex: index,
  //     itemIndex: 0,
  //     viewPosition: 0,
  //   });
  // };
  // const [sectionIndex, setIndex] = useState(0);
  // const HandleScrollY = (event) => {
  //   const y = event.nativeEvent.contentOffset.y;
  //   const sectionIndex =
  //     y > bracelets.length * ITEM_HEIGHT &&
  //     y < (bracelets.length + rings.length) * ITEM_HEIGHT
  //       ? 1
  //       : y > (bracelets.length + rings.length) * ITEM_HEIGHT
  //       ? 2
  //       : 0;
  //   setIndex(sectionIndex);
  // };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Header
          navigation={navigation}
          searchFilterFunction={searchFilterFunction}
          scrollY={scrollY}
        />
      </TouchableWithoutFeedback>
      {productsFilter.length === 0 ? (
        <CustomText style={{ textAlign: 'center', marginTop: 110 }}>
          Không tìm thấy sản phẩm
        </CustomText>
      ) : (
        <AnimatedSectionList
          sections={DATA} // REQUIRED: SECTIONLIST DATA
          keyExtractor={(item) => item._id}
          ref={sectionListRef}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.header}>
              <CustomText style={styles.title}>{title}</CustomText>
            </View>
          )}
          renderItem={({ item }) => (
            <HorizontalItem item={item} navigation={navigation} />
          )}
          stickySectionHeadersEnabled={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
            // { listener: HandleScrollY, useNativeDriver: false }
          )}
          contentContainerStyle={{ marginTop: 90, paddingBottom: 100 }}
        />
      )}
      {/* <View style={styles.tabBar}>
        <FlatList
          data={sectionTitle}
          keyExtractor={(item, index) => item + index}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => {
            const color = index === sectionIndex ? "#7dd170" : Colors.white;
            const textColor =
              index === sectionIndex ? Colors.white : Colors.black;
            console.log(index);
            return (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 120,
                  backgroundColor: color,
                  borderRadius: 5,
                }}
                onPress={() => {
                  scrollToSection(index);
                }}
              >
                <CustomText style={{ fontSize: 16, color: textColor }}>
                  {item}
                </CustomText>
              </TouchableOpacity>
            );
          }}
        />
      </View> */}
    </View>
  );
};

ProductBody.propTypes = {
  navigation: PropTypes.object.isRequired,
  productsFilter: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.lighter_green,
  },
});
