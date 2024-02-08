import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { LinearGradient } from 'expo-linear-gradient';




const decimalToOther = (decimal,base) => {
  const table = { 0: '0', 1: '1', 2: '2', 3: '3',
                  4: '4', 5: '5', 6: '6', 7: '7',
                  8: '8', 9: '9', 10: 'A', 11: 'B',
                  12: 'C', 13: 'D', 14: 'E', 15: 'F' };

  let integerPart = Math.floor(decimal);
  let fractionalPart = decimal - integerPart;
  let integerHex = '';
  let fractionalHex = '';
  
  while (integerPart > 0) {
      let remainder = integerPart % base;
      integerHex = table[remainder] + integerHex;
      integerPart = Math.floor(integerPart / base);
  }
  
  while (fractionalPart > 0) {
    if (fractionalHex.length > 4) break; // Maximum precision for fractional part
        let product = fractionalPart * base;
        let integerPart = Math.floor(product);
        fractionalHex += table[integerPart];
        fractionalPart = product - integerPart;
      }
  
  if (fractionalHex.length > 0) {
  return integerHex + '.' + fractionalHex;
  } else {
  return integerHex;
  }
  };


  const otherToDecimal = (hexadecimal,base) => {
     const table = {'0': 0, '1': 1, '2': 2, '3': 3,
             '4': 4, '5': 5, '6': 6, '7': 7,
             '8': 8, '9': 9, 'A': 10, 'B': 11,
             'C': 12, 'D': 13, 'E': 14, 'F': 15};

    let fractionalPart = hexadecimal.split('.');
    let res = 0;

    if (fractionalPart.length > 2) {
        return "Number should have one fractional number";
    } else {
        let intSize = fractionalPart[0].length - 1;
        let decSize = 0;

        if (fractionalPart.length > 1) {
            decSize = fractionalPart[1].length;
        }

        for (let num of fractionalPart[0]) {
          
            res += table[num] * Math.pow(base, intSize);
            
            intSize--;
        }

        if (fractionalPart.length > 1) {
            let decIndex = -1;
            for (let num of fractionalPart[1]) {
                res += table[num] * Math.pow(base, decIndex);
                decIndex--;
            }
        }
        return res;
    }
};

const binaryRegex = /^[01.]+$/;
const octalRegex = /^(0?[0-7]+)(\.[0-7]*)?$/;
const decimalRegex =  /^(0?[0-9]+)(\.[0-9]*)?$/;
const hexaRegex = /^[0-9a-fA-F]+(\.[0-9a-fA-F]*)?$/ ;

