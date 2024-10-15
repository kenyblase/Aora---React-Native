import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, ContainerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity onPress={handlePress} 
    activeOpacity={0.7}
    className= {`bg-secondary-200 rounded-xl min-h-[62px] justify-center items-center ${ContainerStyles} ${isLoading ? 'opacity-50' : ''}`}
    disabled={isLoading}>
        <Text className={`text-white font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton