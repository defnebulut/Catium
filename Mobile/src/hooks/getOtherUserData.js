import {useState,useEffect} from "react";
import axios from "axios";
function getOtherUserData(id){
    const [otherUserData, setotherUserData] = useState(null);
    const [loading, setLoading] =useState(true)
    useEffect(() => {
        fetchUserInfo();
      }, [id]);
      
      const fetchUserInfo = async () => {
        try {
          
          setLoading(true);
          const response = await axios.get(
            `https://catium.azurewebsites.net/api/v1/User/${id}`
          );
          const user = response.data.data;
          setotherUserData(user);
        } catch (error) {
          console.error("Veri çekme hatası:", error);
        } finally {
          setLoading(false);
        }
      };
      
      return {otherUserData,loading};
}
export default getOtherUserData;