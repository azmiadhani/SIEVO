import React, {useState, useEffect, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RaiseHand} from '../../assets';
import {Table, TableWrapper, Row} from 'react-native-table-component';

const TimelineList = (props) => {
  const [tableHead, setTableHead] = useState(['Kegiatan', 'Tanggal', 'Tempat']);
  const [widthArr, setWidthArr] = useState([
    windowWidth * 0.6,
    windowWidth * 0.6,
    windowWidth * 0.6,
  ]);
  const [tableData, setTableData] = useState([]);
  const [isBusy, setIsBusy] = useState(true);

  useEffect(() => {
    console.log('TIMELINE TABLE RUNNED');
    const tableData_temp = [];
    for (let key in props.data) {
      const rowData = [];
      rowData.push(props.data[key].timelineJudul);
      rowData.push(
        props.data[key].timelineTanggalMulai +
          ' s.d ' +
          props.data[key].timelineTanggalSelesai,
      );
      rowData.push(props.data[key].timelineTempat);

      tableData_temp.push(rowData);
      console.log(tableData_temp);
    }
    setTableData(tableData_temp);
    setIsBusy(false);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          {!isBusy && (
            <>
              <Table borderStyle={{borderWidth: 1, borderColor: '#000000'}}>
                <Row
                  data={tableHead}
                  widthArr={widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#000000'}}>
                  {tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widthArr}
                      style={[
                        styles.row,
                        index % 2 && {backgroundColor: '#ffffff'},
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </ScrollView>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default TimelineList;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#ffffff'},
  header: {height: 50, backgroundColor: '#dbdbdb'},
  text: {textAlign: 'center', fontWeight: '100', padding: 10},
  dataWrapper: {marginTop: -1},
  row: {height: windowHeight * 0.15, backgroundColor: '#ffffff'},
});
