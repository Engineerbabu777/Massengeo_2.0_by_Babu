import { userDetails } from "../utils/getUserDetails";




export default function useStories(){



    const createStories = async(type,data) => {
        // STORY DATA: { storyText: "story", fontFamily: "Helvetica", backgroundColor: "red", textColor: "white"};
        try {
            const response = await fetch("http://localhost:4444/api/users/create-story",{
                method:"POST",
               headers:{
                "content-Type":"application/json",
                authorization: localStorage.getItem('token')
               },
                body:JSON.stringify({data,userId:userDetails.id,type})
            }).then(res => res.json());

            if(response?.error) throw new Error(response?.message)

            console.log({response});

        } catch (error) {
            console.log({error})
        }
    }


    const deleteStories = () => {

    }

    const handleSubmitStories = (storyData) => {

    }


    return {
     createStories,
     deleteStories,
     handleSubmitStories
    }
}