export default function App() {
  const [selectedValue, setSelectedValue] = useState('0');
  const [inputNumber,setInputNumber] = useState('')
  const [binary,setBinary] = useState('')
  const [decimal,setDecimal] = useState('')
  const [octal,setOctal] = useState('')
  const [hexa,setHexa] = useState('')
  const [result,setResult] = useState('')
  const[show,setShow]=useState(false)

  function checkBase (regx,text,message) {
    if(regx.test(text) || text === ''){
      setInputNumber(text)  
      } 
    else{
          alert(message)
        }
  }
 
    function handleConvert (){
      
      if (inputNumber.trim() !==''){
        setShow(true)

        if(selectedValue === '2'){
          let res = otherToDecimal(inputNumber,2)
          setBinary(inputNumber)
          setDecimal(decimalToOther(parseFloat(res),10))
          setOctal(decimalToOther(parseFloat(res),8))
          setHexa(decimalToOther(parseFloat(res),16))
      }
       if(selectedValue === '16'){
        
          let res = otherToDecimal(inputNumber.toUpperCase(),16)
         
          setOctal(decimalToOther(parseFloat(res),8))
          setDecimal(decimalToOther(parseFloat(res),10))
          setBinary(decimalToOther(parseFloat(res),2))
          setHexa(inputNumber)
      }
       if(selectedValue === '8'){
          let res = otherToDecimal(inputNumber,8)
          
          setOctal(inputNumber)
          setDecimal(decimalToOther(parseFloat(res),10))
          setBinary(decimalToOther(parseFloat(res),2))
          setHexa(decimalToOther(parseFloat(res),16))
      }
      if(selectedValue === '10'){
          setOctal(decimalToOther(parseFloat(inputNumber),8))
          setDecimal(decimalToOther(parseFloat(inputNumber),10))
          setBinary(decimalToOther(parseFloat(inputNumber),2))
          setHexa(decimalToOther(parseFloat(inputNumber),16))
      }
      
        setInputNumber('');
      }else{
        alert("Enter Number")
      }
    }
    function handleReset(){
      setShow(false)
      setBinary('')
      setOctal('')
      setDecimal('')
      setHexa('')
      setSelectedValue('0')
    }
    
    function handleInput(text){
      if (selectedValue === '2'){

        checkBase(binaryRegex,text,"Only 0 and 1 are allowed")

      }else if(selectedValue === '8'){

        checkBase(octalRegex,text,"Only 0 to 7 are allowed")

      } else if(selectedValue === '16'){

        checkBase(hexaRegex,text,"Only 0 to 9 and A to F are allowed")
      }else if(selectedValue ==='10'){

        checkBase(decimalRegex,text,"Only 0 and 9 are allowed")
      }else{
        alert('Please select Base first')
      }
      
    }

     const handlePickerChange = (itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          setInputNumber(""); 
  };
    

  return (
    <LinearGradient style={styles.container} colors={['#9fc5e8','#a8caea']}>
      {
        show && <LinearGradient colors={['#00203f','#193652']} style={styles.showData}>
        <Text style={styles.text} >Binary Equivalent {'\n\n'} <Text style={{fontSize: 20,paddingTop:15, color: 'yellow'}}>{binary}</Text></Text>
      </LinearGradient>}
      {
      show && <LinearGradient colors={['#00203f','#193652']} style={styles.showData}>
      <Text style={styles.text} >Octal Equivalent {'\n\n'} <Text style={{fontSize: 20,paddingTop:15, color: 'yellow'}}>{octal}</Text></Text>
    </LinearGradient>
      }

      {
      show && <LinearGradient colors={['#00203f','#193652']} style={styles.showData}>
      <Text style={styles.text} >Hexadecimal Equivalent {'\n\n'} <Text style={{fontSize: 20,paddingTop:15, color: 'yellow'}}>{hexa}</Text></Text>
    </LinearGradient>
      }
      {
      show && <LinearGradient colors={['#00203f','#193652']} style={styles.showData}>
      <Text style={styles.text} >Decimal {'\n\n'} <Text style={{fontSize: 20,paddingTop:15, color: 'yellow'}}>{decimal}</Text></Text>
    </LinearGradient>
      }
      
      {!show && <View style={styles.form}>
                      
        <View style={styles.formView}>
        <Text style={{fontSize: 17, color: 'white'}}>Enter Number</Text>
        <TextInput 
          style={styles.numInput}
          value={inputNumber}
          onChangeText={handleInput}
          placeholder='Enter Number'
        ></TextInput>
        </View>
        <View>
        
        <Text style={{fontSize: 17, color: 'white'}}>Base</Text> 
        <TextInput style={styles.baseInput} value={selectedValue}></TextInput>
        <View style={ {borderWidth: 1, 
            borderColor: 'gray',}}>
        <Picker
          dropdownIconColor={'gray'}
          mode={'dropdown'}
          style={{color: 'white'}}
          selectedValue={selectedValue}
          onValueChange={handlePickerChange}
        >
          <Picker.Item label="Select Any" value={null} />
          <Picker.Item label="Decimal 10" value="10" />
          <Picker.Item label="Binary 2" value="2" />
          <Picker.Item label="Octal 8" value="8" />
          <Picker.Item label="Hexadecimal 16" value="16" />
        </Picker>
        </View>
        
        </View>
      </View>}
      {
      !show && <LinearGradient 
                    style={styles.appButtonContainer}
                    colors={['#7F7FD5', '#585895']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                                >
      <TouchableOpacity  onPress={handleConvert}>
        <Text style={styles.appButtonText} >Convert</Text>
      </TouchableOpacity>
      </LinearGradient>}
      {
        show &&  <LinearGradient 
                    style={styles.appButtonContainer}
                    colors={['#7F7FD5', '#585895']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}>
        <TouchableOpacity  onPress={handleReset}>
          <Text style={styles.appButtonText}>Reset</Text>
        </TouchableOpacity>
        </LinearGradient>
      }
        

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:20,
    // backgroundColor: 'rgba(79, 81, 140, 1.0)'
  },
  showData:{
    backgroundColor: '#E2D1F9', 
    borderRadius: 15, 
    padding: 16, 
    shadowColor: 'black', 
    shadowOffset: { 
        width: 0, 
        height: 4, 
    }, 
    shadowOpacity: 0.3, 
    shadowRadius: 6, 
    elevation: 14, 
    width: 350, 
    marginVertical:15, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  text: { 
    fontSize: 17, 
    color: 'white', 
    textAlign: 'center', 
},
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#AA96DA",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop:10,
    width:250
  },
  appButtonText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  form:{
    padding:15,
    backgroundColor:'#00203FFF',
    marginLeft:20,
    marginRight:20,
    flexDirection:'row',
    borderRadius:10,
    shadowColor:'black',
    color:'#fffff',
    shadowOffset:{
      width:0,
      height:2
    },
    shadowOpacity:0.25,
    shadowRadius:4,
    elevation:5
  },
  formView :{
    marginRight:20
  },
  numInput:{
    borderWidth: 1, 
    borderColor: 'gray',
    width:200,
    padding:5,
    marginTop:5,
    color: "#fff"
  
  },
  baseInput:{
    borderWidth: 1, 
    borderColor: 'gray',
    width:100,
    padding:5,
    marginTop:5,
    color: "#fff"
  }
})


