import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, 
  FlatList,
  Image, 
  TouchableOpacity,
} from 'react-native';

var haddad = "https://noticiabrasilonline.com/wp-content/uploads/2018/10/Haddad-Bolsonaro-1.jpg";


export default class App extends Component  {  

  state={
    data:[]
  }

    // Pegar a Thumb do Post
    async getThumb(id) {
      /* 

        NA GLORIA DE JESUS CRISTO

      */
      const pack = await fetch('https://noticiabrasilonline.com/wp-json/wp/v2/media/'+id);
      const medias = await pack.json();
      const result = medias.guid.rendered ? 'https://noticiabrasilonline.com/wp-content/uploads/2018/10/Haddad-Bolsonaro-1.jpg' : medias.guid.rendered ;
      return result;
    }
    
    // Puxar dados dos Posts
    fetchData = async () => {
      
      const response = await fetch('https://noticiabrasilonline.com/wp-json/wp/v2/posts');

      const posts = await response.json();

      this.setState({data:posts});

    }

    // Comece a putaria
    componentDidMount(){

      this.fetchData();

    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          NBO PORRA!
        </Text>  
        <FlatList
          data={this.state.data}
          keyExtractor={(x,i) => i.toString()}
          renderItem={({item})=>
          <TouchableOpacity>
            {/* Card do Artigo */}
            <View style={styles.card}>       
              
                {/* Thumbnail do Card */}
                <Image style={styles.cardImage} source={{uri:this.getThumb(item.id).toString()}}/>
                  <View style={styles.cardContent}>
                    <View>
                      <Text style={styles.title}>{item.title.rendered}</Text>
                      <Text style={styles.time}>{item.date}</Text>
                    </View>

                    {/* Div dos icones infelizes */}
                    <View style={styles.cardFooter}>
                      <View style={styles.socialBarContainer}>

                        {/* O icone de coração desse karalho */}
                        <View style={styles.socialBarSection}>
                          <TouchableOpacity style={styles.socialBarButton}>
                            <Image style={styles.icon} source={{uri: 'https://png.icons8.com/android/75/ffffff/hearts.png'}}/>
                            <Text style={styles.socialBarLabel}>78</Text>
                          </TouchableOpacity>
                        </View>

                        {/* O icone de comentario desse karalho */}
                        <View style={styles.socialBarSection}>
                          <TouchableOpacity style={styles.socialBarButton}>
                            <Image style={styles.icon} source={{uri: 'https://png.icons8.com/ios-glyphs/75/ffffff/comments.png'}}/>
                            <Text style={styles.socialBarLabel}>25</Text>
                          </TouchableOpacity>
                        </View>

                        {/* O icone de rt desse karalho */}
                        <View style={styles.socialBarSection}>
                          <TouchableOpacity style={styles.socialBarButton}>
                            <Image style={styles.icon} source={{uri: 'https://png.icons8.com/material/50/ffffff/retweet.png'}}/>
                            <Text  style={styles.socialBarLabel}>13</Text>
                          </TouchableOpacity>
                        </View>

                      </View>
                    </View>

                  </View>             
                  
              
            </View>  
          </TouchableOpacity>
            
          }
        /> 
      </View>
    );
  }


}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000'
  },container:{
    flex:1,
    marginTop:20,
  },
  list: {
    backgroundColor:"#E6E6E6",
  },
  separator: {
    marginTop: 1,
  },
  /******** card **************/
  card:{
    margin: 0,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    backgroundColor: "#DCDCDC",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
    //overlay efect
    flex: 1,
    height: 200,
    width: null,
    position: 'absolute',
    zIndex: 100,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 0,
    paddingVertical: 7.5,
    paddingHorizontal: 0
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title:{
    fontSize:22,
    color: "#ffffff",
    marginTop: 10,
    fontWeight:'bold'
  },
  time:{
    fontSize:13,
    color: "#ffffff",
    marginTop: 5
  },
  icon: {
    width:25,
    height:25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    color: "#ffffff",
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }

});
