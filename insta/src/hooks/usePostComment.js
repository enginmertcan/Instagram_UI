import { useState } from 'react'
import useShowToast from './useShowToast'
import useAuthStore from '../store/authStore'
import usePostStore from '../store/postStore'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import {fireStore} from '../firebase/firebase' 



const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false)
//   const [Posted, setPosted] = useState(false)
  const showToast =useShowToast()
  const authUser=useAuthStore(state =>state.user)
  const addComment = usePostStore(state=>state.addComment)
    
   const handlePostComment= async(postId,comment)=>{ 
    if(isCommenting) return
    if(!authUser) return showToast('error','Oturum Açmadan Yorum Atamazsınız')
      setIsCommenting(true)

    const newComment = {
      comment,
      createdAt:Date.now(),
      createdBy : authUser.uid,
      postId,
    }
    try{
      await updateDoc(doc(fireStore,'posts',postId),{
        comments:arrayUnion(newComment)
      })
     
      addComment(postId,newComment)
    }
    catch(error){
   showToast("Error",error.message,"error")
    } 
    finally{
        setIsCommenting(false)

    }

   }

return{isCommenting,handlePostComment}

}

export default usePostComment
