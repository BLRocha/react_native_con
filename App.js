/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

const App = () => {

  const [cron, setCron] = React.useState(0.0);
  const [inter, setInter] = React.useState(null);
  const [btnStart, setBtnStart ] = React.useState('Iniciar');
  const [tempo, setTempo] = React.useState(null);
  
  const iniCron = React.useCallback(() => {
    if (inter === null) {
      setInter(setInterval(() => setCron( (a) => a + .100), 100));
    } else {
      clearInterval(inter);
      setInter(null);
    }
    setBtnStart( inter ? 'Iniciar' : 'Pausar');
  })

  const  zerar = React.useCallback(() => {
    setTempo(cron);
    setCron(0.0);
  })

  return (
      <View style={{...styles.container}}>
        <Image source={require('./src/cronometro.png')} />
        <Text style={styles.timer}>{cron.toFixed(1)}s</Text>

        <View style={styles.controls}>
          <TouchableOpacity onPress={iniCron} style={styles.btn}>
            <Text style={styles.btnText}>{btnStart}</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={(inter && cron !== 0.0)} onPress={zerar} style={styles.btn}>
            <Text style={styles.btnText}>Zerar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tempo}>
          <Text style={styles.tempoText}>Ultimo tempo</Text>
          {
            !!tempo && <Text style={{...styles.tempoText, marginTop: 5}}>
              {`${tempo.toFixed(2)}s`}
            </Text>
            ||
            <Text style={{...styles.tempoText, marginTop: 5}}>0.0s</Text>}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00AEEF', // '#4525ff'
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    marginTop: -150,
    color: '#FFF',
    fontSize: 45,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 90,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 18,
    borderRadius: 9,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00AEEF',
  },
  tempo: {
    marginTop: 20,
    height: 80,
    width: 200,
    alignContent: 'center'
  },
  tempoText: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EEF222',
    alignSelf: 'center'
  },
});

export default App;
