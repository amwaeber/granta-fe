import {
    Modal,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    Platform, Pressable,
} from 'react-native';
import HTMLDescription from "@/components/HTMLDescription/HTMLDescription";
import CloseIcon from "@/assets/icons/x.svg";
import {Event} from "@/types/event.dto";
import {
    dateFormatDDMonthYYYY,
    dateFormatHHMM
} from "@/utils/dateFormats";


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
        <Modal visible={visible} animationType="fade" transparent={true}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.fullscreen}
            >
                {/* Modal content */}
                <View style={styles.modalHeader}>
                    <Pressable
                        onPress={onClose}
                        hitSlop={20}
                        style={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            zIndex: 10,
                        }}
                    >
                        <CloseIcon width={32} height={32} color='#ddd'/>
                    </Pressable>
                    {!event ? (<ActivityIndicator size="small" style={{margin: 10}}/>) : (
                        <View>
                            <Text style={styles.title}>{event?.summary}</Text>
                            <Text style={styles.date}>{dateFormatDDMonthYYYY(event.startTime)}</Text>
                            <View style={styles.timeRow}>
                                <Text style={styles.time}>Start: {dateFormatHHMM(event.startTime)}</Text>
                                {event?.endTime && (
                                    <Text style={styles.time}>End: {dateFormatHHMM(event.endTime)}</Text>
                                )}
                            </View>
                        </View>
                    )}
                </View>
                <View style={styles.modal}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {!event ? (<ActivityIndicator size="small" style={{margin: 10}}/>) : (
                            <>
                                <Text style={styles.text}>{event?.location}</Text>
                                <Text style={styles.text}>
                                    {event?.description && (
                                        <HTMLDescription htmlContent={event?.description} />
                                    )}
                                </Text>
                            </>
                        )}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    fullscreen: {
        flex: 1,
    },
    modal: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    modalHeader: {
        justifyContent: 'flex-start',
        backgroundColor: '#4C6DFF',
        padding: 30,
        paddingTop: 40,
        paddingBottom: 10,
    },
    scrollContent: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff',
        // maxWidth: '90%',
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#ddd',
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
        color: '#ddd',
    },
    text: {
        fontSize: 14,
        marginBottom: 6,
        color: '#333',
        fontFamily: 'Verdana, sans-serif',
    },
});
