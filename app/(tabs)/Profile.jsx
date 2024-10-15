import { View, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import { getUserPosts, signOut } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../Context/GlobalProvider'
import { TouchableOpacity } from 'react-native'
import { icons } from '../../constants/Index'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'

const Profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext()
  const {data : posts} = useAppwrite(()=>getUserPosts(user.$id))

  const logOut = async()=>{
    await signOut()
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/SignIn')
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
      data={posts}
      keyExtractor={(item)=>item.$id}
      renderItem={({item})=>(
        <VideoCard video={item}/>
      )}
      ListHeaderComponent={()=>(
        <View className=' w-full justify-center items-center mt-6 mb-12 px-4'>
          <TouchableOpacity
          className='w-full items-end mb-10'
          onPress={logOut}>
            <Image 
            source={icons.logout}
            resizeMode='contain'
            className='w-6 h-6'/>
          </TouchableOpacity>
              
            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image
              source={user?.avatar}
              classname='w-[90%] h-[90%] rounded-lg'
              resizeMode='cover'/>
            </View>

            <InfoBox
            title={user?.username}
            containerStyles='mt-5'
            titleStyles='text-lg'/>

            <View className='mt-5 flex-row'>
              <InfoBox
            title={posts.length || 0}
            subtitle='posts'
            containerStyles='mr-10'
            titleStyles='text-xl'/>

            <InfoBox
            title='1.7k'
            subtitle='Followers'
            titleStyles='text-xl'/>
            </View>
        </View>
      )}
      ListEmptyComponent={()=>(
        <EmptyState
        title='No Videos Found'
        subtitle='All Uploaded Videos Are Displayed Here'/>
      )}
  />
    </SafeAreaView>
  )
  }

export default Profile