// const hexToDecimal = (hexadecimal,base) => {
//   const table = {'0': 0, '1': 1, '2': 2, '3': 3,
//            '4': 4, '5': 5, '6': 6, '7': 7,
//            '8': 8, '9': 9, 'A': 10, 'B': 11,
//            'C': 12, 'D': 13, 'E': 14, 'F': 15};

//   let fractionalPart = hexadecimal.split('.');
//   let res = 0;
//   console.log(typeof(base))

//   if (fractionalPart.length > 2) {
//       return "Number should have one fractional number";
//   } else {
//       let intSize = fractionalPart[0].length - 1;
//       let decSize = 0;

//       if (fractionalPart.length > 1) {
//           decSize = fractionalPart[1].length;
//       }

//       for (let num of fractionalPart[0]) {
//           res += table[num] * Math.pow(base, intSize);
//           intSize--;
//       }

//       if (fractionalPart.length > 1) {
//           let decIndex = -1;
//           for (let num of fractionalPart[1]) {
//               res += table[num] * Math.pow(base, decIndex);
//               decIndex--;
//           }
//       }

//       return res;
//   }
// };

// let hexadecimal = prompt("Enter Hexadecimal Number: ");
// console.log(hexToDecimal(hexadecimal,2));



// const decimalToHexx = (decimal,base) => {


// let integerPart = Math.floor(decimal);
// let fractionalPart = decimal - integerPart;
// let integerHex = '';
// let fractionalHex = '';

// while (integerPart > 0) {
// let remainder = integerPart % base;
// integerHex = table[remainder] + integerHex;
// integerPart = Math.floor(integerPart / base);
// }

// while (fractionalPart > 0) {
// if (fractionalHex.length > 4) break; // Maximum precision for fractional part
// let product = fractionalPart * base;
// let integerPart = Math.floor(product);
// fractionalHex += table[integerPart];
// fractionalPart = product - integerPart;
// }

// if (fractionalHex.length > 0) {
// return integerHex + '.' + fractionalHex;
// } else {
// return integerHex;
// }
// };