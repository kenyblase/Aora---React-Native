import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite'

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform:'com.keny.aora',
    projectId:'66ae0695002d460a7154',
    databaseId:'66ae087a002af3a56473',
    userCollectionId: '66ae091d0006da4501cb',
    videoCollectionId:'66ae09d2001682d903db',
    storageId:'66ae40b80024e08dc26a'
}


const client = new Client()

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

const account = new Account(client)

const avatars = new Avatars(client)

const databases = new Databases(client)

const storage = new Storage(client)

export const createUser = async (email, password, username)=>{
  try {
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
    )

    if(!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),{
            accountId : newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }
    )
    return newUser
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const signIn = async(email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(error)
    }
}


export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if(!currentAccount) throw Error

        const CurrentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!CurrentUser) throw Error 

        return CurrentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
} 

export const getAllPosts = async()=>{
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}
export const getLatestPosts = async()=>{
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(5))]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}
export const SearchPosts = async(query)=>{
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search('title', query)]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}
export const getUserPosts = async(userId)=>{
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal('creator', userId)]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const signOut = async()=>{
    try {
        const session = await account.deleteSession('current')
        return session
    } catch (error) {
        throw new Error(error)
    }
} 
export const getFilePreview = async(fileId, type)=>{
    let fileUrl

    try {
        if(type === 'video'){
            fileUrl = storage.getFileView(config.storageId, fileId)
        }else if(type === 'image'){
            fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100)
        }else{
            throw new Error('Invalid File Type')
        }

        if(!fileUrl) throw Error

        return fileUrl 
    } catch (error) {
        throw new Error(error)
    }
}

export const uploadFile = async(file, type)=>{
    if(!file) return

    const {mimeType, ...rest} = file
    const asset = {type: mimeType, ...rest}

    try {
       const uploadedFile = await storage.createFile(
        config.storageId, 
        ID.unique(),
        asset
       )
       
       const fileUrl = await getFilePreview(uploadedFile.$id, type)

       return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}

export const createVideo = async(form)=>{
    try {
        const [thumbnailUrl, VideoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])

        const newPost = await databases.createDocument(
            config.databaseId, 
            config.videoCollectionId,
            ID,unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: VideoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )

        return newPost
    } catch (error) {
        throw new Error(error)
    }
}