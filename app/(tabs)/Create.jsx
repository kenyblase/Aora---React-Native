import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import FormField from '../../components/FormField'
import { TouchableOpacity } from 'react-native'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '../../constants/Index'
import CustomButton from '../../components/CustomButton'
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router'
import {createVideo} from '../../lib/appwrite'
import {useGlobalContext} from '../../Context/GlobalProvider'

const Create = () => {
  const {user} = useGlobalContext()
  const [Uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null, 
    prompt: ''
  })

  const openPicker = async(selectType)=>{
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === 'image' ? ['image/png', 'image/jpg', 'image/jpeg'] : ['video/mp4', 'video/gif']
    })
    if(!result.canceled){
      if(selectType === 'image'){
        setForm({...form, thumbnail : result.assets[0]})
      }
      if(selectType === 'video'){
        setForm({...form, video : result.assets[0]})
      }
    }else{
      setTimeout(()=>{
        Alert.alert('Document Picked', JSON.stringify(result, null ,2))
      }, 100)
    }
  }
  const submit = async()=>{
    if(!form.prompt || !form.title || !form.thumbnail || !form.video ){
      Alert.alert('Please Fill In All Fields')
    }
    setUploading(true)

    try {
      await createVideo({
        ...form, userId: user.$id
      })

      Alert.alert('Success', 'Video Uploaded Successfully')
      router.push('/Home')
    } catch (error) {
      Alert.alert('Error', error.message)
    }finally{
      setForm({
        title: '',
        video: null,
        thumbnail: null, 
        prompt: ''
      })

      setUploading(false)
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-psemibold'>Upload Video</Text>
        <FormField
        title='Video Title'
        value={form.title}
        placeholder={'Give Your Video A Catchy Title...'}
        handleChangeText={(e)=> setForm({...form, title:e})}
        otherStyles={'mt-10'}/>

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>Upload Video</Text>
          <TouchableOpacity onPress={()=>openPicker('Video')}>
            {form.video ? (
              <Video 
              source={{uri: form.video.uri}}
              className='w-full h-64 rounded-2xl'
              resizeMode={ResizeMode.COVER}/>
            ) : (
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                  <Image
                  source={icons.upload}
                  resizeMode='contain'
                  className='w-1/2 h-1/2'/>
                </View>

              </View>
            )}
          </TouchableOpacity >
        </View>
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>Thumbnail Image</Text>
          <TouchableOpacity onPress={()=>openPicker('Image')}>
            {form.thumbnail ? (
              <Image 
              source={{uri: form.thumbnail.uri}}
              className='w-full h-64 rounded-2xl'
              resizeMode='cover'/>
            ) : (
              <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2'>
                  <Image
                  source={icons.upload}
                  resizeMode='contain'
                  className='w-5 h-5'/>

                  <Text className='text-sm text-gray-100 font-pmedium'>Choose A File</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
        title='AI Prompt'
        value={form.prompt}
        placeholder={'Prompt Used To Create Video...'}
        handleChangeText={(e)=> setForm({...form, prompt:e})}
        otherStyles={'mt-7'}/>

        <CustomButton
        title='Submit & Post'
        handlePress={submit}
        ContainerStyles='mt-7'
        isLoading={Uploading}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create