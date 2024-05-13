import React from "react";
import { View,FlatList,Text } from "react-native";
import ArticleCard from "../../Components/ArticleCard/ArticleCard";
import useFetch from "../../hooks/useFetch";
function UserArticles({navigation}){
    const handleProductSelect = (id) =>{
        navigation.navigate("article",{id});
    }
    const {loading, data} =useFetch('v1/UserArticle?id=');
    const renderArticle = ({item}) => <ArticleCard item={item} onSelect={() =>handleProductSelect(item.articleId)} />
    if (data === null || data.length === 0) {
        return (
          <View style={{justifyContent:"center",flex:1,alignItems:"center", backgroundColor:'white'}}>
            <Text style={{fontSize:18,fontWeight:'500'}}>There is no article</Text>
          </View>
        );
      }
    return(
        <View style={{backgroundColor:'white'}}>
            <FlatList
            data={data}
            renderItem={renderArticle}
            />
        </View>
    )
}

export default UserArticles;