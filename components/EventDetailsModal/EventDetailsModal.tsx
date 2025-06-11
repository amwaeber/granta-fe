import {
    Modal,
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    ScrollView,
    Dimensions
} from 'react-native';
import {Event} from "@/types/event.dto";
import {dateFormatDDMMMYYYY} from "@/utils/dateFormatDDMMMYYYY";
import {dateFormatHHMM} from "@/utils/dateFormatHHMM";


interface props {
    event: Event;
    visible: boolean;
    onClose: () => void;
}

const screenHeight = Dimensions.get('window').height;
const MODAL_VERTICAL_MARGIN = 100;

export default function EventDetailsModal({
                                              event,
                                              visible,
                                              onClose
                                          }: props) {

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {!event ? (<ActivityIndicator size="small" style={{margin: 10}}/>) : (
                            <>
                                <Text style={styles.text}>{event?.summary}</Text>
                                <Text style={styles.text}>{dateFormatDDMMMYYYY(event.startTime)}</Text>
                                <Text style={styles.text}>Start: {dateFormatHHMM(event.startTime)}</Text>
                                {event?.endTime && (
                                    <Text style={styles.text}>End: {dateFormatHHMM(event.endTime)}</Text>
                                )}
                                <Text style={styles.text}>{event?.location}</Text>
                                <Text style={styles.text}>{event?.description}</Text>
                            </>
                        )}
                        <Button title="Close" onPress={onClose}/>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        paddingVertical: MODAL_VERTICAL_MARGIN,
    },
    modal: {
        backgroundColor: 'white',
        height: screenHeight - 2 * MODAL_VERTICAL_MARGIN,
        margin: 20,
        padding: 20,
        borderRadius: 8,
    },

    scrollContent: {
        paddingBottom: 20,
    },
    text: {
        fontSize: 14,
        marginBottom: 6,
        color: '#333',
        fontFamily: 'Verdana, sans-serif',
    },
});
