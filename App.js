import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';


function App() {
  const [turn, setTurn] = useState('X')
  const [winner, setWinner] = useState(null)
  const initialMapState = Object.fromEntries(Array.from({ length: 9 }, (_, index) => [index, null]))
  const [maps, setMaps] = useState(initialMapState);

  const onPlayerTouch = (index) => {
    setMaps((prevMaps) => {
      const updatedMaps = { ...prevMaps, [index]: turn };

      const winningCombinations = [
        [0, 1, 2], [0, 3, 6], [0, 4, 8],
        [1, 4, 7], [2, 4, 6], [3, 4, 5],
        [6, 7, 8], [2, 5, 8]
      ];

      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (updatedMaps[a] === turn && updatedMaps[b] === turn && updatedMaps[c] === turn) {
          setWinner(turn);
          return updatedMaps; // Exit the function if there's a winner
        }
      }

      setTurn(turn === "X" ? "O" : "X");
      return updatedMaps; // Return the updated maps
    });
  };



  return (
    <SafeAreaView>
      <View className="">
        <View className="py-4 bg-yellow-500">
          <Text className="text-white font-bold text-xl text-center">{winner ? `${turn} Won the game! 🎉🎉` : `Player ${turn}'s turn`}</Text>
        </View>

        <View className="mt-16 px-4" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {Array.from({ length: 9 }, (_, index) => (
            <TouchableOpacity key={index} onPress={() => { !winner && onPlayerTouch(index) }} className="w-28 py-12 bg-gray-200">
              <Text className="font-bold text-lg text-center text-gray-700">{maps[index]}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {winner && <TouchableOpacity onPress={() => {
          setMaps(initialMapState);
          setWinner(null)
        }} className="w-3/4 mx-auto mt-10 bg-purple-600 py-4 rounded-lg">
          <Text className="text-white text-center">Play Again</Text>
        </TouchableOpacity>}
      </View>
    </SafeAreaView>
  )
}

export default App;
