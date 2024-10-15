import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants/Index'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({title, subtitle}) => {
  return (
    <View classname='justify-center items-center px-4'>
      <Image
      source={images.empty}
      className='w-[270px] h-[215px] ml-10'
      resizeMode='contain'/>
        <Text className='text-xl mt-2 text-center font-psemibold text-white'>{subtitle}</Text>
        <Text className='font-pmedium text-sm text-center text-gray-100'>{title}</Text>

        <CustomButton 
        title={'Create Video'}
        handlePress={()=> router.push('/create')}
        ContainerStyles={'w-full my-5'}/>
    </View>
  )
}

export default EmptyState