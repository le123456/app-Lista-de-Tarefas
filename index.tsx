import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';

export default function App() {
  const image = require('../resources/bg.jpg');

  const [tarefas, setTarefa] = useState([
    { id: 1, tarefa: "Minha Tarefa 1" },
    { id: 2, tarefa: "Minha Tarefa 2" }
  ]);
  const [tarefaAtl, setTarefaAtl] = useState("");
  const [modal, setModal] = useState(false);

  // Deletar tarefa
  const deletar = (id: number) => {
    Alert.alert('Tarefa', `Tarefa ${id} foi deletada`);
    const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefa(novasTarefas);
  };

  // Adicionar tarefa
  const adicionar = () => {
    if (tarefaAtl.trim() === "") return;
    setModal(false);
    const novaTarefa = {
      id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
      tarefa: tarefaAtl
    };
    setTarefa((prevTarefas) => [...prevTarefas, novaTarefa]);
    setTarefaAtl(""); // Limpa o campo de texto após adicionar a tarefa
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua tarefa"
              value={tarefaAtl}
              onChangeText={setTarefaAtl}
              autoFocus
            />
            <TouchableOpacity style={styles.openButton} onPress={adicionar}>
              <Text style={styles.textStyle}>Adicionar Tarefa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ImageBackground source={image} style={styles.image}>
        <View style={styles.cover}>
          <Text style={styles.txtheader}>PNT - Lista de Tarefas</Text>
        </View>
      </ImageBackground>

      {tarefas.map((val) => (
        <View style={styles.tarefa} key={val.id}>
          <Text style={styles.tarefaText}>{val.tarefa}</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={() => deletar(val.id)}>
            <AntDesign name="minuscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.btnTarefa} onPress={() => setModal(true)}>
        <Text style={styles.btnText}>Adicionar tarefa</Text>
        <AntDesign name="pluscircleo" size={24} color="white" style={styles.plusIcon} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  cover: {
    width: "100%",
    height: 100,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  txtheader: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    marginTop: 35,
    fontWeight: "bold",
  },
  tarefa: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    justifyContent: "space-between",
  },
  tarefaText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  deleteButton: {
    paddingLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5,
  },
  openButton: {
    backgroundColor: "black",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },
  btnTarefa: {
    backgroundColor: "black",
    padding: 15,
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  plusIcon: {
    marginLeft: 10,
  },
});
