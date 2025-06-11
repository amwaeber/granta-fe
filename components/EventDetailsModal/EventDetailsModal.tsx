import {
    Modal,
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    Platform, Pressable,
} from 'react-native';
import {Event} from "@/types/event.dto";
import {dateFormatDDMonthYYYY} from "@/utils/dateFormatDDMonthYYYY";
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
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.fullscreen}
            >
                <View style={styles.overlay}>
                    {/* Top tap area */}
                    <Pressable style={styles.dismissZone} onPress={onClose}/>

                    {/* Modal content */}
                    <View style={styles.modal}>
                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            {!event ? (<ActivityIndicator size="small" style={{margin: 10}}/>) : (
                                <>
                                    <Text style={styles.title}>{event?.summary}</Text>
                                    <Text style={styles.date}>{dateFormatDDMonthYYYY(event.startTime)}</Text>
                                    <View style={styles.timeRow}>
                                        <Text style={styles.time}>Start: {dateFormatHHMM(event.startTime)}</Text>
                                        {event?.endTime && (
                                            <Text style={styles.time}>End: {dateFormatHHMM(event.endTime)}</Text>
                                        )}
                                    </View>
                                    <Text style={styles.text}>{event?.location}</Text>
                                    <Text style={styles.text}>{event?.description}</Text>
                                </>
                            )}
                            <Button title="Close" onPress={onClose}/>
                        </ScrollView>
                    </View>

                    {/* Bottom tap area */}
                    <Pressable style={styles.dismissZone} onPress={onClose}/>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    fullscreen: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    dismissZone: {
        height: MODAL_VERTICAL_MARGIN,
        width: '100%',
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#666',
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#999',
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    time: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#666',
    },
    text: {
        fontSize: 14,
        marginBottom: 6,
        color: '#333',
        fontFamily: 'Verdana, sans-serif',
    },
});
