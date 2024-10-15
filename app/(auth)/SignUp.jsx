import { View, Text, Image, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants/Index'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import {createUser} from '../../lib/appwrite'
import { useGlobalContext } from '../../Context/GlobalProvider'

const SignUp = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [username, setUsername] = useState('')

   const {setUser, setIsLoggedIn} = useGlobalContext() 
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async ()=> {

    if(!username || !email || !password){
      Alert.alert('Error', 'Please Fill In All Fields')
    }

    setIsSubmitting(true)

    try {
      const result = await createUser(email, password, username)

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
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Sign Up to Aora</Text>

          <FormField
          title='username'
          value={username}
          handleChangeText={(e)=>setUsername(e)}
          otherStyles='mt-10'
          />
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
          title='Sign Up'
          handlePress={submit}
          ContainerStyles='mt-7'
          isLoading={isSubmitting}/>

        <View className='justify-center pt-5 flex-row gap-2'>
          <Text className='text-lg text-gray-100 font-pregular'>
          Have an Account Already?
          </Text>
          <Link href='/SignIn' className='text-lg font-psemibold text-secondary'>Sign In</Link>
        </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp