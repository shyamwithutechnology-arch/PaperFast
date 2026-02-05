import { StyleSheet } from "react-native";

 export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000080',
  },
  container: {
    backgroundColor: '#2f2f2f',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#777',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },



  uploadBox: {
  height: 120,
  borderWidth: 1,
  borderStyle: 'dashed',
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#ccc',
},
plus: {
  fontSize: 32,
  color: '#1976D2',
},
preview: {
  width: '100%',
  height: '100%',
  borderRadius: 8,
},

});
