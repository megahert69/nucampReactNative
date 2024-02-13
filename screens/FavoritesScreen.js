import { useSelector } from "react-redux";
import { View, Text, FlatList } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { Loading } from "../components/LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const FavoritesScreen = ({ navigation }) => {
    const { campsitesArray, isLoading, errMess } = useSelector((state) => state.campsites);
    const favorites = useSelector(state => state.favorites);

    if (isLoading) {
        return <Loading />;
    }

    if (errMess) {
        return (
            <View>
                <Text>{errMess}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={campsitesArray.filter(campsite => favorites.includes(campsite.id))}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item: campsite }) => (
                <ListItem
                    onPress={() => navigation.navigate("Directory", { 
                        screen: 'CampsiteInfo',
                        params: { campsiteId: campsite.id }
                    })}
                >
                    <Avatar rounded source={{ uri: baseUrl + campsite.image }} />
                    <ListItem.Content>
                        <ListItem.Title>{campsite.name}</ListItem.Title>
                        <ListItem.Subtitle>{campsite.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            )}
        />
    );
};

export default FavoritesScreen;