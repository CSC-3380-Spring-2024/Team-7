import {View, Text, StyleSheet} from 'react-native'

export default function Home(){
    return(
        <View>
            <View style={styles.container}></View>
            <Text>Dog Image Here</Text>
        </View>
    );
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-between",
        backgroundColor:"white",
        padding:180,
        margin:12,
        borderWidth:2
    }
});
