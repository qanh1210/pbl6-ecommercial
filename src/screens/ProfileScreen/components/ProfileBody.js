import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../../../components/UI/CustomText";
import UploadButton from "./UploadButton";
import Detail from "./Detail";
//PropTypes check
import PropTypes from "prop-types";

export const ProfileBody = ({
  user,
  uploadButton,
  setUploadButton,
  setImageUri,
  UploadProfile,
}) => {
  return (
    <View style={styles.footer}>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>Thông tin cá nhân</CustomText>
      </View>
      <Detail icon='person' content={user.user.fullName} />
      <Detail icon='email-outline' content={user.user.email} />
      <Detail
        icon='phone'
        content={user.user.phoneNumber === " " ? "Not added yet" : user.user.phoneNumber}
      />
      <Detail
        icon='location-on'
        content={user.user.address === " " ? "Not added yet" : user.user.address}
      />
      <UploadButton
        uploadButton={uploadButton}
        setUploadButton={setUploadButton}
        setImageUri={setImageUri}
        UploadProfile={UploadProfile}
      />
    </View>
  );
};

ProfileBody.propTypes = {
  user: PropTypes.object.isRequired,
  uploadButton: PropTypes.bool.isRequired,
  setUploadButton: PropTypes.func.isRequired,
  setImageUri: PropTypes.func.isRequired,
  UploadProfile: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  titleContainer: {
    height: 30,
  },

  title: {
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
