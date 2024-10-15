import { View, Text, Image, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants/Index'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import {getCurrentUser, signIn} from '../../lib/appwrite'
import { useGlobalContext } from '../../Context/GlobalProvider'

const SignIn = () => {
   const {setUser, setIsLoggedIn} = useGlobalContext() 
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async ()=> {

    if(!email || !password){
      Alert.alert('Error', 'Please Fill In All Fields')
    }

    setIsSubmitting(true)

    try {
       await signIn(email, password)

       const result = await getCurrentUser()

       setUser(result)
       setIsLoggedIn(true)

      router.replace('/Home')
    } catch (error) {
      Alert.alert('Error', error.message)
    }finally{
      setIsSubmitting(false)
    }
  }
  return (
    <SafeAreaView className='bg-primary-100 h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[100vh] px-4 my-6'>
          <Image
          source={images.logo}
          resizeMode='contain'
          className ='w-[115px] h-[135px]'/>
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Log In to Aora</Text>

          <FormField
          title='email'
          value={email}
          handleChangeText={(e)=>setEmail(e)}
          otherStyles='mt-7'
          keyboardType='email-address'
          />
          <FormField
          title='password'
          value={password}
          handleChangeText={(e)=>setPassword(e)}
          otherStyles='mt-7'
          />
          <CustomButton 
          title='Sign In'
          handlePress={submit}
          ContainerStyles='mt-7'
          isLoading={isSubmitting}/>

        <View className='justify-center pt-5 flex-row gap-2'>
          <Text className='text-lg text-gray-100 font-pregular'>
          Don't Have an Account?
          </Text>
          <Link href='/SignUp' className='text-lg font-psemibold text-secondary'>Sign Up</Link>
        </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn