import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants/Index'
import CustomButton from '../components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { Redirect, router } from 'expo-router'
import {useGlobalContext} from '../Context/GlobalProvider'

const index = () => {
  const {isLoading, isLoggedIn} = useGlobalContext()

  if(!isLoading && isLoggedIn) return <Redirect href={'/Home'}/>
  return (
    <SafeAreaView className='bg-primary-100 h-full'>
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className='w-full justify-center items-center min-h-[85vh] px-4'>
            <Image
            source={images.logo}
            className='w-[130px] h-[84px]'
            resizeMode='contain'
            />
            <Image
            source={images.cards}
            className='max-w-[380px] w-full h-[300px]'
            resizeMode='contain'/>

            <View className = 'relative mt-5'>
                <Text className='text-3xl text-white text-center font-bold'>Discover Endless Possibities With {""} <Text className='text-secondary-200'>Aora</Text></Text>
                
                <Image
                source={images.path}
                className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
                resizeMode='contain'/>
            </View>

            <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration With Aora</Text>

            <CustomButton
            title ='Continue With Email'
            handlePress={()=> router.push('/SignIn')}
            ContainerStyles='w-full mt-7'/>
        </View>
      </ScrollView>
<StatusBar backgroundColor='#161662' style='light'/>

    </SafeAreaView>
  )
}

export default index