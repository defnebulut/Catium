import { StyleSheet } from "react-native";

export default StyleSheet.create({
  banner: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  nameText: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  article: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    fontSize: 16,
    lineHeight: 24,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  deleteButton: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "red",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
  },
  reportButton: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "orange",
    borderRadius: 5,
  },
  reportButtonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "black",
    fontSize: 16,
  },
  reportOption: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "lightgray",
    borderRadius: 5,
    width:250,
  },
  reportOptionText: {
    color: "black",
    fontSize: 16,
  },
  reportSubmitButton: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f72585",
    borderRadius: 5,
  },
  reportSubmitButtonText: {
    color: "white",
    fontSize: 16,
  },
  reportCloseButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderWidth:1,
    borderColor :'#f72585',
    borderRadius: 5,
  },
  reportCloseButtonText: {
    color: "#f72585",
    fontSize: 16,
  },

})