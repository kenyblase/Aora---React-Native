import { View, Text, TextInput, Image, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants/Index'
import { router, usePathname } from 'expo-router'

const SearchInput = (initialQuery) => {
  const pathName = usePathname()
  const [query, SetQuery] = useState(initialQuery || '')
  return (

      <View className='w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
        <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular'
        value={query}
        placeholder='Search For A Video Topic'
        placeholderTextColor='#cdcde0'
        onChangeText={(e)=>SetQuery(e)}/>

        <Pressable
        onPress={()=>{
          if(!query){
            return Alert.alert('Missing Query', 'Please Input Something To Search')}
          if(pathName.startsWith('/search')) router.setParams({query})
          else router.push(`/search/${query}`)
        }}>
            <Image
            source={icons.search}
            className='w-5 h-5'
            resizeMode='contain'/>
        </Pressable>
      </View>
  )
}

export default SearchInput
